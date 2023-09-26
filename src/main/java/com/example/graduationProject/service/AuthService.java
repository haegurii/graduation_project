package com.example.graduationProject.service;
import com.example.graduationProject.dto.ResponseDto;
import com.example.graduationProject.dto.SignInResponseDto;
import com.example.graduationProject.dto.SignUpDto;
import com.example.graduationProject.entity.UserEntity;
import com.example.graduationProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    public ResponseDto<?> signUp(SignUpDto dto) {
        String userEmail = dto.getEmail();
        String password = dto.getPassword();
        String passwordCheck = dto.getPasswordCheck();

        //비밀번호가 서로 다르면 !
        if (!password.equals(passwordCheck)) {
            return ResponseDto.setFailed("Password does not matched!", null);
        }

        //Email 중복 확인
        if (//이메일 찾기 쿼리문 작성
            // userRepository.existsById(userEmail
                false) {
            try {
                return ResponseDto.setFailed("Existed Email!", null);
            } catch (Exception e) {
                return ResponseDto.setFailed("Data Base Error!", null);
            }
        }


        try {
            //entity 생성
            UserEntity userEntity = new UserEntity(dto);
            //repository 저장
            userRepository.save(userEntity);
        } catch (Exception e) {
            return ResponseDto.setFailed("Data Base Error!", null);
        }
        //성공시 success response 반환
        return ResponseDto.setSuccess("Sign Up Success", null);
    }

//    public ResponseDto<SignInResponseDto> signIn(SignUpDto dto) {
//        String email = dto.getEmail();
//        userRepository.existsById(email);
//
//    }
}
