package com.venkat.backend.loader;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.venkat.backend.model.Product;
import com.venkat.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class ProductLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public ProductLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (productRepository.count() > 0) {
            System.out.println("Products already exist. Skipping product load.");
            return;
        }

        ObjectMapper mapper = new ObjectMapper();

        InputStream inputStream =
                new ClassPathResource("products.json").getInputStream();

        List<Product> products =
                mapper.readValue(inputStream, new TypeReference<List<Product>>() {});

        productRepository.saveAll(products);

        System.out.println("Loaded " + products.size() + " products into MongoDB.");
    }
}