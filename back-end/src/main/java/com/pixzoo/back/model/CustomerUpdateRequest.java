package com.pixzoo.back.model;

public class CustomerUpdateRequest {
	 private String name;
	 private String email;
	 private Double amountDeposited;
	 
	 public Double getAmountDeposited() {
		return amountDeposited;
	}
	public void setAmountDeposited(Double amountDeposited) {
		this.amountDeposited = amountDeposited;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

}
