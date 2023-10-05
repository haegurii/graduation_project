package com.example.graduationProject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String username;
    private String password;
    private String passwordCheck;
    private String email;
    private String role;
    private String birthDate;

}
