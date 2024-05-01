package com.example.project1;

import com.example.project1.guest.Guest;
import com.example.project1.guest.GuestRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SpringBootApplication
public class Project1Application {


    public static void main(String[] args) {
        SpringApplication.run(Project1Application.class, args);
    }


}
