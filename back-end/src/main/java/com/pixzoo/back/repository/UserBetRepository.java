package com.pixzoo.back.repository;

import com.pixzoo.back.model.UserBet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserBetRepository extends JpaRepository<UserBet, Long> {
	@Query("SELECT ub FROM UserBet ub WHERE ub.userId = :userId")
    List<UserBet> findUserBetsByUserId(Long userId);
}
