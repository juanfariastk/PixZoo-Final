package com.pixzoo.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.pixzoo.back.model.Administrator;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
	
    Administrator findByCNPJ(String cnpj);
    
    @Query("SELECT a FROM Administrator a WHERE a.email = :email AND a.password = :password")
    Administrator findByEmailAndPassword(String email, String password);
}
