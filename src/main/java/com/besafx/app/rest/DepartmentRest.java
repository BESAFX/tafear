package com.besafx.app.rest;

import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Department;
import com.besafx.app.entity.Person;
import com.besafx.app.service.DepartmentService;
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
@RequestMapping(value = "/api/department/")
public class DepartmentRest {

    private final Logger log = LoggerFactory.getLogger(BranchRest.class);

    private final String FILTER_TABLE = "**,manager[id,nickname,name],branch[id,code,name],employees[id]";
    private final String FILTER_DEPARTMENT_COMBO = "id,code,name";

    @Autowired
    private PersonService personService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_DEPARTMENT_CREATE')")
    @Transactional
    public String create(@RequestBody Department department, Principal principal) {
        Department topDepartment = departmentService.findTopByOrderByCodeDesc();
        if (topDepartment == null) {
            department.setCode(1);
        } else {
            department.setCode(topDepartment.getCode() + 1);
        }
        department = departmentService.save(department);
        notificationService.notifyOne(Notification
                .builder()
                .title("العمليات على الأقسام")
                .message("تم اضافة قسم جديد بنجاح")
                .type("success")
                .icon("fa-plus-circle")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), department);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_DEPARTMENT_UPDATE')")
    @Transactional
    public String update(@RequestBody Department department, Principal principal) {
        Department object = departmentService.findOne(department.getId());
        if (object != null) {
            department = departmentService.save(department);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على الأقسام")
                    .message("تم تعديل بيانات القسم بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), department);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_DEPARTMENT_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        Department object = departmentService.findOne(id);
        if (object != null) {
            if (!object.getEmployees().isEmpty()) {
                throw new CustomException("لا يمكنك حذف هذا القسم، حيث انه مرتبط بالموظفين.");
            }
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على الأقسام")
                    .message("تم حذف القسم بنجاح")
                    .type("success")
                    .icon("fa-trash")
                    .build(), principal.getName());
            departmentService.delete(id);
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(departmentService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), departmentService.findOne(id));
    }

    @RequestMapping(value = "fetchTableData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchTableData(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), fetchData(principal));
    }

    @RequestMapping(value = "fetchDepartmentCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchDepartmentCombo(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_DEPARTMENT_COMBO), fetchData(principal));
    }

    private List<Department> fetchData(Principal principal) {
        List<Department> list = new ArrayList<>();
        Person person = personService.findByEmail(principal.getName());
        person.getCompanies().stream().forEach(company -> company.getRegions().stream().forEach(region -> region.getBranches().stream().forEach(branch -> list.addAll(branch.getDepartments()))));
        person.getRegions().stream().forEach(region -> region.getBranches().stream().forEach(branch -> list.addAll(branch.getDepartments())));
        person.getBranches().stream().forEach(branch -> list.addAll(branch.getDepartments()));
        person.getDepartments().stream().forEach(department -> list.add(department));
        person.getEmployees().stream().forEach(employee -> list.add(employee.getDepartment()));
        list.addAll(person.getDepartments());
        list.sort(Comparator.comparing(Department::getCode));
        return list.stream().distinct().collect(Collectors.toList());
    }

}
