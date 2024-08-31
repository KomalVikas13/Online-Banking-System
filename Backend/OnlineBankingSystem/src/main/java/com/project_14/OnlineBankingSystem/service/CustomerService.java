package com.project_14.OnlineBankingSystem.service;


import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private final CustomerRepo customerRepo;

    @Autowired
    private AccountService accountService;


    public CustomerService(CustomerRepo customerRepo){
        this.customerRepo = customerRepo;
    }

    // add Customer to DataBase
    public String addCustomerDto(CustomerDTO customerDTO){
        Optional<Customer> findCustomerEmail = customerRepo.findByCustomerEmail(customerDTO.getCustomerEmail());
        if(findCustomerEmail.isPresent()){
            return "Already had an account";
        }
        Map<String, String> credentials = generateCredentials(customerDTO);
        customerDTO.setCustomerUserName(credentials.get("username"));
        customerDTO.setCustomerPassword(credentials.get("password"));
        Customer customer = convertToEntity(customerDTO);
        customerRepo.save(customer);
        return "Account created";
    }

    // Converts DTO class to Entity class
    private Customer convertToEntity(CustomerDTO customerDTO) {
        return new Customer(customerDTO.getCustomerFirstName(),customerDTO.getCustomerLastName(),customerDTO.getCustomerAge(),customerDTO.getCustomerGender(),customerDTO.getCustomerEmail(),customerDTO.getCustomerMobileNo(),customerDTO.getCustomerAddress(),customerDTO.getCustomerRegistrationDate(),customerDTO.getCustomerUserName(),customerDTO.getCustomerPassword());
    }

    private CustomerDTO convertToDTO(Customer customer){
        return new CustomerDTO(customer.getCustomerId(),customer.getCustomerFirstName(),customer.getCustomerLastName(),customer.getCustomerAge(),customer.getCustomerGender(),customer.getCustomerEmail(),customer.getCustomerMobileNo(),customer.getCustomerAddress(),customer.getCustomerRegistrationDate());
    }


    // Generates customerUserName
    private Map<String, String> generateCredentials(CustomerDTO customerDTO) {
        Map<String, String> credentials = new HashMap<>();
        String password = customerDTO.getCustomerMobileNo() + "";
        String baseUserName = customerDTO.getCustomerFirstName().toLowerCase();
        String uniqueUserName = baseUserName;
        int count = 0;

        while (customerRepo.existsByCustomerUserName(uniqueUserName)) {
            count++;
            uniqueUserName = baseUserName + count;  // Create a new string with baseUserName and the current count
        }
        credentials.put("username",uniqueUserName);
        credentials.put("password",password);

        return credentials;
    }


    public CustomerDTO verifyCredentials(CustomerDTO customerDTO) {
        Optional<Customer> verifyUsername = customerRepo.findByCustomerUserName(customerDTO.getCustomerUserName());
        if(verifyUsername.isPresent()){
            Customer customer = verifyUsername.get();
            boolean verifyPassword = customerDTO.getCustomerPassword().equals(customer.getCustomerPassword());
            if(verifyPassword){
                return convertToDTO(customerRepo.findByCustomerUserName(customerDTO.getCustomerUserName()).get());
            }
        }
        return null;
    }
}
