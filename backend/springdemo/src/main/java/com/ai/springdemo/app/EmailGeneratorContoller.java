package com.ai.springdemo.app;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailGeneratorContoller {

    public ResponseEntity<String> generateEmail(@RequestParam EmailRequest emailRequest) {
        return ResponseEntity.ok("Email generated");
    }
}
