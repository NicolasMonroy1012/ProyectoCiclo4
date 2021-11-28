package com.ProjectCiclo4.Backend.controller;

import com.ProjectCiclo4.Backend.model.Clothe;
import com.ProjectCiclo4.Backend.service.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Nicolas Monroy
 */
@RestController
@RequestMapping("/api/clothe")
@CrossOrigin("*")
public class ClothesController {
    @Autowired
    private ClothesService clothesService;

    @GetMapping("/all")
    public List<Clothe> getAll() {
        return clothesService.getAll();
    }

    @GetMapping("/{reference}")
    public Optional<Clothe> getClothe(@PathVariable("reference") String reference) {
        return clothesService.getClothe(reference);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Clothe create(@RequestBody Clothe clothe) {
        return clothesService.create(clothe);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Clothe update(@RequestBody Clothe clothe) {
        return clothesService.update(clothe);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return clothesService.delete(reference);
    }


}
