package com.example.graduationProject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName="set")

public class ResponseDto <D>{
    private boolean result;
    private String message;
    private D data;

    public static <D> ResponseDto<D> setSuccess(String message, D data){
//        return new ResponseDto(true, message, data);
        return ResponseDto.set(true, message, data);
    }
    public static <D> ResponseDto<D> setFailed(String message, D data){
//        return new ResponseDto(true, message, data);
        return ResponseDto.set(false, message, null);
    }
}
