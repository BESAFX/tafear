package com.besafx.app.entity;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "personSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "PERSON_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "personSequenceGenerator")
    @JsonView(Views.Summery.class)
    private Long id;

    @JsonView(Views.Summery.class)
    private String name;

    @JsonView(Views.Summery.class)
    private String nickname;

    @JsonView(Views.Summery.class)
    private String address;

    @JsonView(Views.Summery.class)
    private String mobile;

    @JsonView(Views.Summery.class)
    private String nationality;

    @JsonView(Views.Summery.class)
    private String identityNumber;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @JsonView(Views.Summery.class)
    private String options;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @JsonView(Views.Summery.class)
    private String photo;

    @JsonView(Views.Summery.class)
    private String qualification;

    @JsonView(Views.Summery.class)
    private String email;

    @JsonView(Views.Summery.class)
    private String password;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean technicalSupport;

    @Column(columnDefinition = "boolean default true", nullable = false)
    private Boolean enabled;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean tokenExpired;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean active;

    @JsonIgnore
    private String hiddenPassword;

    @JsonView(Views.Summery.class)
    private Date lastLoginDate;

    @JsonView(Views.Summery.class)
    private String lastLoginLocation;

    @JsonView(Views.Summery.class)
    private String ipAddress;

    @ManyToOne
    @JoinColumn(name = "team")
    @JsonIgnoreProperties(value = {"persons"}, allowSetters = true)
    @JsonView(Views.Summery.class)
    private Team team;

    @OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
    private List<Company> companies = new ArrayList<>();

    @OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
    private List<Region> regions = new ArrayList<>();

    @OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
    private List<Branch> branches = new ArrayList<>();

    @OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
    private List<Department> departments = new ArrayList<>();

    @OneToMany(mappedBy = "person", fetch = FetchType.LAZY)
    @JsonView(Views.Summery.class)
    private List<Employee> employees = new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    @JsonView(Views.Summery.class)
    private Date lastUpdate;

    public Person findManager(){
        try{
            if (!this.employees.isEmpty()) {
                return this.employees.get(0).getDepartment().getBranch().getRegion().getCompany().getManager();
            } else if (!this.departments.isEmpty()) {
                return this.departments.get(0).getBranch().getRegion().getCompany().getManager();
            } else if (!this.branches.isEmpty()) {
                return this.branches.get(0).getRegion().getCompany().getManager();
            } else if (!this.regions.isEmpty()) {
                return this.regions.get(0).getCompany().getManager();
            } else if (this.companies.isEmpty()) {
                return this.companies.get(0).getManager();
            } else {
                return this;
            }
        }catch (Exception ex){
            return null;
        }
    }

    @JsonCreator
    public static Person Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Person person = mapper.readValue(jsonString, Person.class);
        return person;
    }
}
