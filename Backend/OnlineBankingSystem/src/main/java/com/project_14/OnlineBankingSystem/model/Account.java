package com.project_14.OnlineBankingSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JoinColumn(name = "customer_id", referencedColumnName = "customerId", nullable = false)
    @JsonBackReference
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
    @ToString.Exclude
    private List<Transaction> transactionList;

    public Account(String accountType, double accountBalance, Date accountCreationDate, Customer customer) {
        this.accountType = accountType;
        this.accountBalance = accountBalance;
        this.accountCreationDate = accountCreationDate;
        this.customer = customer;
    }


//    Branch
//    State
//    occupation
//    annual income
//    loan type
//    active
//
//    serializable
}
