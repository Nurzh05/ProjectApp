package com.example.project1.front;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String loginPage() {
        return "redirect:/page/home";
    }
}
