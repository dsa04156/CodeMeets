package com.hypeboy.codemeets.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.exception.LoginFailedException;
import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.response.BaseResponse;
import com.hypeboy.codemeets.model.dto.response.SingleDataResponse;
import com.hypeboy.codemeets.model.service.LoginServiceImpl;
import com.hypeboy.codemeets.model.service.ResponseServiceImpl;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/login")
public class LoginController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private LoginServiceImpl loginService;
	
	@Autowired
	private ResponseServiceImpl responseService;
	
	@Operation(summary = "Login", description = "로그인 API \n\n ID와 PW값을 입력해주세요")
    @PostMapping
    public ResponseEntity login(@RequestBody LoginDto loginDto) {
        ResponseEntity responseEntity = null;
        try {
            String token = loginService.login(loginDto);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Authorization", "Bearer " + token);

            SingleDataResponse<String> response = responseService.getSingleDataResponse(true, "로그인 성공", token);

            responseEntity = ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(response);
        } catch (LoginFailedException exception) {
            logger.debug(exception.getMessage());
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());

            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return responseEntity;
    }

}
