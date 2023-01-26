package com.hypeboy.codemeets.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.LoginServiceImpl;
import com.hypeboy.codemeets.model.service.ResponseServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/login")
public class LoginController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private LoginServiceImpl loginService;
	
	@Autowired
	private ResponseServiceImpl responseService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Transactional(readOnly = false)
	@Operation(summary = "Login", description = "로그인 API "
			+ " \n ID와 PW값을 입력해주세요")
    @PostMapping
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDto loginDto) {
		logger.info("login - 호출");
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		
		try {
			LoginDto loginUserDto = loginService.login(loginDto);
			
			if (loginUserDto != null && loginUserDto.getUserActive() == 1) {
				logger.info("LoginController - login " + loginUserDto.toString());
				
				String accessToken = jwtTokenProvider.createAccessToken("id", loginUserDto.getUserId());
				String refreshToken = jwtTokenProvider.createRefreshToken("id", loginUserDto.getUserId());
				loginService.saveRefreshToken(loginUserDto.getUserId(), refreshToken);
				resultMap.put("access_token", accessToken);
				resultMap.put("refresh_token", refreshToken);
				
				UserDto userDto = loginService.getUserInfo(loginDto.getUserId());
				resultMap.put("userInfo", userDto);
				
				resultMap.put("message", SUCCESS);
				
				status = HttpStatus.ACCEPTED;
			} else {
				logger.info("로그인 실패");
				
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("토큰 사용 불가능");
			
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@Operation(summary = "Get Login UserInfo", description = "로그인 상태의 유저 정보 획득 API "
			+ " \n 아이디와 헤더에 담긴 토큰으로 검사")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/{userId}")
	public ResponseEntity<Map<String, Object>> getInfo(@PathVariable("userId") String userId, HttpServletRequest request) {
		logger.info("getInfo - 호출");
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			try {
				UserDto userDto = loginService.getUserInfo(userId);
				resultMap.put("userInfo", userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.info("사용자 정보 조회 실패" + " " + e);
				
				resultMap.put("message", FAIL);
				status = HttpStatus.UNAUTHORIZED;
			} 
		} else {
			logger.info("사용 불가능한 토큰입니다");
			
			resultMap.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String,Object>>(resultMap, status);
	}

	@Transactional(readOnly = false)
	@Operation(summary = "Get Access-Token", description = "유저의 refresh_token 및 ID를 사용하여 access-token 재발급")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "REFRESH_TOKEN", value = "로그인 성공 후 발급 받은 refresh_token", required = true, dataType = "String", paramType = "header")
    })
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
		logger.info("refreshToken - 호출");
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.ACCEPTED;
		String token = request.getHeader("refresh_token");
		
		if (jwtTokenProvider.validateToken(token)) {
			if (token.equals(loginService.getRefreshToken(userDto.getUserId()))) {
				String accessToken = jwtTokenProvider.createAccessToken("id", userDto.getUserId());
				resultMap.put("access_token", accessToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
				logger.info("액세스 토큰 재발급 완료");
				
			}
		} else {
			logger.info("리프레쉬 토큰 사용 불가");
			
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@Transactional(readOnly = false)
	@Operation(summary = "Logout", description = "로그아웃")
	@PutMapping("/logout")
	public ResponseEntity<?> logout(@RequestParam("userPk") int userPk) {
		logger.info("logout - 호출");
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		try {
			loginService.deleteRefreshToken(userPk);
			resultMap.put("message", SUCCESS);
		} catch (Exception e) {
			logger.info("로그아웃 실패 - " + e);

			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
		
	}
	
}
