package com.besafx.app.rest;

import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Branch;
import com.besafx.app.entity.Person;
import com.besafx.app.service.BranchService;
import com.besafx.app.service.PersonService;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/branch/")
public class BranchRest {

    private final Logger log = LoggerFactory.getLogger(BranchRest.class);

    private final String FILTER_TABLE = "**,manager[id,nickname,name],region[id,code,name,company[id,code,name]],departments[id,code,name]";
    private final String FILTER_BRANCH_COMBO = "id,code,name";
    private final String FILTER_BRANCH_REGION_COMPANY_COMBO = "id,code,name,region[id,code,name,company[id,code,name]]";

    @Autowired
    private PersonService personService;

    @Autowired
    private BranchService branchService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_BRANCH_CREATE')")
    @Transactional
    public String create(@RequestBody Branch branch, Principal principal) {
        Branch topBranch = branchService.findTopByOrderByCodeDesc();
        if (topBranch == null) {
            branch.setCode(1);
        } else {
            branch.setCode(topBranch.getCode() + 1);
        }
        branch = branchService.save(branch);
        notificationService.notifyOne(Notification
                .builder()
                .title("العمليات على الفروع")
                .message("تم اضافة فرع جديد بنجاح")
                .type("success")
                .icon("fa-plus-circle")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), branch);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_BRANCH_UPDATE')")
    @Transactional
    public String update(@RequestBody Branch branch, Principal principal) {
        Branch object = branchService.findOne(branch.getId());
        if (object != null) {
            branch = branchService.save(branch);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على الفروع")
                    .message("تم تعديل بيانات الفرع بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), branch);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_BRANCH_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id) {
        Branch object = branchService.findOne(id);
        if (object != null) {
            if (!object.getDepartments().isEmpty()) {
                throw new CustomException("لا يمكن حذف هذا الفرع، حيث انه مستخدم من الاقسام.");
            }
            branchService.delete(id);
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(branchService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), branchService.findOne(id));
    }

    @RequestMapping(value = "fetchTableData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchTableData(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE),fetchData(principal));
    }

    @RequestMapping(value = "fetchBranchCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchBranchCombo(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_BRANCH_COMBO), fetchData(principal));
    }

    @RequestMapping(value = "fetchBranchRegionCompanyCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchBranchRegionCompanyCombo(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_BRANCH_REGION_COMPANY_COMBO), fetchData(principal));
    }

    private List<Branch> fetchData(Principal principal) {
        List<Branch> list = new ArrayList<>();
        Person person = personService.findByEmail(principal.getName());
        person.getCompanies().stream().forEach(company -> company.getRegions().stream().forEach(region -> list.addAll(region.getBranches())));
        person.getRegions().stream().forEach(region -> list.addAll(region.getBranches()));
        person.getDepartments().stream().forEach(department -> list.add(department.getBranch()));
        person.getEmployees().stream().forEach(employee -> list.add(employee.getDepartment().getBranch()));
        list.addAll(person.getBranches());
        list.sort(Comparator.comparing(Branch::getCode));
        return list.stream().distinct().collect(Collectors.toList());
    }

}
