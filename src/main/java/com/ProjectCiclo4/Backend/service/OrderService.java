package com.ProjectCiclo4.Backend.service;

import com.ProjectCiclo4.Backend.model.Order;
import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    /*
     * Instance of UserRepository class
     */
    private OrderRepository orderRepository;
    
    public List<Order> getAll() {
        return orderRepository.getAll();
    }

    public Optional<Order> getOrder(int id) {
        return orderRepository.getOrder(id);
    }

    public List<Order> getByZone(String zone) {
        return orderRepository.getByZone(zone);
    }

    public Order create(Order order) {
        Optional<Order> orderLastId = orderRepository.lastUserId();
        if (order.getId() == null) {
            if (orderLastId.isEmpty()) {
                order.setId(1);
            } else {
                order.setId(orderLastId.get().getId() + 1);
            }
        }

        Optional<Order> e = orderRepository.getOrder(order.getId());
        if (e.isEmpty()) {
            return orderRepository.create(order);
        } else {
            return order;
        }
    }

    public Order update(Order order) {

        if (order.getId() != null) {
            Optional<Order> orderDb = orderRepository.getOrder(order.getId());
            if (!orderDb.isEmpty()) {
                if (order.getStatus() != null) {
                    orderDb.get().setStatus(order.getStatus());
                }
                orderRepository.update(orderDb.get());
                return orderDb.get();
            } else {
                return order;
            }
        } else {
            return order;
        }
    }

    public boolean delete(int id) {
        Boolean aBoolean = getOrder(id).map(order -> {
            orderRepository.delete(order);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public List<Order> findOrdersBySalesmanID(Integer id) {
        return orderRepository.ordersBySalesManByID(id);
    }

    public List<Order> findOrdersBySalesmanByState(String state, Integer id) {
        return orderRepository.ordersSalesmanByState(state, id);
    }

    public List<Order> findOrderBySalesmanAndDate(String dateSTR, Integer id) {
        return orderRepository.ordersSalesmanByDate(dateSTR, id);
    }
}
