package com.ProjectCiclo4.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * @author Nicolas Monroy
 */
@Document(collection = "clothes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Clothes {
    @Id
    private String reference;
    private String category;
    private String size;
    private String description;
    private boolean availability = true;
    private double price;
    private int quantity;
    private String photography;
}
