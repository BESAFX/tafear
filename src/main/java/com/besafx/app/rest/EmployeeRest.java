package com.besafx.app.rest;

import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Employee;
import com.besafx.app.entity.Person;
import com.besafx.app.service.EmployeeService;
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
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/employee/")
public class EmployeeRest {

    private final Logger log = LoggerFactory.getLogger(EmployeeRest.class);

    private final String FILTER_TABLE = "**,person[id,nickname,name],department[id,code,name]";
    private final String FILTER_EMPLOYEE_COMBO = "id,code,person[id,nickname,name]";

    @Autowired
    private PersonService personService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_EMPLOYEE_CREATE')")
    @Transactional
    public String create(@RequestBody Employee employee, Principal principal) {
        if (employeeService.findByPersonAndDepartment(employee.getPerson(), employee.getDepartment()) != null) {
            throw new CustomException("هذا الموظف موجود بالفعل");
        }
        Employee topEmployee = employeeService.findTopByOrderByCodeDesc();
        if (topEmployee == null) {
            employee.setCode(1);
        } else {
            employee.setCode(topEmployee.getCode() + 1);
        }
        employee = employeeService.save(employee);
        notificationService.notifyOne(Notification
                .builder()
                .title("العمليات على الموظفين")
                .message("تم اضافة موظف جديد بنجاح")
                .type("success")
                .icon("fa-plus-circle")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), employee);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_EMPLOYEE_UPDATE')")
    @Transactional
    public String update(@RequestBody Employee employee, Principal principal) {
        Employee object = employeeService.findOne(employee.getId());
        if (object != null) {
            Optional.ofNullable(employeeService.findByPersonAndDepartment(employee.getPerson(), employee.getDepartment())).ifPresent(value -> {
                if (object.getId() != value.getId()) {
                    throw new CustomException("هذا الموظف موجود بالفعل");
                }
            });
            employee = employeeService.save(employee);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على الموظفين")
                    .message("تم تعديل بيانات الموظف بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), employee);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_EMPLOYEE_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        Employee object = employeeService.findOne(id);
        if (object != null) {
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على الأقسام")
                    .message("تم حذف الموظف بنجاح")
                    .type("success")
                    .icon("fa-trash")
                    .build(), principal.getName());
            employeeService.delete(object);
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(employeeService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), employeeService.findOne(id));
    }

    @RequestMapping(value = "fetchTableData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchTableData(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), fetchData(principal));
    }

    @RequestMapping(value = "fetchEmployeeCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchEmployeeCombo(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), fetchData(principal));
    }

    private List<Employee> fetchData(Principal principal) {
        List<Employee> list = new ArrayList<>();
        Person person = personService.findByEmail(principal.getName());
        person.getCompanies().stream().forEach(company -> company.getRegions().stream().forEach(region -> region.getBranches().stream().forEach(branch -> branch.getDepartments().stream().forEach(department -> list.addAll(department.getEmployees())))));
        person.getRegions().stream().forEach(region -> region.getBranches().stream().forEach(branch -> branch.getDepartments().stream().forEach(department -> list.addAll(department.getEmployees()))));
        person.getBranches().stream().forEach(branch -> branch.getDepartments().stream().forEach(department -> list.addAll(department.getEmployees())));
        person.getDepartments().stream().forEach(department -> list.addAll(department.getEmployees()));
        list.addAll(person.getEmployees());
        list.sort(Comparator.comparing(employee -> employee.getPerson().getName()));
        return list.stream().distinct().collect(Collectors.toList());
    }

}
