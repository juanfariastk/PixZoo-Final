package com.pixzoo.back.model;

import java.util.HashMap;
import java.util.Map;

public class AnimalData {

    public static Map<String, String[]> allAnimals = new HashMap<>();

    static {
        allAnimals.put("01-AVESTRUZ", new String[]{"01", "02", "03", "04"});
        allAnimals.put("02-ÁGUIA", new String[]{"05", "06", "07", "08"});
        allAnimals.put("03-BURRO", new String[]{"09", "10", "11", "12"});
        allAnimals.put("04-BORBOLETA", new String[]{"13", "14", "15", "16"});
        allAnimals.put("05-CACHORRO", new String[]{"17", "18", "19", "20"});
        allAnimals.put("06-CABRA", new String[]{"21", "22", "23", "24"});
        allAnimals.put("07-CARNEIRO", new String[]{"25", "26", "27", "28"});
        allAnimals.put("08-CAMELO", new String[]{"29", "30", "31", "32"});
        allAnimals.put("09-COBRA", new String[]{"33", "34", "35", "36"});
        allAnimals.put("10-COELHO", new String[]{"37", "38", "39", "40"});
        allAnimals.put("11-CAVALO", new String[]{"41", "42", "43", "44"});
        allAnimals.put("12-ELEFANTE", new String[]{"45", "46", "47", "48"});
        allAnimals.put("13-GALO", new String[]{"49", "50", "51", "52"});
        allAnimals.put("14-GATO", new String[]{"53", "54", "55", "56"});
        allAnimals.put("15-JACARÉ", new String[]{"57", "58", "59", "60"});
        allAnimals.put("16-LEÃO", new String[]{"61", "62", "63", "64"});
        allAnimals.put("17-MACACO", new String[]{"65", "66", "67", "68"});
        allAnimals.put("18-PORCO", new String[]{"69", "70", "71", "72"});
        allAnimals.put("19-PAVÃO", new String[]{"73", "74", "75", "76"});
        allAnimals.put("20-PERU", new String[]{"77", "78", "79", "80"});
        allAnimals.put("21-TOURO", new String[]{"81", "82", "83", "84"});
        allAnimals.put("22-TIGRE", new String[]{"85", "86", "87", "88"});
        allAnimals.put("23-URSO", new String[]{"89", "90", "91", "92"});
        allAnimals.put("24-VEADO", new String[]{"93", "94", "95", "96"});
        allAnimals.put("25-VACA", new String[]{"97", "98", "99", "00"});
    }
    public static String[] getAnimalByKey(String key) {
        return allAnimals.get(key);
    }
}
