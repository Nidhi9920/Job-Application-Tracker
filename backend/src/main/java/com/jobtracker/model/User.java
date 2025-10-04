package com.jobtracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;           // full name of user

    @Column(nullable = false, unique = true)
    private String email;          // used for login

    @Column(nullable = false)
    private String password;       // encrypted password

    // Optional: add roles later for JWT-based authorization
    // @Column(nullable = false)
    // private String role = "USER";
}
