package com.venkat.backend.repository;

import com.venkat.backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByCategoryIgnoreCaseAndPriceLessThanEqual(
            String category,
            double maxPrice
    );

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByCategoryIgnoreCaseAndBrandIgnoreCase(
            String category,
            String brand
    );

    List<Product> findByCategoryIgnoreCaseAndBrandIgnoreCaseAndPriceLessThanEqual(
            String category,
            String brand,
            double maxPrice
    );
}