package com.besafx.app.init;
import com.besafx.app.entity.Company;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Team;
import com.besafx.app.service.CompanyService;
import com.besafx.app.service.PersonService;
import com.besafx.app.service.TeamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Initializer implements CommandLineRunner {

    private final static Logger log = LoggerFactory.getLogger(Initializer.class);

    @Autowired
    private TeamService teamService;

    @Autowired
    private PersonService personService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (personService.count() == 0) {
            runForFirstTimeOnly();
        }
    }

    private void runForFirstTimeOnly() {
        log.info("انشاء مجموعة الصلاحيات");
        Team team = new Team();
        team.setCode(1);
        team.setName("الدعم الفني");
        team.setAuthorities(String.join(",",
                "ROLE_COMPANY_UPDATE",
                "ROLE_REGION_CREATE",
                "ROLE_REGION_UPDATE",
                "ROLE_REGION_DELETE",
                "ROLE_BRANCH_CREATE",
                "ROLE_BRANCH_UPDATE",
                "ROLE_BRANCH_DELETE",
                "ROLE_DEPARTMENT_CREATE",
                "ROLE_DEPARTMENT_UPDATE",
                "ROLE_DEPARTMENT_DELETE",
                "ROLE_EMPLOYEE_CREATE",
                "ROLE_EMPLOYEE_UPDATE",
                "ROLE_EMPLOYEE_DELETE",
                "ROLE_TEAM_CREATE",
                "ROLE_TEAM_UPDATE",
                "ROLE_TEAM_DELETE",
                "ROLE_TASK_CREATE",
                "ROLE_TASK_UPDATE",
                "ROLE_TASK_DELETE",
                "ROLE_TASK_OPERATION_CREATE",
                "ROLE_PERSON_CREATE",
                "ROLE_PERSON_UPDATE",
                "ROLE_PERSON_DELETE",
                "ROLE_PROFILE_UPDATE"
        ));
        teamService.save(team);
        //
        log.info("أنشاء المستخدم الخاص بمدير النظام");
        Person person = new Person();
        person.setNickname("السيد");
        person.setName("مدير النظام");
        person.setPhoto("/no-image.jpg");
        person.setQualification("مدير النظام");
        person.setEmail("tafear@ararhni.com");
        person.setPassword(passwordEncoder.encode("tafear"));
        person.setHiddenPassword("tafear");
        person.setEnabled(true);
        person.setTokenExpired(false);
        person.setActive(false);
        person.setTechnicalSupport(false);
        person.setTeam(team);
        personService.save(person);
        //
        log.info("انشاء الشركة");
        Company company = new Company();
        company.setCode(1);
        company.setName(" شركة طيف العربية للتعليم والتدريب التقنى");
        company.setPhone("0138099353");
        company.setFax("0138099352");
        company.setEmail("info@tafear.com");
        company.setWebsite("www.tafear.com");
        company.setManager(person);
        companyService.save(company);
    }
}
