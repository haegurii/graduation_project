package com.example.graduationProject.entity;

import com.example.graduationProject.dto.SignUpDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;


@Builder
@Data
@Entity(name="User")
@Table(name="User")
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//db가 알아서 자동생성하는 어노테이션
    private Long id;
    private String username;
    private String password;

    private String email;
    private String role;
    @CreationTimestamp
    private Timestamp createDate;
    private String provider;
    private String providerId;

    public UserEntity(SignUpDto dto) {
        this.username = dto.getUsername();
        this.password = dto.getPassword();
        this.email = dto.getEmail();
//        this.role = role;
//        this.createDate = createDate;
//        this.provider = provider;
//        this.providerId = providerId;
    }

}


