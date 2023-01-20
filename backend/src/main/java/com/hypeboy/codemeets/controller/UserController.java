package com.hypeboy.codemeets.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private UserServiceImpl userService;
	
    @Operation(summary = "Dev - Search UserInfo", description = "닉네임으로 유저 정보 검색")
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
    
    @Operation(summary = "Dev - Get All UserList", description = "모든 유저 정보 얻기")
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
    
    @Operation(summary = "Regist User", description = "유저 회원가입 API "
    		+ " \n userPk, userInfoPk, userActive값은 제외해주세요 "
    		+ " \n 이메일, 전화번호 공개 시 값 1로 설정바랍니다.")
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
    
    @Operation(summary = "Check Overlap ID", description = "회원가입시 ID 중복 검사 API")
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
    
    @Operation(summary = "Check Overlap Tel", description = "회원가입시 전화번호 중복 검사 API")
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
    
    @Operation(summary = "Check Overlap Email", description = "회원가입시 이메일 중복 검사 API")
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
    
    @Operation(summary = "Search ID", description = "email 혹은 전화번호 기반 ID 찾기 "
    		+ " \n type은 [email] 혹은 [tel]로 입력해주세요")
    @GetMapping("/search-id")
	public ResponseEntity<?> searchId(@RequestParam("type") String type, @RequestParam("data") String data) throws Exception {
		logger.info("searchId - 호출");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			String result = userService.searchId(type, data);
			
			if (result != null) {
				resultMap.put("data", result);
				resultMap.put("message", SUCCESS);
			}
			else {
				resultMap.put("data", result);
				resultMap.put("message", FAIL);
			}
			
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "Forgot PW", description = "ID와 email 혹은 전화번호 기반 PW 수정 자격 확인 "
    		+ " \n type은 [email] 혹은 [tel]로 입력해주세요")
    @GetMapping("/forgot-pw")
	public ResponseEntity<?> forgotPw(@RequestParam("userId") String userId, 
			@RequestParam("type") String type, 
			@RequestParam("data") String data) throws Exception {
    	
		logger.info("forgotPw - 호출");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			int result = userService.forgotPw(userId, type, data);
			
			if (result == 1) {
				resultMap.put("result", 1);
			}
			else {
				resultMap.put("result", 0);
			}
			
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "Edit PW", description = "PW 수정")
    @PutMapping("/edit-pw")
	public ResponseEntity<?> EditPw(@RequestParam("userId") String userId, @RequestParam("password") String password) throws Exception {
    	
		logger.info("EditPw - 호출");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			resultMap.put("result", userService.editPw(userId, password));
			
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    
    
}
