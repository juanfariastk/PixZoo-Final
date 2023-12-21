package com.pixzoo.back.service;

import org.springframework.stereotype.Service;

import com.pixzoo.back.model.AnimalData;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    public List<Map.Entry<String, String[]>> getRandomAnimals(int draws) {
        if (draws <= 0 || draws > AnimalData.allAnimals.size()) {
            throw new IllegalArgumentException("Número inválido de animais");
        }

        List<String> keys = new ArrayList<>(AnimalData.allAnimals.keySet());
        Random random = new Random();

        List<String> randomKeys = random.ints(draws, 0, keys.size())
                .mapToObj(keys::get)
                .collect(Collectors.toList());

        return randomKeys.stream()
                .map(key -> Map.entry(key, AnimalData.allAnimals.get(key)))
                .collect(Collectors.toList());
    }
}
