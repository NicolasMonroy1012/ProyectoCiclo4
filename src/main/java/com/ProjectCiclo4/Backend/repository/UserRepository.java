package com.ProjectCiclo4.Backend.repository;

import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.repository.crud.UserCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Nicolas Monroy
 */
@Repository
public class UserRepository {
    @Autowired
    private UserCRUDRepository userCRUDRepository;

    public List<User> getAll() {
        return (List<User>) userCRUDRepository.findAll();
    }

    public Optional<User> getUser(int id) {
        return userCRUDRepository.findById(id);
    }

    public User save(User user) {
        return userCRUDRepository.save(user);
    }

    public boolean emailExists(String email) {
        Optional<User> user = userCRUDRepository.findByEmail(email);
        return !user.isEmpty();
    }

    public Optional<User> authenticateUser(String email, String password) {
        return userCRUDRepository.findByEmailAndPassword(email, password);
    }

    public void update(User user) {
        userCRUDRepository.save(user);
    }

    public void delete(User user) {
        userCRUDRepository.delete(user);
    }

    public Optional<User> lastUserId(){return userCRUDRepository.findTopByOrderByIdDesc();}

    public List<User> getByMonthBirthdDay(String month){
        return userCRUDRepository.findByMonthBirthtDay(month);
    }
}
