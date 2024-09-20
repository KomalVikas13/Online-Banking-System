package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.model.RecurringTransaction;
import com.project_14.OnlineBankingSystem.repo.RecurringTransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecurringTransactionService {

    @Autowired
    private RecurringTransactionRepo recurringTransactionRepo;

    public Boolean isSetOnAutoPay(long accountId, String billType) throws RuntimeException {
        try{
            Optional<RecurringTransaction> account = recurringTransactionRepo.findAllRecurringTransactionByAccountIdAndBillType(accountId, billType);
            System.out.println(account);
            if (account.isPresent()) {
                return account.get().isEnabled();
            }else {
                return false;
            }
        } catch (Exception e) {
            throw new RuntimeException("NOT FOUND");
        }
    }

    public RecurringTransaction updateAutopayStatus(RecurringTransaction recurringTransaction) {
        System.out.println(recurringTransaction.isEnabled());
        Optional<RecurringTransaction> existingTransaction = recurringTransactionRepo.findAllRecurringTransactionByAccountIdAndBillType(recurringTransaction.getAccountId(),recurringTransaction.getBillType());
        if(existingTransaction.isPresent()) {
            RecurringTransaction existingTxn = existingTransaction.get();
            existingTxn.setAccountId(recurringTransaction.getAccountId());
            existingTxn.setBillType(recurringTransaction.getBillType());
            existingTxn.setEnabled(recurringTransaction.isEnabled());
            return recurringTransactionRepo.save(existingTxn);
        }
        else {
            throw new RuntimeException("RecurringTransaction not found");
        }
    }

}