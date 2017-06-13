package com.besafx.app;
import com.besafx.app.component.ScheduledTasks;
import com.besafx.app.config.DropboxManager;
import com.besafx.app.controller.ReportTaskController;
import com.besafx.app.entity.Team;
import com.besafx.app.rest.PersonRest;
import com.besafx.app.rest.TaskOperationRest;
import com.besafx.app.search.TaskSearch;
import com.besafx.app.service.*;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.MessagingException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MainTests {

    /**
     * SELECT MAX(id) FROM task_operation;SELECT nextval('hibernate_sequence');
     */
    private final Logger log = LoggerFactory.getLogger(MainTests.class);

    private LocalDate today = new DateTime().withTimeAtStartOfDay().toLocalDate();

    private LocalDate tomorrow = new DateTime().plusDays(1).withTimeAtStartOfDay().toLocalDate();

    private String message = "";

    @Autowired
    private PersonService personService;

    @Autowired
    private BranchService branchService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskSearch taskSearch;

    @Autowired
    private TaskOperationService taskOperationService;

    @Autowired
    private TaskOperationRest taskOperationRest;

    @Autowired
    private ScheduledTasks scheduledTasks;

    @Autowired
    private TaskToService taskToService;

    @Autowired
    private TaskWarnService taskWarnService;

    @Autowired
    private TaskDeductionService taskDeductionService;

    @Autowired
    private DropboxManager dropboxManager;

    @Autowired
    private ReportTaskController reportTaskController;

    @Autowired
    private TaskCloseRequestService taskCloseRequestService;

    @Autowired
    private PersonRest personRest;

    @Autowired
    private TaskOperationAttachService taskOperationAttachService;

    @Autowired
    private TeamService teamService;

    @Test
    public void contextLoads() throws MessagingException {

    }
}
