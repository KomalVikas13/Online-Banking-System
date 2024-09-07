package com.project_14.OnlineBankingSystem.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @GetMapping("/")
    public String getCustomerDetails(HttpSession httpSession) {
        httpSession.getAttribute("user");
        return "";
    }

}
