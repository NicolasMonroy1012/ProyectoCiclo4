package com.ProjectCiclo4.Backend.controller;

import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This class allows mapping the entity user
 *
 * @author Nicolas Monroy
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    /*
     * Instance of UserService class
     */
    private UserService userService;

    /**
     * Map the table user and bring all users
     *
     * @return a list of users in DB
     */
    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAll();
    }

    /**
     * Allows to map a new user registration
     *
     * @param user object that contains info of the user
     * @return user register or the user
     */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    /**
     * Allows mapping if a user exist or not in the DB
     *
     * @param email    String containing the email of the user
     * @param password String containing the passcode of the user
     * @return the user or user with undefined name
     */
    @GetMapping("/{email}/{password}")
    public User authenticateUser(@PathVariable("email") String email, @PathVariable("password") String password) {
        return userService.authenticateUser(email, password);
    }

    /**
     * Allows mapping if an email exits or not
     *
     * @param email String containing the email of the user
     * @return true or false if email exists
     */
    @GetMapping("/emailexist/{email}")
    public boolean emailExists(@PathVariable("email") String email) {
        return userService.emailExists(email);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return userService.delete(id);
    }

}
