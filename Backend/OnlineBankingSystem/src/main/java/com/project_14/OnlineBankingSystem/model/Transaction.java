package com.project_14.OnlineBankingSystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionId;
    @Column(nullable = false)
    private String transactionType;
    @Column(nullable = false)
    private double transactionAmount;
    @Column(nullable = false)
    private Date transactionDate;

    @ManyToMany(mappedBy = "transactionList", fetch = FetchType.LAZY)
    private List<Account> accountList;
}
