package com.besafx.app.rest;

import com.besafx.app.entity.Company;
import com.besafx.app.service.CompanyService;
import com.besafx.app.util.AppOptions;
import com.besafx.app.util.JSONConverter;
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
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/company/")
public class CompanyRest {

    private final static Logger log = LoggerFactory.getLogger(CompanyRest.class);

    private final String FILTER_TABLE = "**,manager[id,nickname,name],regions[id]";

    @Autowired
    private CompanyService companyService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_UPDATE')")
    @Transactional
    public String update(@RequestBody Company company, Principal principal) {
        Company object = companyService.findOne(company.getId());
        if (object != null) {
            company = companyService.save(company);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على قواعد البيانات")
                    .message("تم تعديل بيانات الشركة بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), company);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "activateWarnMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_UPDATE')")
    @Transactional
    public void activateWarnMessage(Principal principal) {
        log.info("Activate Warn Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        Optional.ofNullable(company.getOptions()).ifPresent(v -> {
            AppOptions options = JSONConverter.toObject(v, AppOptions.class);
            options.setActivateWarnMessage(true);
            company.setOptions(JSONConverter.toString(options));
            companyService.save(company);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على قواعد البيانات")
                    .message("تم الحفظ بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
        });
    }

    @RequestMapping(value = "deactivateWarnMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_UPDATE')")
    @Transactional
    public void deactivateWarnMessage(Principal principal) {
        log.info("Deactivate Warn Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        AppOptions options = JSONConverter.toObject(company.getOptions(), AppOptions.class);
        options.setActivateWarnMessage(false);
        company.setOptions(JSONConverter.toString(options));
        companyService.save(company);
        notificationService.notifyOne(Notification
                .builder()
                .title("العمليات على قواعد البيانات")
                .message("تم الحفظ بنجاح")
                .type("success")
                .icon("fa-edit")
                .build(), principal.getName());
    }

    @RequestMapping(value = "activateDeductionMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_UPDATE')")
    @Transactional
    public void activateDeductionMessage(Principal principal) {
        log.info("Activate Deduction Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        Optional.ofNullable(company.getOptions()).ifPresent(v -> {
            AppOptions options = JSONConverter.toObject(v, AppOptions.class);
            options.setActivateDeductionMessage(true);
            company.setOptions(JSONConverter.toString(options));
            companyService.save(company);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على قواعد البيانات")
                    .message("تم الحفظ بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
        });
    }

    @RequestMapping(value = "deactivateDeductionMessage", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_UPDATE')")
    @Transactional
    public void deactivateDeductionMessage(Principal principal) {
        log.info("Deactivate Deduction Email Messages");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        Optional.ofNullable(company.getOptions()).ifPresent(v -> {
            AppOptions options = JSONConverter.toObject(v, AppOptions.class);
            options.setActivateDeductionMessage(false);
            company.setOptions(JSONConverter.toString(options));
            companyService.save(company);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على قواعد البيانات")
                    .message("تم الحفظ بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
        });
    }

    @RequestMapping(value = "setEmailDeductionOptions", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_UPDATE')")
    @Transactional
    public void setEmailDeductionOptions(@RequestBody String properties, Principal principal) {
        log.info("Email Deduction Options");
        Company company = Lists.newArrayList(companyService.findAll()).get(0);
        Optional.ofNullable(company.getOptions()).ifPresent(v -> {
            AppOptions appOptions = JSONConverter.toObject(v, AppOptions.class);
            AppOptions appProperties = JSONConverter.toObject(properties, AppOptions.class);
            appOptions.setEmailDeductionPersonsList(appProperties.getEmailDeductionPersonsList());
            appOptions.setEmailDeductionCloseType(appProperties.getEmailDeductionCloseType());
            appOptions.setEmailDeductionEmails(appProperties.getEmailDeductionEmails());
            appOptions.setEmailDeductionTitle(appProperties.getEmailDeductionTitle());
            appOptions.setEmailDeductionBody(appProperties.getEmailDeductionBody());
            company.setOptions(JSONConverter.toString(appOptions));
            companyService.save(company);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على قواعد البيانات")
                    .message("تم الحفظ بنجاح")
                    .type("success")
                    .icon("fa-edit")
                    .build(), principal.getName());
        });
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_COMPANY_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id) {
        Company object = companyService.findOne(id);
        if (object != null) {
            companyService.delete(id);
        }
    }

    @RequestMapping(value = "get", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String get() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(companyService.findAll()).get(0));
    }

}
