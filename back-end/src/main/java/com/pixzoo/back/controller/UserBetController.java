package com.pixzoo.back.controller;

import com.pixzoo.back.model.UserBet;
import com.pixzoo.back.service.UserBetService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userBet")
public class UserBetController {

    private final UserBetService userBetService;

    @Autowired
    public UserBetController(UserBetService userBetService) {
        this.userBetService = userBetService;
    }

    @PostMapping
    public ResponseEntity<UserBet> createBet(@RequestBody UserBet userBet) {
        try {
            UserBet createdBet = userBetService.createBet(userBet);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/all") 
    public ResponseEntity<List<UserBet>> getAllUserBets() {
        List<UserBet> allUserBets = userBetService.getAllUserBets();
        return ResponseEntity.status(HttpStatus.OK).body(allUserBets);
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<UserBet>> getUserBetsByUserId(@PathVariable Long userId) {
        List<UserBet> userBets = userBetService.getUserBetsByUserId(userId);
        if (userBets.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(userBets);
        }
    }
}
