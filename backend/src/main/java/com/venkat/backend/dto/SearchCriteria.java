
package com.venkat.backend.dto;
import com.fasterxml.jackson.annotation.JsonAlias;

public class SearchCriteria {

    private String category;
    private String brand;
    @JsonAlias("maxprice")
    private double maxPrice;

    private String keywords;

    public SearchCriteria() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}