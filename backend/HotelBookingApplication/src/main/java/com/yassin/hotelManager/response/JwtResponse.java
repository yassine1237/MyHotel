package com.yassin.hotelManager.response;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data

@NoArgsConstructor
public class JwtResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String token;
    private String type = "Bearer";
    private List<String> roles;

    public JwtResponse(Long id, String email, String firstName, String lastName, String token, List<String> roles) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
        this.roles = roles;
    }
}