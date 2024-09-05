package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import com.project_14.OnlineBankingSystem.model.Token;
import com.project_14.OnlineBankingSystem.service.CustomerService;
import com.project_14.OnlineBankingSystem.service.MailService;
import com.project_14.OnlineBankingSystem.service.OTPService;
import com.project_14.OnlineBankingSystem.service.TokenService;
import jakarta.servlet.http.HttpSession;
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
    private OTPService otpService;

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

    @PostMapping("/login")
    public ResponseEntity<Object> customerDetails(@RequestBody CustomerDTO customerDTO, HttpSession httpSession){
        CustomerDTO customerData =  customerService.verifyCredentials(customerDTO);
        try{
            if(customerData != null){
//========= Generate OTP ===========
            String generatedOTP =otpService.generateOTP();
//========= Store otp in Session ===========
            httpSession.setAttribute("OTP",generatedOTP);
            String OTP = (String) httpSession.getAttribute("OTP");
            System.out.println(generatedOTP);
//========= Send OTP via mail ===========
            mailService.setSubject("OTP");
            mailService.setReceiverName(customerData.getCustomerFirstName());
            mailService.setTo(customerData.getCustomerEmail());
            String mailContent= mailService.getOTPMailContent(mailService,generatedOTP);
            mailService.setBody(mailContent);
            mailService.sendMail();
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customerData);
    }

    @PostMapping("/verifyEmail")
    public ResponseEntity<String> sendMail(@RequestBody MailService mailServiceRequest){
        try {
            String generatedToken = token.generateVerificationToken(mailServiceRequest.getTo());
            mailService.setSubject("Test mail");
            String mailContent = mailService.getMailContent(mailServiceRequest, generatedToken);
            mailService.setBody(mailContent);
            mailService.setTo(mailServiceRequest.getTo());
//            System.out.println(mailService);
            mailService.sendMail();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Mail sent successfully");
    }



    @GetMapping("/verifyToken")
    public ResponseEntity<String> verifyToken(@RequestParam String email, @RequestParam String code) {
        System.out.println();
        String tokenResponse = token.verifyCustomerToken(email,code);
        if(tokenResponse.equals("account verified")) {
            return ResponseEntity.status(HttpStatus.OK).body("Congratulations, Your account verified! Please Create New Password!!<br> <a href=\"https://localhost:5173/reset_password\">Create Password</a>");
        }else if(tokenResponse.equals("token expired")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token Expired!! <a href=\"https://localhost:5173/verifyEmail\">Resend Verification mail</a>");
        }else if(tokenResponse.equals("user already verified")) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Your account already verified, Please Create New Password!! <a href=\"https://localhost:5173/reset_password\">Create Password</a>");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong!!");
    }
}