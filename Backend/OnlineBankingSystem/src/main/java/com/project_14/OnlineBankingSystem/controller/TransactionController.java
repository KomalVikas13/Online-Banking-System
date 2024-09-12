package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.dto.TransactionDTO;
import com.project_14.OnlineBankingSystem.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @PostMapping("/paymentTransfer")
    public ResponseEntity<String> paymentTransfer(@RequestBody TransactionDTO transactionDTO){
        String response = transactionService.paymentTransfer(transactionDTO);
        try {
            if(response.equals("NOT_FOUND")){
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(response);
            }else if(response.equals("NOT_ACCEPTED")){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(response);
            } else if (response.equals("INSUFFICIENT_BALANCE")) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(response);
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Something went wrong.");
        }
    }
}
