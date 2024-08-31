package com.project_14.OnlineBankingSystem.repo;

import com.project_14.OnlineBankingSystem.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {

    boolean existsByCustomerUserName(String customerUserName);

    Optional<Customer> findByCustomerEmail(String customerEmail);

    Optional<Customer> findByCustomerUserName(String customerUserName);

    Optional<Customer> findByCustomerPassword(String customerPassword);
}
