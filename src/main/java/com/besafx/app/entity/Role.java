package com.besafx.app.entity;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;

@Data
@Entity
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "roleSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "ROLE_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "roleSequenceGenerator")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Team")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "Permission")
    private Permission permission;

    @JsonCreator
    public static Role Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Role role = mapper.readValue(jsonString, Role.class);
        return role;
    }
}
