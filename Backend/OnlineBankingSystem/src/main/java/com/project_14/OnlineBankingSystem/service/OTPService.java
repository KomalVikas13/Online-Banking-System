package com.project_14.OnlineBankingSystem.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OTPService {
    public String generateOTP() {
        System.out.println("Hi, I am OTP Method...!!");
        StringBuilder otp = new StringBuilder(6);
        Random randomNumber = new Random();
        for(int i=1;i<7;i++) {
            int randomIntBounded = randomNumber.nextInt(9);
            otp.append(randomIntBounded);
        }
        return otp.toString();
    }
}