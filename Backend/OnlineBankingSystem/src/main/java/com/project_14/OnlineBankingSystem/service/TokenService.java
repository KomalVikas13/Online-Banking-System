package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.model.Token;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import com.project_14.OnlineBankingSystem.repo.TokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
@Service
public class TokenService {

    @Autowired
    private TokenRepo tokenRepo;

    @Autowired
    private CustomerRepo customerRepo;

    public String generateVerificationToken(String customerEmail) {
          Optional<Customer> customerData = customerRepo.findByCustomerEmail(customerEmail);
          if (customerData.isPresent()) {
              Customer customer = customerData.get();
              Token token = customer.getToken();
              if (token == null) {
                  token = new Token();
                  token.setCustomer(customerData.get());
              }
              token.setToken(UUID.randomUUID().toString());
              tokenRepo.save(token);
              return token.getToken();
          }else {
              throw new IllegalArgumentException("Customer not found with email: " + customerEmail);
          }
    }
}
