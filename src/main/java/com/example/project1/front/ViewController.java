package com.example.project1.front;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/page")
@Controller
public class ViewController {

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }
    @GetMapping("/home")
    public String homePage() {
        return "home";
    }
    @GetMapping("/order")
    public String orderPage() { return "order"; }
    @GetMapping("/admin")
    public String adminPage()
    {
        return "admin";
    }
}
