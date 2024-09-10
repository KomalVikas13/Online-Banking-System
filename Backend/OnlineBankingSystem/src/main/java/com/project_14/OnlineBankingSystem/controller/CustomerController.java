package com.project_14.OnlineBankingSystem.controller;

import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import com.project_14.OnlineBankingSystem.service.CustomerService;
import com.project_14.OnlineBankingSystem.service.MailService;
import com.project_14.OnlineBankingSystem.service.OTPService;
import com.project_14.OnlineBankingSystem.service.TokenService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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

    //========= Registration ==========
    @PostMapping("/register")
    public ResponseEntity<String> registration(@RequestBody CustomerDTO customerDTO){
        HttpStatus status;
        try {
        String responseMsg = customerService.addCustomerDto(customerDTO);
        System.out.println(responseMsg);
        if(responseMsg.equals("CREATED")) {
            //========= Send Verification Mail ===========
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    //========= Login ==========
    @PostMapping("/login")
    public ResponseEntity<Object> customerDetails(@RequestBody CustomerDTO customerDTO, HttpSession httpSession){
        try{
            CustomerDTO customerData =  customerService.verifyCredentials(customerDTO);
            if(customerData != null){
                if(!customerData.isEmailVerified()) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ACCOUNT NOT VERIFIED");
                }
//========= Store email in Session ===========
            httpSession.setAttribute("email",customerData.getCustomerEmail());
                System.out.println(httpSession.getAttribute("email"));
//========= Generate OTP ===========
            String generatedOTP = otpService.generateOTP();
//========= Store otp in Session ===========
            httpSession.setAttribute("OTP",generatedOTP);
            httpSession.getAttribute("OTP");
            System.out.println(generatedOTP);
//========= Send OTP via mail ===========
            mailService.setSubject("OTP");
            mailService.setReceiverName(customerData.getCustomerFirstName());
            mailService.setTo(customerData.getCustomerEmail());
            String mailContent= mailService.getOTPMailContent(mailService,generatedOTP);
            mailService.setBody(mailContent);
            mailService.sendMail();
           }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("INVALID CREDENTIALS");
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        httpSession.setAttribute("isValidCredentials",true);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("VALID CREDENTIALS");
    }

    //========= Verify Customer Mail ==========
    @PostMapping("/verifyEmail")
    public ResponseEntity<String> sendMail(@RequestBody MailService mailServiceRequest){
        try {
            String generatedToken = token.generateVerificationToken(mailServiceRequest.getTo());
            mailService.setSubject("NOVA Banking| Verify Your Account");
            String mailContent = mailService.getMailContent(mailServiceRequest, null,generatedToken);
            mailService.setBody(mailContent);
            mailService.setTo(mailServiceRequest.getTo());
            mailService.sendMail();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Mail sent successfully");
    }

    //========= Verify Token ==========
    @GetMapping("/verifyToken")
    public ResponseEntity<String> verifyToken(@RequestParam String email, @RequestParam String code) {
        String tokenResponse = token.verifyCustomerToken(email,code);
        if(tokenResponse.equals("account verified")) {
            return ResponseEntity.status(HttpStatus.OK).body("Congratulations, Your account verified! You can login <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"http://localhost:5173/\">Login</a> or create <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"http://localhost:5173/reset_password\">Create Password</a><br>");
        }else if(tokenResponse.equals("token expired")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token Expired!! <a href=\"http://localhost:5173/verifyEmail\">Resend Verification mail</a>");
        }else if(tokenResponse.equals("user already verified")) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Your account already verified,You can login <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"http://localhost:5173/\">Login</a> or create <a style=\"margin-right:10px;background:#328bff;color:white;padding:10px 20px;text-decoration:none\" href=\"http://localhost:5173/reset_password\">Create Password</a><br>");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong!!");
    }

        //=========== Verify OTP =============
        @PostMapping("/verifyOtp")
        public ResponseEntity<String> verifyUserOTP(@RequestBody OTPService otpToVerify, HttpSession sessionOtp) {
//            System.out.println(otpToVerify);
            try{
                String session = (String) sessionOtp.getAttribute("OTP");
                System.out.println(session);
                String responseMsg = otpService.verifyOTP(otpToVerify.getOtp(),sessionOtp);
                if(responseMsg.equals("VERIFIED")){
                    sessionOtp.setAttribute("isVerified",true);
                    return ResponseEntity.status(HttpStatus.OK).body(responseMsg);
                }else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid OTP");
                }
            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

        @PostMapping("/test")
        public ResponseEntity<String> Test(HttpSession httpSession) {
//            httpSession.setAttribute("demo","yes");
            Boolean isAuthenticated = (Boolean) httpSession.getAttribute("isVerified");
            if(isAuthenticated!=null && isAuthenticated){
                System.out.println("You can access dashboard");
                return ResponseEntity.status(HttpStatus.OK).body("Verified User");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session expired");
        }

    @GetMapping("/logout")
    public ResponseEntity<Object> logout(HttpSession httpSession) {
        try{
            httpSession.invalidate();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(e.toString());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Session destroyed");
    }
}