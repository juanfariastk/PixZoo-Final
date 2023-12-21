package com.pixzoo.back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Sweepstake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	private String animalKey;
    private String[] animalValues;

    private LocalDateTime createdAt;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAnimalKey() {
		return animalKey;
	}

	public void setAnimalKey(String animalKey) {
		this.animalKey = animalKey;
	}

	public String[] getAnimalValues() {
		return animalValues;
	}

	public void setAnimalValues(String[] animalValues) {
		this.animalValues = animalValues;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}



}

