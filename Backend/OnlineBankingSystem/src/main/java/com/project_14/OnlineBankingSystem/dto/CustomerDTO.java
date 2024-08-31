package com.project_14.OnlineBankingSystem.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerDTO {

    private long customerId;
    private String customerFirstName;
    private String customerLastName;
    private int customerAge;
    private String customerGender;
    private String customerEmail;
    private double customerMobileNo;
    private String customerAddress;
    private Date customerRegistrationDate;
    private String customerUserName;
    private String customerPassword;
    private String accountType;

    public CustomerDTO(long customerId, String customerFirstName, String customerLastName, int customerAge, String customerGender, String customerEmail, double customerMobileNo, String customerAddress, Date customerRegistrationDate) {
        this.customerId = customerId;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.customerAge = customerAge;
        this.customerGender = customerGender;
        this.customerEmail = customerEmail;
        this.customerMobileNo = customerMobileNo;
        this.customerAddress = customerAddress;
        this.customerRegistrationDate = customerRegistrationDate;
    }
}