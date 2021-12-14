package com.ProjectCiclo4.Backend.repository;

import com.ProjectCiclo4.Backend.model.Order;
import com.ProjectCiclo4.Backend.model.User;
import com.ProjectCiclo4.Backend.repository.crud.OrderCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Repository
public class OrderRepository {
    @Autowired
    private OrderCRUDRepository orderCRUDRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Order> getAll() {
        return (List<Order>) orderCRUDRepository.findAll();
    }

    public Optional<Order> getOrder(int id) {
        return orderCRUDRepository.findById(id);
    }

    public List<Order> getByZone(String zone) {
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

    public List<Order> ordersBySalesManByID(Integer id) {
        Query query = new Query();

        Criteria criteria = Criteria.where("salesMan.id").is(id);
        query.addCriteria(criteria);

        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }

    public List<Order> ordersSalesmanByState(String state, Integer id) {
        Query query = new Query();
        Criteria criteria = Criteria.where("salesMan.id").is(id).and("status").is(state);

        query.addCriteria(criteria);

        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }

    public List<Order> ordersSalesmanByDate(String dateSTR, Integer id) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Query query = new Query();

        Criteria dateCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateSTR, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateSTR, dtf).plusDays(1).atStartOfDay())
                .and("salesMan.id").is(id);

        query.addCriteria(dateCriteria);

        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }
}
