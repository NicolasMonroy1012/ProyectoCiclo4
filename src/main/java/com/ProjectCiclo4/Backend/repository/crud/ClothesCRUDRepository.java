package com.ProjectCiclo4.Backend.repository.crud;

import com.ProjectCiclo4.Backend.model.Clothes;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 *
 * @author Nicolas Monroy
 *
 */
public interface ClothesCRUDRepository extends MongoRepository<Clothes,String> {

}
