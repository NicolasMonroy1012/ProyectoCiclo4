package com.ProjectCiclo4.Backend.service;

import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Nicolas Monroy
 */
@Service
public class UserService {

    @Autowired
    /*
     * Instance of userRepository class
     */
    private UserRepository userRepository;

    /***
     *
     * @return a list of the inserted users
     */
    public List<User> getAll() {
        return userRepository.getAll();
    }

    /***
     *
     * @param id variable used to search a user in the BD
     * @return User that has exactly the same id
     */
    public Optional<User> getUser(int id) {
        return userRepository.getUser(id);
    }

    /***
     *
     * @param user variable of the User type that contains all the data of the user model
     * @return the user mentioned before
     */
    public User register(User user) {
        Optional<User> userLastId = userRepository.lastUserId();
        if (user.getId() == null) {
            if (userLastId.isEmpty()) {
                user.setId(1);
            } else {
                user.setId(userLastId.get().getId() + 1);
            }
        }
        Optional<User> e = userRepository.getUser(user.getId());
        if (e.isEmpty()) {
            if (emailExists(user.getEmail()) == false) {
                return userRepository.save(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    /***
     *
     * @param email user's email to check if it already exists
     * @return boolean if the email exists or not
     */
    public boolean emailExists(String email) {
        return userRepository.emailExists(email);
    }

    /***
     *
     * @param email user's email to check if a user created with that email
     * @param password user's password to check if a user created with that password
     * @return gets the user's info if exists
     */
    public User authenticateUser(String email, String password) {
        Optional<User> user = userRepository.authenticateUser(email, password);

        if (user.isEmpty()) {
            return new User();
        } else {
            return user.get();
        }
    }

    /***
     *
     * @param user Variable used to get the user's update
     * @return the new user (updated)
     */
    public User update(User user) {
        Optional<User> userDB = userRepository.getUser(user.getId());
        if (user.getId() != null) {
            if (!userDB.isEmpty()) {
                if (user.getIdentification() != null) {
                    userDB.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null) {
                    userDB.get().setName(user.getName());
                }
                if (user.getAddress() != null) {
                    userDB.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userDB.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userDB.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userDB.get().setPassword(user.getPassword());
                }

                if (user.getZone() != null) {
                    userDB.get().setZone(user.getZone());
                }
                if (user.getType() != null) {
                    userDB.get().setType(user.getType());
                }
                userRepository.update(userDB.get());
                return userDB.get();
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    /***
     *
     * @param userId the id to find the specific user
     * @return a boolean if the user was found and deleted
     */
    public boolean delete(int userId) {
        Boolean aBoolean = getUser(userId).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public List<User> getByMonthBirthDay(String month ){
        return userRepository.getByMonthBirthdDay(month);
    }
}

