package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.AccountDTO;
import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import com.project_14.OnlineBankingSystem.model.Customer;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    public CustomerService(CustomerRepo customerRepo){
        this.customerRepo = customerRepo;
    }

    @Autowired
    private AccountService accountService;

    // add Customer to DataBase
    public String addCustomerDto(CustomerDTO customerDTO){
        Optional<Customer> findCustomerEmail = customerRepo.findByCustomerEmail(customerDTO.getCustomerEmail());
        if(findCustomerEmail.isPresent()){
            return "Already registered..";
        }
        customerDTO.setCustomerId(generateUniqueCustomerId());
        System.out.println("customer dto id");
        System.out.println(customerDTO.getCustomerId());
        customerDTO.setCustomerPassword(customerDTO.getCustomerMobileNo()+"");
        Customer customer = convertToEntity(customerDTO);
        Customer newCustomer = customerRepo.save(customer);
        System.out.println("newCustomer");
        System.out.println(newCustomer);
        String response = accountService.createAccount(new AccountDTO(customerDTO.getAccountType(), 0.0, customerDTO.getCustomerRegistrationDate(), newCustomer));
        if(response.equals("Account created")){
            return "Registration and Account creation successfully...!";
        }
        return "Registration failed";
//        return "Registration completed successfully...!";
    }

    // Converts DTO class to Entity class
    private Customer convertToEntity(CustomerDTO customerDTO) {
        return new Customer(customerDTO.getCustomerId(), customerDTO.getCustomerFirstName(),customerDTO.getCustomerLastName(),customerDTO.getCustomerDateOfBirth(),customerDTO.getCustomerPANCardNumber(),customerDTO.getCustomerAadharCardNumber(),customerDTO.getCustomerGender(),customerDTO.getCustomerEmail(),customerDTO.getCustomerMobileNo(),customerDTO.getCustomerAddress(),customerDTO.getCustomerRegistrationDate(),customerDTO.getCustomerPassword());
    }

    private CustomerDTO convertToDTO(Customer customer){
        return new CustomerDTO(customer.getCustomerId(),customer.getCustomerFirstName(),customer.getCustomerLastName(),customer.getCustomerDateOfBirth(),customer.getCustomerPANCardNumber(),customer.getCustomerAadharCardNumber(),customer.getCustomerGender(),customer.getCustomerEmail(),customer.getCustomerMobileNo(),customer.getCustomerAddress(),customer.getCustomerRegistrationDate());
    }

    public CustomerDTO verifyCredentials(CustomerDTO customerDTO) {
        Optional<Customer> verifyId = customerRepo.findByCustomerId(customerDTO.getCustomerId());
        if(verifyId.isPresent()){
            Customer customer = verifyId.get();
            boolean verifyPassword = customerDTO.getCustomerPassword().equals(customer.getCustomerPassword());
            if(verifyPassword){
                return convertToDTO(customerRepo.findByCustomerId(customerDTO.getCustomerId()).get());
            }
        }
        return null;
    }

    public synchronized Long generateUniqueCustomerId() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));

        int count = 1;
        String uniqueCustomerId = currentDate + count;
        while (customerRepo.findByCustomerId(Long.parseLong(uniqueCustomerId)).isPresent()) {
            count++;
            uniqueCustomerId = currentDate + count;
        }
        return Long.parseLong(uniqueCustomerId);
    }

//    import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
//
//    public String generateShortUniqueId() {
//        return NanoIdUtils.randomNanoId();
//    }

}
