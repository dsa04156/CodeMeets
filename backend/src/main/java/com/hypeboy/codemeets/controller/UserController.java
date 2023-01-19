package com.hypeboy.codemeets.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.UserServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/user")
public class UserController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserServiceImpl userService;
	
    @Operation(summary = "Dev Search UserInfo", description = "닉네임으로 유저 정보 검색")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
	@GetMapping(value="/dev-search-userinfo",produces = "application/json;charset=utf-8")
	public ResponseEntity<?> userInfoList(@RequestParam("userId") String userId) throws Exception {
		logger.info("userInfoList - 호출");

		try {
			List<UserDto> user = userService.getUserList(userId);
			return new ResponseEntity<List<UserDto>>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "Dev All UserList", description = "모든 유저 정보 얻기")
	@GetMapping(value="/dev-all-userlist", produces = "application/json;charset=utf-8")
	public ResponseEntity<?> userInfoAllList() throws Exception {
		logger.info("userInfoAllList - 호출");

		try {
			List<UserDto> allUserList = userService.getAllUserList();
			return new ResponseEntity<List<UserDto>>(allUserList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "유저 회원가입", description = "유저 회원가입 API \n\n "
    		+ "userPk, userInfoPk, userActive값은 제외해주세요 "
    		+ "\n\n 이메일, 전화번호 공개 시 값 1로 설정바랍니다.")
    @PostMapping("/regist")
	public ResponseEntity<?> regist(@RequestBody UserDto userDto) {
		try {
			logger.info("registUser - 호출");
			userService.registUser(userDto);
			logger.info("registUserInfo - 호출");
			userService.registUserInfo(userDto);
			logger.info("registUser, registUserInfo - 성공");
			return new ResponseEntity<String>("회원가입 성공", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("회원가입 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "ID 중복 검사", description = "회원가입시 ID 중복 검사 API")
    @GetMapping("/overlap")
	public ResponseEntity<?> userIdOverlap(@RequestParam("userId") String userId) throws Exception {
		logger.info("userIdOverlap - 호출");

		try {
			int result = userService.getUserIdOverlap(userId);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "Tel 중복 검사", description = "회원가입시 전화번호 중복 검사 API")
    @GetMapping("/telOverlap")
	public ResponseEntity<?> userTelOverlap(@RequestParam("tel") String tel) throws Exception {
		logger.info("userTelOverlap - 호출");

		try {
			int result = userService.getUserTelOverlap(tel);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "Email 중복 검사", description = "회원가입시 이메일 중복 검사 API")
    @GetMapping("/emailOverlap")
	public ResponseEntity<?> userEmailOverlap(@RequestParam("email") String email) throws Exception {
		logger.info("userTelOverlap - 호출");

		try {
			int result = userService.getUserEmailOverlap(email);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    
    
}
