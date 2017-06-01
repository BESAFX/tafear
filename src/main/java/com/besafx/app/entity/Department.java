package com.besafx.app.entity;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "departmentSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "DEPARTMENT_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "departmentSequenceGenerator")
    @JsonView(Views.Summery.class)
    private Long id;

    @JsonView(Views.Summery.class)
    private Integer code;

    @JsonView(Views.Summery.class)
    private String name;

    @ManyToOne
    @JoinColumn(name = "Manager")
    @JsonIgnoreProperties(value = {"companies", "regions", "branches", "departments", "employees"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private Person manager;

    @ManyToOne
    @JoinColumn(name = "Branch")
    @JsonIgnoreProperties(value = {"departments"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private Branch branch;

    @OneToMany(mappedBy = "department")
    private List<Employee> employees = new ArrayList<>();

    @JsonCreator
    public static Department Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Department department = mapper.readValue(jsonString, Department.class);
        return department;
    }
}
