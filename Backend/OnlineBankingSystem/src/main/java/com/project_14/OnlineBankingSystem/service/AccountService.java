package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private final AccountRepo accountRepo;

    @Autowired
    private final CustomerService customerService;

    public AccountService(AccountRepo accountRepo, CustomerService customerService){
        this.accountRepo = accountRepo;
        this.customerService = customerService;
    }
    public String createAccount(AccountDTO accountDTO){
        Account account = convertToEntity(accountDTO);
        if(account.getCustomer() == null){
            return "not found";
        }
        accountRepo.save(account);
        return "Account created";
    }

    private Account convertToEntity(AccountDTO accountDTO){
        Customer customer = customerService.findByCustomerIdService(accountDTO.getCustomerId());
        return new Account(accountDTO.getAccountType(),accountDTO.getAccountBalance(),accountDTO.getAccountCreationDate(),customer);
    }

//    private AccountDTO convertToDTO(Account account){
//
//    }

    public Account getAccountDetailsByAccountId(long accountId) {
        Optional<Account> accountDetails = accountRepo.findByAccountId(accountId);
        return accountDetails.orElse(null);
    }
}
