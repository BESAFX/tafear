package com.besafx.app.entity;

import com.besafx.app.entity.enums.CloseType;
import com.besafx.app.entity.enums.CommentType;
import com.besafx.app.entity.enums.Importance;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "taskSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "TASK_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "taskSequenceGenerator")
    @JsonView(Views.Summery.class)
    private Long id;

    @JsonView(Views.Summery.class)
    private Integer code;

    @JsonView(Views.Summery.class)
    private String title;

    @JsonView(Views.Summery.class)
    private Integer warn;

    @JsonView(Views.Summery.class)
    private Double deduction;

    @JsonView(Views.Summery.class)
    private Double deductionOnAutoClose;

    @Enumerated(EnumType.STRING)
    @Column(length = 32, columnDefinition = "varchar(32) default 'Pending'")
    @JsonView(Views.Summery.class)
    private CloseType closeType;

    @Enumerated(EnumType.STRING)
    @Column(length = 32, columnDefinition = "varchar(32) default 'Regular'")
    @JsonView(Views.Summery.class)
    private Importance importance;

    @Enumerated(EnumType.STRING)
    @Column(length = 32, columnDefinition = "varchar(32) default 'Day'")
    @JsonView(Views.Summery.class)
    private CommentType commentType;

    @JsonView(Views.Summery.class)
    @Column(length = 5, columnDefinition = "int default 1")
    private Integer commentTypeCount;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @JsonView(Views.Summery.class)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(Views.Summery.class)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(Views.Summery.class)
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "person")
    @JsonIgnoreProperties(value = {"companies", "regions", "branches", "departments", "employees", "team"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private Person person;

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"task"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private List<TaskTo> taskTos = new ArrayList<>();

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"task"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private List<TaskCloseRequest> taskCloseRequests = new ArrayList<>();

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"task"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private List<TaskOperation> taskOperations = new ArrayList<>();

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"task"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private List<TaskWarn> taskWarns = new ArrayList<>();

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"task"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private List<TaskDeduction> taskDeductions = new ArrayList<>();

    public String getCloseTypeInArabic() {
        try{
            return this.closeType.getName();
        }catch (Exception ex){
            return "";
        }
    }

    public String getImportanceInArabic() {
        try{
            return this.importance.getName();
        }catch (Exception ex){
            return "";
        }
    }

    public String getCommentTypeInArabic() {
        try{
            return this.commentType.getName();
        }catch (Exception ex){
            return "";
        }
    }

    @JsonCreator
    public static Task Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Task task = mapper.readValue(jsonString, Task.class);
        return task;
    }

}
