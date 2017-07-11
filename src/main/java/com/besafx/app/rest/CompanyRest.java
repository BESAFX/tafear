package com.besafx.app.rest;
import com.besafx.app.entity.Company;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Views;
import com.besafx.app.service.CompanyService;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.WrapperUtil;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/company/")
public class CompanyRest {

    private final static Logger log = LoggerFactory.getLogger(CompanyRest.class);

    @Autowired
    private PersonService personService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_CREATE')")
    public Company create(@RequestBody Company company, Principal principal) {
        Integer maxCode = companyService.findMaxCode();
        if (maxCode == null) {
            company.setCode(1);
        } else {
            company.setCode(maxCode + 1);
        }
        company = companyService.save(company);
        notificationService.notifyOne(Notification
                .builder()
                .title("العمليات على الشركات")
                .message("تم اضافة شركة جديدة بنجاح")
                .type("success")
                .icon("fa-plus-circle")
                .build(), principal.getName());
        return company;
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_UPDATE')")
    @JsonView(Views.Summery.class)
    public Company update(@RequestBody Company company, Principal principal) {
        Company object = companyService.findOne(company.getId());
        if (object != null) {
            company = companyService.save(company);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على الشركات")
                    .message("تم تعديل بيانات الشركة بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
            return company;
        } else {
            return null;
        }
    }

    @RequestMapping(value = "activateWarnMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    public void activateWarnMessage() {
        log.info("Activate Warn Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        WrapperUtil options = JSONConverter.toObject(company.getOptions(), WrapperUtil.class);
        options.setObj1(true);
        company.setOptions(JSONConverter.toString(options));
        companyService.save(company);
    }

    @RequestMapping(value = "deactivateWarnMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    public void deactivateWarnMessage() {
        log.info("Deactivate Warn Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        WrapperUtil options = JSONConverter.toObject(company.getOptions(), WrapperUtil.class);
        options.setObj1(false);
        company.setOptions(JSONConverter.toString(options));
        companyService.save(company);
    }

    @RequestMapping(value = "activateDeductionMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    public void activateDeductionMessage() {
        log.info("Activate Deduction Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        WrapperUtil options = JSONConverter.toObject(company.getOptions(), WrapperUtil.class);
        options.setObj2(true);
        company.setOptions(JSONConverter.toString(options));
        companyService.save(company);
    }

    @RequestMapping(value = "deactivateDeductionMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    public void deactivateDeductionMessage() {
        log.info("Deactivate Deduction Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        WrapperUtil options = JSONConverter.toObject(company.getOptions(), WrapperUtil.class);
        options.setObj2(false);
        company.setOptions(JSONConverter.toString(options));
        companyService.save(company);
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_DELETE')")
    public void delete(@PathVariable Long id) {
        Company object = companyService.findOne(id);
        if (object != null) {
            companyService.delete(id);
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Company> findAll() {
        return Lists.newArrayList(companyService.findAll());
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Company findOne(@PathVariable Long id) {
        return companyService.findOne(id);
    }

    @RequestMapping(value = "count", produces = MediaType.APPLICATION_JSON_VALUE)
    public Long count() {
        return companyService.count();
    }

    @RequestMapping(value = "fetchTableData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Company> fetchTableData(Principal principal) {
        List<Company> list = new ArrayList<>();
        Person person = personService.findByEmail(principal.getName());
        person.getCompanies().stream().forEach(company -> list.add(company));
        person.getRegions().stream().forEach(region -> list.add(region.getCompany()));
        person.getBranches().stream().forEach(branch -> list.add(branch.getRegion().getCompany()));
        person.getDepartments().stream().forEach(department -> list.add(department.getBranch().getRegion().getCompany()));
        person.getEmployees().stream().forEach(employee -> list.add(employee.getDepartment().getBranch().getRegion().getCompany()));
        list.sort(Comparator.comparing(Company::getCode));
        return list.stream().distinct().collect(Collectors.toList());
    }

    @RequestMapping(value = "fetchTableDataSummery", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @JsonView(Views.Summery.class)
    public List<Company> fetchTableDataSummery(Principal principal) {
        return fetchTableData(principal);
    }

}
