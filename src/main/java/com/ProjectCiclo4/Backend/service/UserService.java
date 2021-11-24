package com.ProjectCiclo4.Backend.service;

import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Nicolas Monroy
 *
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

    public User registrar(User user) {
        if (user.getId() == null) {
            if (existeEmail(user.getEmail()) == false) {
                return userRepository.save(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    public boolean existeEmail(String email) {
        return userRepository.emailExists(email);
    }

    public User autenticarUsuario(String email, String password) {
        Optional<User> user = userRepository.autenticateUser(email, password);

        if (user.isEmpty()) {
            return new User(email, password, "NO DEFINIDO");
        } else {
            return user.get();
        }
    }


}

