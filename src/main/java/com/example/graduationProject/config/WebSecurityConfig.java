package com.example.graduationProject.config;

import com.example.graduationProject.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                //cors 정책(현재 application에 작업을 해둿으므로 기본설정)
                .cors(Customizer.withDefaults())
                //csrf 대책 (비활)
                .csrf((csrf) -> csrf.disable())
                //Basic인증(bearertoken인증을 사용하기때문에 비활)
                .httpBasic((httpBasic) -> httpBasic.disable())
                //세션기반인증(사용안함)
                .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // '/' 'api/auth/'모듈에 대해서는 모두허용
                .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests.requestMatchers("/", "/api/auth/**").permitAll()
                //나머지 request에 대해서는 인증된 사용자만 사용가능하게함
                .anyRequest().authenticated());

        httpSecurity.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
