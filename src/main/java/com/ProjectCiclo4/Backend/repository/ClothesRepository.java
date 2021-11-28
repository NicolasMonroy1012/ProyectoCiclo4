package com.ProjectCiclo4.Backend.repository;

import com.ProjectCiclo4.Backend.model.Clothe;
import com.ProjectCiclo4.Backend.repository.crud.ClothesCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Nicolas Monroy
 */
@Repository
public class ClothesRepository {
    @Autowired
    private ClothesCRUDRepository clothesCRUDRepository;

    public List<Clothe> getAll() {
        return (List<Clothe>) clothesCRUDRepository.findAll();
    }

    public Optional<Clothe> getClothe(String reference) {
        return clothesCRUDRepository.findById(reference);
    }

    public Clothe save(Clothe clothe) {
        return clothesCRUDRepository.save(clothe);
    }

    public void update(Clothe clothe) {
        clothesCRUDRepository.save(clothe);
    }

    public void delete(Clothe clothe) {
        clothesCRUDRepository.delete(clothe);
    }
}
