package com.ProjectCiclo4.Backend.controller;

import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.repository.UserRepository;
import com.ProjectCiclo4.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
/**
 *
 * This class allows mapping the entity user
 * @author Nicolas Monroy
 *
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    /**
     * Instance of UserService class
     */
    private UserService userService;

    /**
     * Map the table user and bring all users
     * @return a list of users in DB
     */
    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAll();
    }

    /**
     * Allows to map a new user registration
     * @param user
     * @return user register or the user
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User registrar(@RequestBody User user) {
        return userService.registrar(user);
    }

    /**
     * Allows to map if an user exist or not in the DB
     * @param email
     * @param password
     * @return the user or user with undefined name
     */
    @GetMapping("/{email}/{password}")
    public User autenticarUsuario(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userService.autenticarUsuario(email, password);
    }

    /**
     * Allows to map if an email exits or not
     * @param email
     * @return true or false
     */
    @GetMapping("/{email}")
    public boolean existeEmail(@PathVariable("email") String email) {
        return userService.existeEmail(email);
    }
}
