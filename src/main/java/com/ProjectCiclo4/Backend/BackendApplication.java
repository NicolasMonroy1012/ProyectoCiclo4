package com.ProjectCiclo4.Backend;

import com.ProjectCiclo4.Backend.repository.crud.ClothesCRUDRepository;
import com.ProjectCiclo4.Backend.repository.crud.UserCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    @Autowired
    private UserCRUDRepository userCRUDRepository;
    @Autowired
    private ClothesCRUDRepository clothesCRUDRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        userCRUDRepository.deleteAll();
        clothesCRUDRepository.deleteAll();
    }
}