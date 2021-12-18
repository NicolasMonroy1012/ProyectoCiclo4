package com.ProjectCiclo4.Backend.repository.crud;

import com.ProjectCiclo4.Backend.model.Clothe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


/**
 * @author Nicolas Monroy
 */
public interface ClothesCRUDRepository extends MongoRepository<Clothe, String> {

    public List<Clothe> findByPrice(double price);

    public List<Clothe> findByDescriptionContainingIgnoreCase(String description);
}
