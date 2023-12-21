package com.pixzoo.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.pixzoo.back.repository.SweepstakeRepository;

import jakarta.transaction.Transactional;

import com.pixzoo.back.model.AnimalData;
import com.pixzoo.back.model.AnimalEntry;
import com.pixzoo.back.model.AnimalUpdate;
import com.pixzoo.back.model.Sweepstake;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SweepstakeService {

    private final SweepstakeRepository sweepstakeRepository;

    @Autowired
    public SweepstakeService(SweepstakeRepository sweepstakeRepository) {
        this.sweepstakeRepository = sweepstakeRepository;
    }

    public List<AnimalEntry> createSweepstake(List<AnimalEntry> receivedAnimals) {
        if (canCreateSweepstake()) {
            List<Sweepstake> sweepstakes = convertToSweepstakes(receivedAnimals);
            List<Sweepstake> savedSweepstakes = sweepstakeRepository.saveAll(sweepstakes);
            sweepstakeRepository.saveCreatedAt(LocalDateTime.now());
            
            return convertToAnimalEntries(savedSweepstakes);
        } else {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "The draw change can only occur every 24 hours");
        }
    }
    
    @Autowired
    public ResponseEntity<List<Sweepstake>> listActualDraw() {
        try {
            List<Sweepstake> sweepstakes = sweepstakeRepository.findAll();
            return ResponseEntity.ok(sweepstakes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    @Transactional
    public List<Sweepstake> fraudSweeptake(List<AnimalUpdate> updates) {
        try {

            for (AnimalUpdate update : updates) {
                String oldAnimalKey = update.getOldAnimal();
                String newAnimalKey = update.getNewAnimal();
                

                Sweepstake oldAnimalSweepstake = sweepstakeRepository.findByAnimalKey(oldAnimalKey);
                String[] newAnimalValues = AnimalData.getAnimalByKey(newAnimalKey);
                
                /*if (newAnimalValues != null) {
                    System.out.println("Valores do novo animal:");
                    for (String value : newAnimalValues) {
                        System.out.println(value);
                    }
                }*/
                System.out.println(oldAnimalSweepstake.getAnimalKey());
               // System.out.println(newAnimalValues.toString());
                if (oldAnimalSweepstake != null && newAnimalValues != null) {
                    oldAnimalSweepstake.setAnimalKey(newAnimalKey);
                    oldAnimalSweepstake.setAnimalValues(AnimalData.getAnimalByKey(newAnimalKey));
                    sweepstakeRepository.save(oldAnimalSweepstake);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid animal data provided");
                }
            }

            return sweepstakeRepository.findAll();
        } catch (Exception e) {
        	System.out.println(e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid request");
        }
    }

    private boolean canCreateSweepstake() {
        LocalDateTime lastCreatedAt = sweepstakeRepository.findLastCreatedAt();
        if (lastCreatedAt == null) {
            return true;
        } else {
            Duration duration = Duration.between(lastCreatedAt, LocalDateTime.now());
            return duration.toHours() >= 24;
        }
    }
    
    private List<AnimalEntry> convertToAnimalEntries(List<Sweepstake> savedSweepstakes) {
        return savedSweepstakes.stream()
                .map(this::mapToAnimalEntry)
                .collect(Collectors.toList());
    }
    
    private AnimalEntry mapToAnimalEntry(Sweepstake sweepstake) {
        AnimalEntry animalEntry = new AnimalEntry();
        animalEntry.setKey(sweepstake.getAnimalKey());
        animalEntry.setValue(sweepstake.getAnimalValues());
        return animalEntry;
    }
    
    private List<Sweepstake> convertToSweepstakes(List<AnimalEntry> receivedAnimals) {
        return receivedAnimals.stream()
                .map(this::mapToSweepstake)
                .collect(Collectors.toList());
    }

    private Sweepstake mapToSweepstake(AnimalEntry animalEntry) {
        Sweepstake sweepstake = new Sweepstake();
        sweepstake.setAnimalKey(animalEntry.getKey());
        sweepstake.setAnimalValues(animalEntry.getValue());
        sweepstake.setCreatedAt(LocalDateTime.now());
        return sweepstake;
    }
}

