package com.ProjectCiclo4.Backend.repository.crud;

import com.ProjectCiclo4.Backend.model.User;
import net.bytebuddy.dynamic.DynamicType;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 *
 * @author Nicolas Monroy
 *
 */
public interface UserCRUDRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email,String password);

}
