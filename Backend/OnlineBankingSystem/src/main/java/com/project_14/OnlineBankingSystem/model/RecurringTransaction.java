package com.project_14.OnlineBankingSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class RecurringTransaction {
    private long accountId;
    @Column(nullable = false)
    private String transactionType;
    @Column(nullable = false)
    private double transactionAmount;
    @Column(nullable = false)
    private Date transactionDate;
    private String transferNote;
    @Column(nullable = false)
    private long recipientOrSenderAccountId;
    @Column(nullable = false)
    private String recipientOrSenderName;
    private boolean isOnAutopay = false;
}
