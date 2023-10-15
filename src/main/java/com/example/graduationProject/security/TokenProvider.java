package com.example.graduationProject.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service

public class TokenProvider {
    //JWT 생성 및 검증을 위한 키
    private static final String SECURITY_KEY = "kinghaeguriiwangjjang";

    //JWT 생성 메서드
    public  String create(String userEmail){
        //만료기한 = 현재날짜 + 한시간
        Date exprTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        //JWT생성
        return Jwts.builder()
                //암호화 알고리즘, 키
                .signWith(SignatureAlgorithm.HS512,SECURITY_KEY)
                //JWT 제목, 생성일, 만료일 넣기
                .setSubject(userEmail).setIssuedAt(new Date()).setExpiration(exprTime)
                //만들기
                .compact();
    }

    //JWT 검증
    public String validate (String token){
        //매게변수로 받은 token을 키를 사용해서 복호화(디코딩)파싱
        Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();
        //복호화된 토큰의 payload에서 제목을 가져온다
        return claims.getSubject();
    }
}
