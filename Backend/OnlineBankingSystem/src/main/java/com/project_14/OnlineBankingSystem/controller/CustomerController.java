package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import com.project_14.OnlineBankingSystem.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService){
        this.customerService = customerService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registration(@RequestBody CustomerDTO customerDTO){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customerService.addCustomerDto(customerDTO));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<CustomerDTO> customerDetails(@RequestBody CustomerDTO customerDTO){
        if(customerService.verifyCredentials(customerDTO) != null){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(customerService.verifyCredentials(customerDTO));
        }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(null);
    }
}
