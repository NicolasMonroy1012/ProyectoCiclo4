package com.ProjectCiclo4.Backend.repository;

import com.ProjectCiclo4.Backend.model.Order;
import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.repository.crud.OrderCRUDRepository;
import com.ProjectCiclo4.Backend.repository.crud.UserCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepository {
    @Autowired
    private OrderCRUDRepository orderCRUDRepository;

    public List<Order> getAll() {
        return (List<Order>) orderCRUDRepository.findAll();
    }

    public Optional<Order> getOrder(int id) {
        return orderCRUDRepository.findById(id);
    }

    public List<Order> getByZone(String zone){
        return (List<Order>) orderCRUDRepository.findByZone(zone);
    }

    public Order create(Order order) {
        return orderCRUDRepository.save(order);
    }

    public void update(Order order) {
        orderCRUDRepository.save(order);
    }

    public void delete(Order order) {
        orderCRUDRepository.delete(order);
    }

    public Optional<Order> lastUserId() {
        return orderCRUDRepository.findTopByOrderByIdDesc();
    }
}
