package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.repo.AccountRepo;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    public String createAccount(AccountDTO accountDTO){
        Long accountId = generateUniqueAccountId();
        accountDTO.setAccountId(accountId);
        Account account = convertToEntity(accountDTO);
        System.out.println(account.getCustomer());
        if(account.getCustomer() == null){
            return "not found";
        }
        accountRepo.save(account);
        return "Account created";
    }

    private Account convertToEntity(AccountDTO accountDTO){
        return new Account(accountDTO.getAccountId(),accountDTO.getAccountType(),accountDTO.getAccountBalance(),accountDTO.getAccountCreationDate(),accountDTO.getCustomer(),accountDTO.getAmountToBeCredited(),accountDTO.getInterest(),accountDTO.getTenure());
    }
    
    public Account getAccountDetailsByAccountId(long accountId) {
        Optional<Account> accountDetails = accountRepo.findByAccountId(accountId);
        return accountDetails.orElse(null);
    }

    public synchronized Long generateUniqueAccountId() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));

        int count = 1;
        String uniqueAccountId = currentDate + count;
        while (accountRepo.findByAccountId(Long.parseLong(uniqueAccountId)).isPresent()) {
            count++;
            uniqueAccountId = currentDate + count;
        }
        return Long.parseLong(uniqueAccountId);
    }

}