package com.ProjectCiclo4.Backend.service;

import com.ProjectCiclo4.Backend.model.Clothes;
import com.ProjectCiclo4.Backend.repository.ClothesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Nicolas Monroy
 */
@Service
public class ClothesService {
    @Autowired
    private ClothesRepository clothesRepository;

    public List<Clothes> getAll(){return clothesRepository.getAll();}

    public Optional<Clothes> getClothes(String reference){return clothesRepository.getClothes(reference);}

    public Clothes create(Clothes clothes){
        if(clothes.getReference()==null)
    }
}
