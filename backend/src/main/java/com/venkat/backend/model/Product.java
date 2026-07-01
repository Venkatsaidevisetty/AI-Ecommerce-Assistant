package com.venkat.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String name;
    private String category;
    private double price;
    private String description;
    private String imageUrl;

    public Product() {
    }

    public Product(String id, String name, String category, double price, String description,String imageUrl) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
    return imageUrl;
    }
    private String brand;

    public String getBrand() {
    return brand;
}
    public void setBrand(String brand) {
    this.brand = brand;
}

}