package com.project_14.OnlineBankingSystem.service;

import jakarta.mail.MessagingException;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor
@ToString

@Service
public class MailService {
    private String subject;
    private String body;
    private String attachment;
    private String to;
    private String receiverName;

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail() throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        try{
            helper.setFrom("veenasrao5@gmail.com","no-reply");
            helper.setTo(getTo());
//            helper.setCc("komalvikas1306@gmail.com");
            helper.setSubject(getSubject());
            helper.setText(getBody(),true);
            mailSender.send(message);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
