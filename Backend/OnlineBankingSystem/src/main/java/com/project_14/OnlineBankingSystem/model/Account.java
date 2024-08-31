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
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long accountId;
    @Column(nullable = false)
    private String accountType;
    @Column(nullable = false)
    private double accountBalance;
    @Column(nullable = false)
    private Date accountCreationDate;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customerId")
    private Customer customer;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable( name = "account_transaction_table" ,
        joinColumns = {
            @JoinColumn(name = "account_id", referencedColumnName = "accountId")
        },
            inverseJoinColumns = {
            @JoinColumn(name = "transaction_id", referencedColumnName = "transactionId")
            }
    )
    private List<Transaction> transactionList;
}
