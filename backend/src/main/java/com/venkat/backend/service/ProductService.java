package com.venkat.backend.service;

import com.venkat.backend.dto.SearchCriteria;
import com.venkat.backend.model.Product;
import com.venkat.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> searchProducts(SearchCriteria criteria) {

    String category = criteria.getCategory();
    String brand = criteria.getBrand();
    double maxPrice = criteria.getMaxPrice();
    String keywords = criteria.getKeywords();

    boolean hasCategory = category != null && !category.isEmpty();
    boolean hasBrand = brand != null && !brand.isEmpty();
    boolean hasMaxPrice = maxPrice > 0;

    List<Product> results;

    if (hasCategory && hasBrand && hasMaxPrice) {
        results = productRepository
                .findByCategoryIgnoreCaseAndBrandIgnoreCaseAndPriceLessThanEqual(
                        category, brand, maxPrice
                );
    } else if (hasCategory && hasBrand) {
        results = productRepository
                .findByCategoryIgnoreCaseAndBrandIgnoreCase(category, brand);
    } else if (hasCategory && hasMaxPrice) {
        results = productRepository
                .findByCategoryIgnoreCaseAndPriceLessThanEqual(category, maxPrice);
    } else if (hasCategory) {
        results = productRepository.findByCategoryIgnoreCase(category);
    } else {
        results = productRepository.findAll();
    }

    if (keywords != null && !keywords.isEmpty()) {
        results = results.stream()
                .filter(product ->
                        product.getName().toLowerCase().contains(keywords.toLowerCase()) ||
                        product.getDescription().toLowerCase().contains(keywords.toLowerCase())
                )
                .toList();
    }

    return results;
}
}