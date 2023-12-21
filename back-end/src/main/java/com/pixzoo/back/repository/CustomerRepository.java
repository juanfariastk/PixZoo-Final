package com.pixzoo.back.repository;

import com.pixzoo.back.model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
    Customer findByCPF(String cpf);
    
    Customer findByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE c.email = :email AND c.password = :password")
    Customer findByEmailAndPassword(String email, String password);
}