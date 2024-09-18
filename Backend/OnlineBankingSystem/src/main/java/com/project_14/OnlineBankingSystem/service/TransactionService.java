package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.TransactionDTO;
import com.project_14.OnlineBankingSystem.model.Account;
import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.model.Transaction;
import com.project_14.OnlineBankingSystem.repo.AccountRepo;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import com.project_14.OnlineBankingSystem.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Transactional
    public String paymentTransfer(TransactionDTO transactionDTO) {
        Transaction senderTransaction = new Transaction();
        Transaction recipientTransaction = new Transaction();

        // Fetching sender account
        Optional<Account> senderAccount = accountRepo.findByAccountId(transactionDTO.getSender().getAccountId());
        if (senderAccount.isEmpty()) {
            return "NOT_FOUND";
        }
        Account updateSenderAccount = senderAccount.get();

        // Checking for sufficient balance
        if (updateSenderAccount.getAccountBalance() < transactionDTO.getSender().getTransactionAmount()) {
            return "INSUFFICIENT_BALANCE";
        }

        // Fetching recipient account
        Optional<Account> recipientAccount = accountRepo.findByAccountId(transactionDTO.getRecipient().getAccountId());
        if (recipientAccount.isEmpty()) {
            return "NOT_FOUND";
        }
        Account updateRecipientAccount = recipientAccount.get();

        // Checking recipient account type
        if (updateRecipientAccount.getAccountType().equals("fixed_deposit")) {
            return "NOT_ACCEPTED";
        }

        // Setting sender transaction details
        senderTransaction.setTransactionDate(transactionDTO.getSender().getTransactionDate());
        senderTransaction.setTransactionAmount(transactionDTO.getSender().getTransactionAmount());
        senderTransaction.setTransactionType(transactionDTO.getSender().getTransactionType());
        senderTransaction.setTransferNote(transactionDTO.getSender().getTransferNote());
        senderTransaction.setRecipientOrSenderAccountId(transactionDTO.getRecipient().getAccountId());
        senderTransaction.setRecipientOrSenderName(updateRecipientAccount.getCustomer().getCustomerFirstName());

        // Updating sender account balance
        updateSenderAccount.setAccountBalance(updateSenderAccount.getAccountBalance() - senderTransaction.getTransactionAmount());

        // Updating bidirectional relationship for sender
        senderTransaction.setAccountList(Collections.singletonList(updateSenderAccount));
        updateSenderAccount.getTransactionList().add(senderTransaction);

        // Save updated sender account and transaction
        accountRepo.save(updateSenderAccount);
        transactionRepo.save(senderTransaction);

        // Setting recipient transaction details
        recipientTransaction.setTransactionDate(transactionDTO.getRecipient().getTransactionDate());
        recipientTransaction.setTransactionAmount(transactionDTO.getRecipient().getTransactionAmount());
        recipientTransaction.setTransactionType(transactionDTO.getRecipient().getTransactionType());
        recipientTransaction.setTransferNote(transactionDTO.getRecipient().getTransferNote());
        recipientTransaction.setRecipientOrSenderAccountId(transactionDTO.getSender().getAccountId());
        recipientTransaction.setRecipientOrSenderName(updateSenderAccount.getCustomer().getCustomerFirstName());

        // Updating recipient account balance
        updateRecipientAccount.setAccountBalance(updateRecipientAccount.getAccountBalance() + senderTransaction.getTransactionAmount());

        // Updating bidirectional relationship for recipient
        recipientTransaction.setAccountList(Collections.singletonList(updateRecipientAccount));
        updateRecipientAccount.getTransactionList().add(recipientTransaction);

        // Save updated recipient account and transaction
        accountRepo.save(updateRecipientAccount);
        transactionRepo.save(recipientTransaction);

        return "SUCCESS";
    }

    @Transactional(readOnly = true)
    public List<Transaction> getTransactionHistoryByCustomerId(Long customerId) {
        return transactionRepo.findAllTransactionsByCustomerId(customerId);
    }

    @Transactional(readOnly = true)
    public List<Transaction> getRecentTransactionHistory(String customerEmail) {
        Optional<Customer> customer = customerRepo.findByCustomerEmail(customerEmail);
        Long customerId = customer.get().getCustomerId();
        System.out.println(customerId);
        Pageable pageable = PageRequest.of(0, 4);
        return transactionRepo.findAllRecentTransactionsByCustomerId(customerId,pageable);
    }
}
//        account.setTransactionList(Collections.singletonList(transaction));
//        transaction.setAccountList(Collections.singletonList(account));