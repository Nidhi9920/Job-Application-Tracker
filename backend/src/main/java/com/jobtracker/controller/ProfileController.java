package com.jobtracker.controller;

import com.jobtracker.dto.PasswordChangeRequest;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "https://your-frontend-name.netlify.app")
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Dependency Injection of Repository and PasswordEncoder (BCrypt)
    public ProfileController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Helper to get current logged-in user email
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof org.springframework.security.core.userdetails.User) {
            return ((org.springframework.security.core.userdetails.User) principal).getUsername();
        }
        return principal.toString();
    }

    @PatchMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestBody PasswordChangeRequest request) {

        Map<String, String> response = new HashMap<>();

        // 1. Get the authenticated user's email
        String email = getCurrentUserEmail();

        // 2. Load the user
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
        if (userOptional.isEmpty()) {
            response.put("message", "User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        User user = userOptional.get();

        // 3. Validate current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            response.put("message", "Incorrect current password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // 4. Validate new password (optional — add more rules if needed)
        if (request.getNewPassword() == null || request.getNewPassword().length() < 6) {
            response.put("message", "New password must be at least 6 characters long");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // 5. Encode and save new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        // 6. Respond success in JSON
        response.put("message", "Password updated successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/personal-details")
    public ResponseEntity<Map<String, String>> getProfile() {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email);
        Map<String, String> response = new HashMap<>();
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

}



