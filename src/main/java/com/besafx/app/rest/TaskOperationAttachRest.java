package com.besafx.app.rest;

import com.besafx.app.config.DropboxManager;
import com.besafx.app.entity.TaskOperationAttach;
import com.besafx.app.service.TaskOperationAttachService;
import com.besafx.app.service.TaskOperationService;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@RestController
@RequestMapping(value = "/api/taskOperationAttach/")
public class TaskOperationAttachRest {

    private final static Logger log = LoggerFactory.getLogger(TaskOperationAttachRest.class);

    private final String FILTER_ALL = "**";
    private final String FILTER_TABLE = "**,taskOperation[id]";

    @Autowired
    private TaskOperationService taskOperationService;

    @Autowired
    private TaskOperationAttachService taskOperationAttachService;

    @Autowired
    private DropboxManager dropboxManager;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "upload/{taskOperationId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String upload(
            @PathVariable(value = "taskOperationId") Long taskOperationId,
            @RequestParam(value = "file") MultipartFile file,
            Principal principal) throws ExecutionException, InterruptedException {
        TaskOperationAttach attach = new TaskOperationAttach();
        attach.setTaskOperation(taskOperationService.findOne(taskOperationId));
        attach.setName(file.getOriginalFilename());
        Future<Boolean> uploadTask = dropboxManager.uploadFile(file, "/tafear/TaskOperations/" + taskOperationId + "/" + file.getOriginalFilename());
        if (uploadTask.get()) {
            Future<String> shareTask = dropboxManager.shareFile("/tafear/TaskOperations/" + taskOperationId + "/" + file.getOriginalFilename());
            attach.setLink(shareTask.get());
            attach.setSize(file.getSize());
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على المهام")
                    .message("تم رفع الملف بنجاح.")
                    .type("success")
                    .icon("fa-upload")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), taskOperationAttachService.save(attach));
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Boolean delete(@PathVariable Long id, Principal principal) throws ExecutionException, InterruptedException {
        TaskOperationAttach taskOperationAttach = taskOperationAttachService.findOne(id);
        if (taskOperationAttach != null) {
            Future<Boolean> deleteTask = dropboxManager.deleteFile("/tafear/TaskOperations/" + taskOperationAttach.getTaskOperation().getId() + "/" + taskOperationAttach.getName());
            if (deleteTask.get()) {
                taskOperationAttachService.delete(taskOperationAttach);
                notificationService.notifyOne(Notification
                        .builder()
                        .title("المعاملات الداخلية")
                        .message("تم حذف الملف بنجاح.")
                        .type("success")
                        .icon("fa-trash")
                        .build(), principal.getName());
                return true;
            } else {
                notificationService.notifyOne(Notification
                        .builder()
                        .title("المعاملات الداخلية")
                        .message("لا يمكن حذف الملف.")
                        .type("error")
                        .icon("fa-trash")
                        .build(), principal.getName());
                return false;
            }
        }else{
            return false;
        }
    }

    @RequestMapping(value = "deleteWhatever/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteWhatever(@PathVariable Long id, Principal principal) throws ExecutionException, InterruptedException {
        TaskOperationAttach taskOperationAttach = taskOperationAttachService.findOne(id);
        if (taskOperationAttach != null) {
            taskOperationAttachService.delete(taskOperationAttach);
            notificationService.notifyOne(Notification
                    .builder()
                    .title("المعاملات الخارجية")
                    .message("تم حذف الملف بنجاح.")
                    .type("success")
                    .icon("fa-trash")
                    .build(), principal.getName());
        }
    }

    @RequestMapping(value = "findByTaskOperation/{taskOperationId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TaskOperationAttach> findByTaskOperation(@PathVariable(value = "taskOperationId") Long taskOperationId) {
        return taskOperationAttachService.findByTaskOperationId(taskOperationId);
    }

}
