package com.example.graduationProject.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @GetMapping("/")
    public String getBoard(@AuthenticationPrincipal String email){

        return "로그인된 사용자는 " + email + "입니다.";
    }

//    @GetMapping("first")
//    public RespopnseDto<List<BoardEntity>> getTop3(){
//        return null;
//    }
//
//    @GetMapping("list")
//    public RespopnseDto<List<BoardEntity>> getTop3(){
//        return null;
//    }
//
//    @GetMapping("List")
//    public RespopnseDto<List<BoardEntity>> getTop3(){
//        return null;
//    }
}
