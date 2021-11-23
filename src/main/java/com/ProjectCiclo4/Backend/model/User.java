package com.ProjectCiclo4.Backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

/**
 *
 * @author Nicolas Monroy
 *
 */
@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name = "user",indexes = @Index(name = "index_email",columnList="user_email",unique = true))
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NonNull
    @Column(name = "user_email",nullable = false,length = 50)
    private String email;
    @NonNull
    @Column(name = "user_password",nullable = false,length = 50)
    private String password;
    @NonNull
    @Column(name = "user_name",nullable = false,length = 80)
    private String name;
}
