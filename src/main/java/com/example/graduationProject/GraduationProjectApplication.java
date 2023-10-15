package com.example.graduationProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = {UserDetailsServiceAutoConfiguration.class})
public class GraduationProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(GraduationProjectApplication.class, args);
	}


	//cors 정책 회피
	@Bean
	public WebMvcConfigurer corsConfigurer(){
		return new WebMvcConfigurer (){
			@Override
			public void addCorsMappings (CorsRegistry registry){
				registry.addMapping("/**").allowedOriginPatterns();
			}
		};
	}
}
//lsof -i :포트번호
//kill -9 포트번호