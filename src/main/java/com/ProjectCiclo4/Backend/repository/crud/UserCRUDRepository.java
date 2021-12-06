package com.ProjectCiclo4.Backend.repository.crud;
import com.ProjectCiclo4.Backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
/**
 *
 * @author Nicolas Monroy
 *
 */
public interface UserCRUDRepository extends MongoRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email,String password);

    Optional<User> findTopByOrderByIdDesc();

}