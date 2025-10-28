package com.yassin.hotelManager.config;

import com.yassin.hotelManager.model.Role;
import com.yassin.hotelManager.model.User;
import com.yassin.hotelManager.repository.RoleRepository;
import com.yassin.hotelManager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Ensure ROLE_USER
        Role userRole = roleRepository.findByName("ROLE_USER").orElseGet(() -> {
            Role role = new Role();
            role.setName("ROLE_USER");
            return roleRepository.save(role);
        });

        // Ensure ROLE_ADMIN
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> {
            Role role = new Role();
            role.setName("ROLE_ADMIN");
            return roleRepository.save(role);
        });

        // Seed default admin account
        final String adminEmail = "admin@luminous-haven.com";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setFirstName("System Admin");
            admin.setLastName("UserA");
            admin.setEmail(adminEmail);

            admin.setPassword(passwordEncoder.encode("ChangeMe123!"));
            admin.setPhoneNumber("01200338348");
            admin.setEnabled(true);
            admin.setRoles(Collections.singleton(adminRole));

            userRepository.save(admin);
            log.info("✅ Seeded admin user: {} / {}", adminEmail, "ChangeMe123!");
        }
    }
}
