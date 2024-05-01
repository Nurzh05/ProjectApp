package com.example.project1.email_confirm;

import com.example.project1.user.User;
import com.example.project1.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ConfirmationController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/confirm")
    public String confirmEmail(@RequestParam("token") String confirmationToken) {
        // Find the user by the confirmation token
        User user = userRepository.findByConfirmationToken(confirmationToken);
        if (user != null) {
            // Mark the user's email as confirmed
            user.setEmailConfirmed(true);
            user.setConfirmationToken(null); // Clear the token
            userRepository.save(user);
            return "Email confirmed successfully!";
        } else {
            return "Invalid or expired confirmation token.";
        }
    }
}
