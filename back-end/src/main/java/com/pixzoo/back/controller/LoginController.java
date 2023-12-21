package com.pixzoo.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pixzoo.back.model.Login;
import com.pixzoo.back.model.LoginSession;
import com.pixzoo.back.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {
    
    private final LoginService loginService;
    
    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }
    
    @PostMapping()
    public ResponseEntity<Object> createSession(@RequestBody Login login) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(loginService.createSession(login));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<LoginSession>> getAllLoginSessions() {
        List<LoginSession> loginSessions = loginService.getAllLoginSessions();
        return ResponseEntity.ok(loginSessions);
    }
}

