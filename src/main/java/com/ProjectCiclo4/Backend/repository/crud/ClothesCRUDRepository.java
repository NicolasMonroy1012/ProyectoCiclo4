package com.ProjectCiclo4.Backend.repository.crud;

import com.ProjectCiclo4.Backend.model.Clothe;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 *
 * @author Nicolas Monroy
 *
 */
public interface ClothesCRUDRepository extends MongoRepository<Clothe,String> {

}
