package com.venkat.backend.controller;

import com.venkat.backend.dto.ChatRequest;
import com.venkat.backend.dto.SearchCriteria;
import com.venkat.backend.model.Product;
import com.venkat.backend.service.GroqService;
import com.venkat.backend.service.ProductService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AiSearchController {

    private final GroqService groqService;
    private final ProductService productService;

    public AiSearchController(GroqService groqService,
                          ProductService productService) {
    this.groqService = groqService;
    this.productService = productService;
}

    @PostMapping("/search")
public List<Product> aiSearch(@RequestBody ChatRequest request) {

    SearchCriteria criteria =
            groqService.extractSearchCriteria(request.getMessage());

    return productService.searchProducts(criteria);
}
}