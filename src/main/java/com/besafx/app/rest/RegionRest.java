package com.besafx.app.rest;

import com.besafx.app.entity.Person;
import com.besafx.app.entity.Region;
import com.besafx.app.service.PersonService;
import com.besafx.app.service.RegionService;
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
@RequestMapping(value = "/api/region/")
public class RegionRest {

    private final Logger log = LoggerFactory.getLogger(RegionRest.class);

    private final String FILTER_TABLE = "**,manager[id,nickname,name],company[id,code,name],branches[id]";
    private final String FILTER_REGION_COMBO = "id,code,name";

    @Autowired
    private PersonService personService;

    @Autowired
    private RegionService regionService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_REGION_CREATE')")
    @Transactional
    public String create(@RequestBody Region region, Principal principal) {
        Region topRegion = regionService.findTopByOrderByCodeDesc();
        if (topRegion == null) {
            region.setCode(1);
        } else {
            region.setCode(topRegion.getCode() + 1);
        }
        region = regionService.save(region);
        notificationService.notifyOne(Notification
                .builder()
                .title("العمليات على المناطق")
                .message("تم اضافة منطقة جديدة بنجاح")
                .type("success")
                .icon("fa-plus-circle")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), region);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_REGION_UPDATE')")
    @Transactional
    public String update(@RequestBody Region region, Principal principal) {
        Region object = regionService.findOne(region.getId());
        if (object != null) {
            region = regionService.save(region);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على المناطق")
                    .message("تم تعديل بيانات المنطقة بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), region);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_REGION_DELETE')")
    public void delete(@PathVariable Long id) {
        Region object = regionService.findOne(id);
        if (object != null) {
            regionService.delete(id);
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(regionService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), regionService.findOne(id));
    }

    @RequestMapping(value = "fetchTableData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchTableData(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), fetchData(principal));
    }

    @RequestMapping(value = "fetchRegionCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchRegionCombo(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_REGION_COMBO), fetchData(principal));
    }

    private List<Region> fetchData(Principal principal) {
        List<Region> list = new ArrayList<>();
        Person person = personService.findByEmail(principal.getName());
        person.getCompanies().stream().forEach(company -> list.addAll(company.getRegions()));
        person.getBranches().stream().forEach(branch -> list.add(branch.getRegion()));
        person.getDepartments().stream().forEach(department -> list.add(department.getBranch().getRegion()));
        person.getEmployees().stream().forEach(employee -> list.add(employee.getDepartment().getBranch().getRegion()));
        list.addAll(person.getRegions());
        list.sort(Comparator.comparing(Region::getCode));
        return list.stream().distinct().collect(Collectors.toList());
    }

}
