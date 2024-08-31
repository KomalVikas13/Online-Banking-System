package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AccountService {

    @Autowired
    private final AccountRepo accountRepo;

    public AccountService(AccountRepo accountRepo){
        this.accountRepo = accountRepo;
    }
    public String createAccount(String accountType, Date customerRegistrationDate){
        Account account = new Account();
        account.setAccountType(accountType);
        account.setAccountCreationDate(customerRegistrationDate);
        account.setAccountBalance(0.0);
        accountRepo.save(account);

        return "Account created";
    }
}
