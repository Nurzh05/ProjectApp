package com.example.project1.email_confirm;

public interface EmailService {
    void sendConfirmationEmail(String to, String confirmationLink);
}
