package com.pixzoo.back.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.pixzoo.back.model.Sweepstake;


@Repository
public interface SweepstakeRepository extends JpaRepository<Sweepstake, Long> {
    
    Sweepstake findTopByOrderByCreatedAtDesc();

    default void saveCreatedAt(LocalDateTime createdAt) {
        Sweepstake latestSweepstake = findTopByOrderByCreatedAtDesc();
        if (latestSweepstake != null) {
            latestSweepstake.setCreatedAt(createdAt);
            save(latestSweepstake);
        }
    }

    default LocalDateTime findLastCreatedAt() {
        Sweepstake latestSweepstake = findTopByOrderByCreatedAtDesc();
        if (latestSweepstake != null) {
            return latestSweepstake.getCreatedAt();
        }
        return null;
    }
    
    List<Sweepstake> findAll();

    Sweepstake findByAnimalKey(String animalKey);

}
