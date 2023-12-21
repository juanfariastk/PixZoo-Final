package com.pixzoo.back.model;

import jakarta.persistence.Entity;

@Entity
public class Administrator extends User {
    private String CNPJ;
    private String createdIn;

    public String getCNPJ() {
        return CNPJ;
    }

    public void setCNPJ(String CNPJ) {
        this.CNPJ = CNPJ;
    }

    public String getCreatedIn() {
        return createdIn;
    }

    public void setCreatedIn(String createdIn) {
        this.createdIn = createdIn;
    }
}
