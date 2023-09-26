package com.example.graduationProject.controller;

import com.example.graduationProject.dto.ResponseDto;
import com.example.graduationProject.dto.SignInDto;
import com.example.graduationProject.dto.SignInResponseDto;
import com.example.graduationProject.dto.SignUpDto;
import com.example.graduationProject.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    AuthService authService;
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody){
        System.out.println(requestBody);
        ResponseDto<?> result = authService.signUp(requestBody);
        System.out.println(result);
        return result;
    }
    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody){


    }
}
