package com.ProjectCiclo4.Backend.service;


import com.ProjectCiclo4.Backend.model.Clothe;
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
    private ClothesRepository clotheRepository;

    public List<Clothe> getAll() {
        return clotheRepository.getAll();
    }

    public Optional<Clothe> getClothe(String reference) {
        return clotheRepository.getClothe(reference);
    }

    public Clothe create(Clothe clothe) {
        if (clothe.getReference() == null) {
            return clothe;
        } else {
            return clotheRepository.save(clothe);
        }
    }

    public Clothe update(Clothe clothe) {

        if (clothe.getReference() != null) {
            Optional<Clothe> clotheDb = clotheRepository.getClothe(clothe.getReference());
            if (!clotheDb.isEmpty()) {

                if (clothe.getReference()!= null) {
                    clotheDb.get().setReference(clothe.getReference());
                }

                if (clothe.getCategory() != null) {
                    clotheDb.get().setCategory(clothe.getCategory());
                }

                if (clothe.getDescription() != null) {
                    clotheDb.get().setDescription(clothe.getDescription());
                }
                if (clothe.getPrice() != 0.0) {
                    clotheDb.get().setPrice(clothe.getPrice());
                }
                if (clothe.getQuantity() != 0) {
                    clotheDb.get().setQuantity(clothe.getQuantity());
                }
                if (clothe.getPhotography() != null) {
                    clotheDb.get().setPhotography(clothe.getPhotography());
                }
                clotheDb.get().setAvailability(clothe.isAvailability());
                clotheRepository.update(clotheDb.get());
                return clotheDb.get();
            } else {
                return clothe;
            }
        } else {
            return clothe;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getClothe(reference).map(accesory -> {
            clotheRepository.delete(accesory);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
