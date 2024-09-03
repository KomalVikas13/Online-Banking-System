package com.project_14.OnlineBankingSystem.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long customerId;
    @Column(nullable = false)
    private String customerFirstName;
    @Column(nullable = false)
    private String customerLastName;
    @Column(nullable = false)
    private Date customerDateOfBirth;
    @Column(nullable = false)
    private double customerPANCardNumber;
    @Column(nullable = false)
    private double customerAadharCardNumber;
    @Column(nullable = false)
    private String customerGender;
    @Column(nullable = false)
    private String customerEmail;
    @Column(nullable = false)
    private double customerMobileNo;
    @Column(nullable = false)
    private String customerAddress;
    @Column(nullable = false)
    private Date customerRegistrationDate;
    @Column(nullable = false)
    private String customerUserName;
    @Column(nullable = false)
    private String customerPassword;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Account> account;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Beneficiary> beneficiaryList;

    public Customer(String customerFirstName, String customerLastName, Date customerDateOfBirth, double customerPANCardNumber, double customerAadharCardNumber, String customerGender, String customerEmail, double customerMobileNo, String customerAddress, Date customerRegistrationDate, String customerUserName, String customerPassword) {
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.customerDateOfBirth = customerDateOfBirth;
        this.customerPANCardNumber = customerPANCardNumber;
        this.customerAadharCardNumber = customerAadharCardNumber;
        this.customerGender = customerGender;
        this.customerEmail = customerEmail;
        this.customerMobileNo = customerMobileNo;
        this.customerAddress = customerAddress;
        this.customerRegistrationDate = customerRegistrationDate;
        this.customerUserName = customerUserName;
        this.customerPassword = customerPassword;
    }

}
