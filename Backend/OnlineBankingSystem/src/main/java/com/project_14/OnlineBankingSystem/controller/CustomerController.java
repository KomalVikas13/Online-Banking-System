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
import org.springframework.web.servlet.view.RedirectView;

@CrossOrigin("*")
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
        HttpStatus status;
        try {
        String responseMsg = customerService.addCustomerDto(customerDTO);
        System.out.println(responseMsg);
        if(responseMsg.equals("CREATED")) {
                status = HttpStatus.OK;
                String generatedToken = token.generateVerificationToken(customerDTO.getCustomerEmail());
                mailService.setSubject("NOVA Banking| Verify Your Account");
                mailService.setTo(customerDTO.getCustomerEmail());
                mailService.setReceiverName(customerDTO.getCustomerFirstName());
                String mailContent = mailService.getMailContent(mailService, customerDTO, generatedToken);
                mailService.setBody(mailContent);
                System.out.println(mailService);
                mailService.sendMail();
                return ResponseEntity.status(status).body(responseMsg);
        } else if (responseMsg.equals("EXISTS")) {
            status = HttpStatus.CONFLICT;
            return ResponseEntity.status(status).body(responseMsg);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMsg);
        }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
        }

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
            mailService.setSubject("NOVA Banking| Verify Your Account");
            String mailContent = mailService.getMailContent(mailServiceRequest,new CustomerDTO(), generatedToken);
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
        String tokenResponse = token.verifyCustomerToken(email,code);
        if(tokenResponse.equals("account verified")) {
            return ResponseEntity.status(HttpStatus.OK).body("Congratulations, Your account verified! You can login <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"https://localhost:5173/login\">Login</a> or create <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"https://localhost:5173/reset_password\">Create Password</a><br>");
        }else if(tokenResponse.equals("token expired")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token Expired!! <a href=\"https://localhost:5173/verifyEmail\">Resend Verification mail</a>");
        }else if(tokenResponse.equals("user already verified")) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Your account already verified,You can login <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"https://localhost:5173/login\">Login</a> or create <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"https://localhost:5173/reset_password\">Create Password</a><br>");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong!!");
    }
}