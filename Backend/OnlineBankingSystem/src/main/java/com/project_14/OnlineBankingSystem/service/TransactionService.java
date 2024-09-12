package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.TransactionDTO;
import com.project_14.OnlineBankingSystem.model.Transaction;
import com.project_14.OnlineBankingSystem.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    public String paymentTransfer(TransactionDTO transactionDTO) {
        Transaction senderTransaction = new Transaction();
        senderTransaction.setTransactionDate(transactionDTO.);
        return null;
    }
}
