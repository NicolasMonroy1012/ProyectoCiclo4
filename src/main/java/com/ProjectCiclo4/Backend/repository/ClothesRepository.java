package com.ProjectCiclo4.Backend.repository;

import com.ProjectCiclo4.Backend.model.Clothes;
import com.ProjectCiclo4.Backend.repository.crud.ClothesCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Nicolas Monroy
 *
 */
@Repository
public class ClothesRepository {
    @Autowired
    private ClothesCRUDRepository clothesCRUDRepository;

    public List<Clothes>getAll(){return (List<Clothes>) clothesCRUDRepository.findAll();}

    public Optional<Clothes>getClothes(String reference){return clothesCRUDRepository.findBy(reference);}

    public Clothes save(Clothes clothes){return clothesCRUDRepository.save(clothes);}


}
