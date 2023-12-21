package com.pixzoo.back.repository;

import com.pixzoo.back.model.LoginSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<LoginSession, Long>{

}
