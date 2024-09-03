package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import com.project_14.OnlineBankingSystem.model.Token;
import com.project_14.OnlineBankingSystem.service.CustomerService;
import com.project_14.OnlineBankingSystem.service.MailService;
import com.project_14.OnlineBankingSystem.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    @Autowired
    private final MailService mailService;

    @Autowired
    private TokenService token;

    @Autowired
    public CustomerController(CustomerService customerService, MailService mailService){
        this.customerService = customerService;
        this.mailService = mailService;
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

    @PostMapping("/verifyEmail")
    public ResponseEntity<String> sendMail(@RequestBody MailService mailServiceRequest){
        try {
            String generatedToken = token.generateVerificationToken(mailServiceRequest.getTo());
            mailService.setSubject("Test mail");
            String mailContent = "<p>Dear " + mailServiceRequest.getReceiverName() + ",</p>";
            mailContent += "<p>Please click the link below to verify your registration:</p>";
            mailContent += "<h3><a href=\"http://localhost:9999/customer/verifyToken?code=" + generatedToken + "\" style=\"background-color:#328bff;color:white;margin-top:20px;padding:10px;text-decoration:none;border-radius:50px\">Verify Email</a></h3>";
            mailContent += "<p>Thank you,<br>The Nova Banking Team</p>";
            mailService.setBody(mailContent);
            mailService.setTo(mailServiceRequest.getTo());
            System.out.println(mailService);
//            mailService.sendMail();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Mail sent successfully");
    }

    @GetMapping("/verifyToken")
    public void verfiyToken(@RequestParam String code) {
        System.out.println(code+"==code===");
    }
}