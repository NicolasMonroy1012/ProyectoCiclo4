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
    private UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.getAll();
    }

    public Optional<User> getUser(int id) {
        return userRepository.getUser(id);
    }

    public User register(User user) {
        if (user.getId() == null) {
            return user;
        } else {
            if (emailExists(user.getEmail()) == false) {
                return userRepository.save(user);
            } else {
                return user;
            }
        }
    }

    public boolean emailExists(String email) {
        return userRepository.emailExists(email);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> user = userRepository.authenticateUser(email, password);

        if (user.isEmpty()) {
            return new User();
        } else {
            return user.get();
        }
    }


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
}

