package com.besafx.app.controller;
import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Branch;
import com.besafx.app.entity.Company;
import com.besafx.app.entity.Person;
import com.besafx.app.service.BranchService;
import com.besafx.app.service.CompanyService;
import com.besafx.app.service.PersonService;
import com.google.common.collect.Lists;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.Exporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class ReportPersonController {

    @Autowired
    private PersonService personService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private BranchService branchService;

    @RequestMapping(value = "/report/Persons", method = RequestMethod.GET, produces = "application/pdf")
    @ResponseBody
    public void ReportPersons(@RequestParam("personsList") List<Long> personsList, HttpServletResponse response) throws JRException, IOException {
        if (personsList.isEmpty()) {
            throw new CustomException("عفواً، فضلاً اختر على الأقل مستخدم واحد للطباعة");
        }
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "inline; filename=Persons.pdf");
        final OutputStream outStream = response.getOutputStream();
        /**
         * Insert Parameters
         */
        Map<String, Object> map = new HashMap<>();
        StringBuilder param1 = new StringBuilder();
        param1.append("طيف العربية");
        param1.append("\n");
        param1.append("للتعليم والتدريب التقني");
        param1.append("\n");
        param1.append("تقرير مختصر عن المستخدمين");
        map.put("TITLE", param1.toString());
        map.put("PERSONS", personsList.stream().map(value -> personService.findOne(value)).collect(Collectors.toList()));
        Lists.newArrayList(companyService.findAll()).stream().findAny().ifPresent(company -> {
            map.put("COMPANY_NAME", company.getName());
            map.put("COMPANY_PHONE", "الهاتف: " + company.getPhone());
            map.put("COMPANY_MOBILE","الجوال: " +  company.getMobile());
            map.put("COMPANY_FAX", "الفاكس: " + company.getFax());
            map.put("COMPANY_COMMERCIAL_REGISTER", "السجل التجاري: " + company.getCommericalRegisteration());
        });
        ClassPathResource jrxmlFile = new ClassPathResource("/report/person/Persons.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(jrxmlFile.getInputStream());
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map);
        JasperExportManager.exportReportToPdfStream(jasperPrint, outStream);
    }

    @RequestMapping(value = "/report/Persons/{branchId}", method = RequestMethod.GET, produces = "application/pdf")
    @ResponseBody
    public void ReportPersonsByBranch(@PathVariable("branchId") Long branchId, HttpServletResponse response) throws JRException, IOException {
        Branch branch = branchService.findOne(branchId);
        if (branch == null) {
            throw new CustomException("عفواً، هذا الفرع غير موجود");
        }
        /**
         * Insert Parameters
         */
        Map<String, Object> map = new HashMap<>();
        StringBuilder param1 = new StringBuilder();
        param1.append("المعهد الأهلي العالي للتدريب");
        param1.append("\n");
        param1.append("تحت إشراف المؤسسة العامة للتدريب المهني والتقني");
        param1.append("\n");
        param1.append("تقرير بيانات أفراد الفرع / " + branch.getName());
        map.put("title", param1.toString());
        List<Person> list = new ArrayList<>();
        list.add(branch.getManager());
        branch.getDepartments().forEach(department -> {
            list.add(department.getManager());
            list.addAll(department.getEmployees().stream().map(employee -> employee.getPerson()).collect(Collectors.toList()));
        });
        map.put("persons", list.stream().distinct().collect(Collectors.toList()));
        ClassPathResource jrxmlFile = new ClassPathResource("/report/person/Persons.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(jrxmlFile.getInputStream());
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map);
        final OutputStream outputStream = response.getOutputStream();
        response.setContentType("application/xlsx");
        response.setHeader("Content-Disposition", "inline; filename=\"report.xlsx\"");
        Exporter exporter = new JRXlsxExporter();
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
        SimpleXlsxReportConfiguration configurationXlsx = new SimpleXlsxReportConfiguration();
        configurationXlsx.setOnePagePerSheet(false);
        exporter.setConfiguration(configurationXlsx);
        exporter.exportReport();
        outputStream.flush();
        outputStream.close();
    }

}
