package com.example.graduationProject.repository;

import com.example.graduationProject.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer> {

    public UserEntity findByEmail(String Email);
}
