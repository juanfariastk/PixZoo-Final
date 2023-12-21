package com.pixzoo.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pixzoo.back.model.AnimalEntry;
import com.pixzoo.back.model.AnimalUpdate;
import com.pixzoo.back.model.Sweepstake;
import com.pixzoo.back.service.AnimalService;
import com.pixzoo.back.service.SweepstakeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/animals")
public class AnimalController {

    private final AnimalService animalService;
    private final SweepstakeService sweepstakeService;

    @Autowired
    public AnimalController(AnimalService animalService, SweepstakeService sweepstakeService) {
        this.animalService = animalService;
        this.sweepstakeService = sweepstakeService;
    }

    @GetMapping("/draw/{draws}")
    public List<Map.Entry<String, String[]>> listRandomDrawAnimals(@PathVariable int draws) {
        return animalService.getRandomAnimals(draws);
    }
    
    @PostMapping("/draw")
    public void createSweepstake(@RequestBody List<AnimalEntry> receivedAnimals) {
        sweepstakeService.createSweepstake(receivedAnimals);
    }
    
    @GetMapping("/draw")
    public ResponseEntity<List<Sweepstake>> getDraws() {
        return sweepstakeService.listActualDraw();
    }
    
    @PutMapping("/fraud")
    public ResponseEntity<Object> fraudSweeptake(@RequestBody List<AnimalUpdate> updates) {
        List<Sweepstake> animals = sweepstakeService.fraudSweeptake(updates);
        return ResponseEntity.ok(animals);
    }
}