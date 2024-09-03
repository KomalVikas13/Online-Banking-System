package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @GetMapping("/getAccountDetails/{accountId}")
    public ResponseEntity<Account> getAccountDetailsByAccountId(@PathVariable long accountId){
        Account accountDetails = accountService.getAccountDetailsByAccountId(accountId);
        if(accountDetails == null){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountDetails);
    }
    @PostMapping("/createAccount")
    public ResponseEntity<String> createAccount(@RequestBody AccountDTO accountDTO){
        String response = accountService.createAccount(accountDTO);
        if(response.equals("not found")){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Customer did not exist. Please provide valid Customer Id");
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}
