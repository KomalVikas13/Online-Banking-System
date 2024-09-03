package com.project_14.OnlineBankingSystem.repo;

import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepo extends JpaRepository<Token, Long> {
//    String findTokenByCustomerId(String token);
}
