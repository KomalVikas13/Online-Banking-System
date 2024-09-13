package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.TransactionDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.model.Transaction;
import com.project_14.OnlineBankingSystem.repo.AccountRepo;
import com.project_14.OnlineBankingSystem.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private AccountRepo accountRepo;

    public String paymentTransfer(TransactionDTO transactionDTO) {
        Transaction senderTransaction = new Transaction();
        Transaction recipientTransaction = new Transaction();
        Optional<Account> senderAccount = accountRepo.findByAccountId(transactionDTO.getSender().getAccountId());
        if(senderAccount.isEmpty()){
            return "NOT_FOUND";
        }
        Account updateSenderAccount = senderAccount.get();
        if(updateSenderAccount.getAccountBalance() < transactionDTO.getSender().getTransactionAmount()){
            return "INSUFFICIENT_BALANCE";
        }
        Optional<Account> recipientAccount = accountRepo.findByAccountId(transactionDTO.getRecipient().getAccountId());
        if(recipientAccount.isEmpty()){
            return "NOT_FOUND";
        }
        Account updateRecipientAccount = recipientAccount.get();
        if(updateRecipientAccount.getAccountType().equals("fixed_deposit")){
            return "NOT_ACCEPTED";
        }
        senderTransaction.setTransactionDate(transactionDTO.getSender().getTransactionDate());
        senderTransaction.setTransactionAmount(transactionDTO.getSender().getTransactionAmount());
        senderTransaction.setTransactionType(transactionDTO.getSender().getTransactionType());
        senderTransaction.setTransferNote(transactionDTO.getSender().getTransferNote());


        updateSenderAccount.setAccountBalance(updateSenderAccount.getAccountBalance() - senderTransaction.getTransactionAmount());
        accountRepo.save(updateSenderAccount);
        transactionRepo.save(senderTransaction);

        recipientTransaction.setTransactionDate(transactionDTO.getRecipient().getTransactionDate());
        recipientTransaction.setTransactionAmount(transactionDTO.getRecipient().getTransactionAmount());
        recipientTransaction.setTransactionType(transactionDTO.getRecipient().getTransactionType());
        recipientTransaction.setTransferNote(transactionDTO.getRecipient().getTransferNote());

        updateRecipientAccount.setAccountBalance(updateRecipientAccount.getAccountBalance() + senderTransaction.getTransactionAmount());
        accountRepo.save(updateRecipientAccount);
        transactionRepo.save(recipientTransaction);
        return "SUCCESS";
    }

    public List<Transaction> getTransactionHistoryByCustomerId(Long customerId) {
        return transactionRepo.findAllTransactionsByCustomerId(customerId);
    }
}
//        account.setTransactionList(Collections.singletonList(transaction));
//        transaction.setAccountList(Collections.singletonList(account));