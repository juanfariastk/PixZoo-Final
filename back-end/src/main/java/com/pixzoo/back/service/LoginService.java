package com.pixzoo.back.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.pixzoo.back.repository.CustomerRepository;
import com.pixzoo.back.repository.AdministratorRepository;
import com.pixzoo.back.repository.SessionRepository;
import com.pixzoo.back.model.Login;
import com.pixzoo.back.model.LoginSession;
import com.pixzoo.back.model.User;

@Service
public class LoginService {
    
    private final CustomerRepository customerRepository;
    private final AdministratorRepository adminRepository;
    private final SessionRepository sessionRepository;
    
    public LoginService(CustomerRepository customerRepository, AdministratorRepository adminRepository, SessionRepository sessionRepository) {
        this.customerRepository = customerRepository;
        this.adminRepository = adminRepository;
        this.sessionRepository = sessionRepository;
    }
    
    public LoginSession createSession(Login receivedLogin) {

        User customer = customerRepository.findByEmailAndPassword(receivedLogin.getEmail(), receivedLogin.getPassword());
        if (customer != null) {
            return createSessionForUser(customer, "customer");
        }
        

        User admin = adminRepository.findByEmailAndPassword(receivedLogin.getEmail(), receivedLogin.getPassword());
        if (admin != null) {
            return createSessionForUser(admin, "administrator");
        }
        
        throw new RuntimeException("Email or password invalid!");
    }
    
    public List<LoginSession> getAllLoginSessions() {
        return sessionRepository.findAll();
    }
    
    private LoginSession createSessionForUser(User user, String userType) {
        LoginSession newSession = new LoginSession();
        newSession.setUserId(user.getId());
        newSession.setUserEmail(user.getEmail());
        newSession.setUserType(userType);
        newSession.setOpenedAt(formatCurrentDateTime());
        
        sessionRepository.save(newSession);
        
        return newSession;
    }
    
    private String formatCurrentDateTime() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return currentDateTime.format(formatter);
    }
}
