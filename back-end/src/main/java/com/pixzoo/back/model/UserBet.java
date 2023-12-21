package com.pixzoo.back.model;

import jakarta.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class UserBet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String userCPF;
    private String userEmail;

    @OneToMany(cascade = CascadeType.ALL)
    private List<AnimalEntry> animalsSelected;

    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserCPF() {
		return userCPF;
	}
	public void setUserCPF(String userCPF) {
		this.userCPF = userCPF;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public List<AnimalEntry> getAnimalsSelected() {
		return animalsSelected;
	}
	public void setAnimalsSelected(List<AnimalEntry> animalsSelected) {
		this.animalsSelected = animalsSelected;
	}
	public double getAmountBet() {
		return amountBet;
	}
	public void setAmountBet(double amountBet) {
		this.amountBet = amountBet;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	private double amountBet;
    private LocalDateTime date;

}
