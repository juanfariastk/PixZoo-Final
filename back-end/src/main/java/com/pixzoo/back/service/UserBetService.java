package com.pixzoo.back.service;

import com.pixzoo.back.model.UserBet;
import com.pixzoo.back.repository.UserBetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UserBetService {

    private final UserBetRepository userBetRepository;

    @Autowired
    public UserBetService(UserBetRepository userBetRepository) {
        this.userBetRepository = userBetRepository;
    }

    public UserBet createBet(UserBet userBetRequest) {

    	LocalDateTime currentDateTime = LocalDateTime.now();


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        @SuppressWarnings("unused")
		String formattedDate = currentDateTime.format(formatter);

        UserBet newUserBet = new UserBet();
        newUserBet.setUserId(userBetRequest.getUserId());
        newUserBet.setUserCPF(userBetRequest.getUserCPF());
        newUserBet.setUserEmail(userBetRequest.getUserEmail());
        newUserBet.setAnimalsSelected(userBetRequest.getAnimalsSelected());
        newUserBet.setAmountBet(userBetRequest.getAmountBet());
        newUserBet.setDate(currentDateTime);

        return userBetRepository.save(newUserBet);
    }
    
    public List<UserBet> getAllUserBets() {
        return userBetRepository.findAll();
    }
    
    public List<UserBet> getUserBetsByUserId(Long userId) {
        return userBetRepository.findUserBetsByUserId(userId);
    }
}
