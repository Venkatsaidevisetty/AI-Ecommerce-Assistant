package com.venkat.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venkat.backend.dto.SearchCriteria;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    public SearchCriteria extractSearchCriteria(String userMessage) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            String url = "https://api.groq.com/openai/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(groqApiKey);

            Map<String, Object> systemMessage = Map.of(
                    "role", "system",
                    "content",
                    "Extract intent from the user's product search. " +
                    "Return ONLY compact valid JSON. " +
                    "Field names must be exactly: category, brand, maxPrice, keywords. " +
                    "Example: {\"category\":\"Laptop\",\"brand\":\"\",\"maxPrice\":1000,\"keywords\":\"gaming\"}. " +
                    "Use empty string if unknown and 0 if no maxPrice. No markdown. No explanation."
            );

            Map<String, Object> userMsg = Map.of(
                    "role", "user",
                    "content", userMessage
            );

            Map<String, Object> requestBody = Map.of(
                    "model", "llama-3.1-8b-instant",
                    "messages", List.of(systemMessage, userMsg),
                    "temperature", 0,
                    "max_tokens", 100
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(url, request, Map.class);

            String aiResponse = extractText(response.getBody());

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(aiResponse, SearchCriteria.class);

        } catch (Exception e) {
            System.out.println("Groq failed: " + e.getMessage());

            SearchCriteria fallback = new SearchCriteria();
            fallback.setKeywords(userMessage);

            return fallback;
        }
    }

    private String extractText(Map responseBody) {
        List choices = (List) responseBody.get("choices");

        if (choices == null || choices.isEmpty()) {
            return "";
        }

        Map firstChoice = (Map) choices.get(0);
        Map message = (Map) firstChoice.get("message");

        if (message == null) {
            return "";
        }

        return message.get("content").toString();
    }
}