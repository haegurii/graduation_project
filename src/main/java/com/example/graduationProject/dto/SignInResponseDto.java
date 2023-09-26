package com.example.graduationProject.dto;

import com.example.graduationProject.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInResponseDto {
    private String token;
    private int ExprTime;
    private UserEntity user;

}
