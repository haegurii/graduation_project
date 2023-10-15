package com.example.graduationProject.service;
import com.example.graduationProject.dto.ResponseDto;
import com.example.graduationProject.dto.SignInDto;
import com.example.graduationProject.dto.SignInResponseDto;
import com.example.graduationProject.dto.SignUpDto;
import com.example.graduationProject.entity.UserEntity;
import com.example.graduationProject.repository.UserRepository;
import com.example.graduationProject.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    TokenProvider tokenProvider;
    @Autowired
    UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


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
             userRepository.findByEmail(userEmail)!=null
                ) {
            try {
                return ResponseDto.setFailed("Existed Email!", null);
            } catch (Exception e) {
                return ResponseDto.setFailed("Data Base Error!", null);
            }
        }


        try {
            //entity 생성
            UserEntity userEntity = new UserEntity(dto);
            //비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(password);
            userEntity.setPassword(encodedPassword);
            //repository 저장
            userRepository.save(userEntity);
        } catch (Exception e) {
            return ResponseDto.setFailed("Data Base Error!", null);
        }
        //성공시 success response 반환
        return ResponseDto.setSuccess("Sign Up Success", null);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();

        UserEntity userEntity = null;

        try{
            userEntity = userRepository.findByEmail(email);
            if(userEntity==null)
                return ResponseDto.setFailed("Sign In Failed");
            //비밀번호 검사
            if(!passwordEncoder.matches(password, userEntity.getPassword()))
                return ResponseDto.setFailed("Sign In Failed");
        }catch(Exception e){
            return ResponseDto.setFailed("Database Error");
        }

        String token = tokenProvider.create(email);
        int exprTime = 3600000;
        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity);

        return ResponseDto.setSuccess("Sign In Success", signInResponseDto);

    }
}
