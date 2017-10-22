package com.besafx.app.rest;

import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Views;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/person/")
public class PersonRest {

    private final Logger log = LoggerFactory.getLogger(PersonRest.class);

    private final String FILTER_TABLE = "**,team[**,-persons],-companies,-regions,-branches,-departments,-employees";
    private final String FILTER_PERSON_COMBO = "id,nickname,name";

    @Autowired
    private PersonService personService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PERSON_CREATE')")
    @Transactional
    public String create(@RequestBody Person person, Principal principal) {
        if (personService.findByEmail(person.getEmail()) != null) {
            throw new CustomException("هذا البريد الإلكتروني غير متاح ، فضلاً ادخل بريد آخر غير مستخدم");
        }
        person.setHiddenPassword(person.getPassword());
        person.setPassword(passwordEncoder.encode(person.getPassword()));
        person.setEnabled(true);
        person.setTokenExpired(false);
        person.setActive(false);
        person.setTechnicalSupport(false);
        person.setOptions(JSONConverter.toString(Options.builder().lang("AR").dateType("H")));
        person = personService.save(person);
        notificationService.notifyOne(Notification
                .builder()
                .title("العمليات على حسابات المستخدمين")
                .message("تم اضافة مستخدم جديد بنجاح")
                .type("success")
                .icon("fa-plus-circle")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), person);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PERSON_UPDATE') or hasRole('ROLE_PROFILE_UPDATE')")
    @Transactional
    public String update(@RequestBody Person person, Principal principal) {
        Person object = personService.findOne(person.getId());
        if (object != null) {
            if (!object.getPassword().equals(person.getPassword())) {
                person.setHiddenPassword(person.getPassword());
                person.setPassword(passwordEncoder.encode(person.getPassword()));
            } else {
                person.setHiddenPassword(object.getHiddenPassword());
            }
            person.setEnabled(true);
            person.setTokenExpired(false);
            person.setActive(false);
            person.setTechnicalSupport(false);
            person = personService.save(person);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على حسابات المستخدمين")
                    .message("تم تعديل بيانات الحساب بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), person);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "setGUILang/{lang}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    @Transactional
    public void setGUILang(@PathVariable(value = "lang") String lang,  Principal principal) {
        Person person = personService.findByEmail(principal.getName());
        Options options = JSONConverter.toObject(person.getOptions(), Options.class);
        options.setLang(lang);
        person.setOptions(JSONConverter.toString(options));
        personService.save(person);
    }

    @RequestMapping(value = "setDateType/{type}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PROFILE_UPDATE')")
    @Transactional
    public void setDateType(@PathVariable(value = "type") String type,  Principal principal) {
        Person person = personService.findByEmail(principal.getName());
        Options options = JSONConverter.toObject(person.getOptions(), Options.class);
        options.setDateType(type);
        person.setOptions(JSONConverter.toString(options));
        personService.save(person);
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PERSON_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id) {
        Person object = personService.findOne(id);
        if (object != null) {
            personService.delete(id);
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(personService.findAll()));
    }

    @RequestMapping(value = "findAllCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAllCombo() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_PERSON_COMBO), Lists.newArrayList(personService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), personService.findOne(id));
    }

    @RequestMapping("findActivePerson")
    @ResponseBody
    public String findActivePerson(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), personService.findByEmail(principal.getName()));
    }

    @RequestMapping("findActivePersonManager")
    @ResponseBody
    public String findActivePersonManager(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), personService.findByEmail(principal.getName()).findManager());
    }

    @RequestMapping("findActivePersonManagerSummery")
    @ResponseBody
    public String findActivePersonManagerSummery(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_PERSON_COMBO), personService.findByEmail(principal.getName()).findManager());
    }

    @RequestMapping("findHiddenPassword/{email:.+}")
    @ResponseBody
    public String findHiddenPassword(@PathVariable(value = "email") String email, Authentication authentication) {
        if (authentication.isAuthenticated()) {
            Person person = personService.findByEmail(email);
            if (person != null) {
                return person.getHiddenPassword();
            } else {
                return "تأكد من البريد الإلكتروني، يجب أن يكون مسجلاً";
            }
        } else {
            return "غير مصرح لك";
        }
    }

    @RequestMapping(value = "findPersonUnderMe", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Person> findPersonUnderMe(Principal principal) {
        Person me = personService.findByEmail(principal.getName());
        List<Person> list = new ArrayList<>();
        me.getCompanies().stream().forEach(company -> {
            list.add(company.getManager());
            company.getRegions().stream().forEach(region -> {
                list.add(region.getManager());
                region.getBranches().stream().forEach(branch -> {
                    list.add(branch.getManager());
                    branch.getDepartments().stream().forEach(department -> {
                        list.add(department.getManager());
                        department.getEmployees().stream().forEach(employee -> list.add(employee.getPerson()));
                    });
                });
            });
        });
        me.getRegions().stream().forEach(region -> {
            list.add(region.getManager());
            region.getBranches().stream().forEach(branch -> {
                list.add(branch.getManager());
                branch.getDepartments().stream().forEach(department -> {
                    list.add(department.getManager());
                    department.getEmployees().stream().forEach(employee -> list.add(employee.getPerson()));
                });
            });
        });
        me.getBranches().stream().forEach(branch -> {
            list.add(branch.getManager());
            branch.getDepartments().stream().forEach(department -> {
                list.add(department.getManager());
                department.getEmployees().stream().forEach(employee -> list.add(employee.getPerson()));
            });
        });
        me.getDepartments().stream().forEach(department -> {
            list.add(department.getManager());
            department.getEmployees().stream().forEach(employee -> list.add(employee.getPerson()));
        });
        me.getEmployees().stream().forEach(employee -> list.add(employee.getPerson()));
        return list.stream().distinct().collect(Collectors.toList());
    }

    @RequestMapping(value = "findPersonUnderMeSummery", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @JsonView(Views.Summery.class)
    public List<Person> findPersonUnderMeSummery(Principal principal) {
        return findPersonUnderMe(principal);
    }

}
