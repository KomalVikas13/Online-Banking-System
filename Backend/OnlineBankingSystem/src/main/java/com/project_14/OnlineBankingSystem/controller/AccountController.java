package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.annotation.AuthAnnotation;
import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("*")

@AuthAnnotation
@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private final AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    @PostMapping("/createAccount")
    public ResponseEntity<String> createAccount(@RequestBody AccountDTO accountDTO){
        String response = accountService.createIndividualAccount(accountDTO);
        try {
            if(response.equals("NOT_FOUND")){
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(response);
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Something went wrong..!");
        }
    }

    @GetMapping ("/getAccounts/{customerId}")
    public ResponseEntity<List<Account>> getAccounts(@PathVariable Long customerId){
        System.out.println(customerId);
        List<Account> accounts = accountService.getAllAccounts(customerId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accounts);
    }
}
