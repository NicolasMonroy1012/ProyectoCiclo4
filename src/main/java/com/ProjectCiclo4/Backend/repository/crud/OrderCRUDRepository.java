package com.ProjectCiclo4.Backend.repository.crud;

import com.ProjectCiclo4.Backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderCRUDRepository extends MongoRepository<Order, Integer> {
    @Query("{'salesMan.zone': ?0}")
    List<Order> findByZone(final String country);

    @Query("{status: ?0}")
    List<Order> findByStatus(final String status);

    Optional<Order>findTopByOrderByIdDesc();
}
