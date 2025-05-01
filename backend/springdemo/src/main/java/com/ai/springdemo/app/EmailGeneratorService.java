package com.ai.springdemo.app;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailGeneratorService {
    

    public String generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);
        //создание запроса
        Map<String, Object> requestBody =
                Map.of("contents", new Object[]{
                        Map.of("parts", new Object[]{
                                        Map.of("text", prompt)
                        })
                });
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content in the language in which it is written.Please, dont generate a subject line");
        if(emailRequest.getTone()!=null && emailRequest.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
