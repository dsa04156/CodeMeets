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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/login")
@Api(tags = "로그인 API")
public class LoginController {
	private final Logger logger = LoggerFactory.getLogger(LoginController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private LoginServiceImpl loginService;
	
	@Autowired
	private ResponseServiceImpl responseService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Transactional(readOnly = false)
	@Operation(summary = "로그인", description = "ID와 PW를 입력해주세요")
    @PostMapping
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDto loginDto) {
		logger.info("login - 호출");
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		
		try {
			LoginDto loginUserDto = loginService.login(loginDto);
			
			if (loginUserDto != null && loginUserDto.getUserActive() == 1) {
				logger.info("LoginController - login " + loginUserDto.toString());
				
				String accessToken = jwtTokenProvider.createAccessToken("userPk", loginUserDto.getUserPk());
				String refreshToken = jwtTokenProvider.createRefreshToken();
				loginService.saveRefreshToken(loginUserDto.getUserPk(), refreshToken);
				
				resultMap.put("access_token", accessToken);
				resultMap.put("refresh_token", refreshToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				logger.info("로그인 실패");
				
				resultMap.put("message", FAIL);
				status = HttpStatus.BAD_REQUEST;
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("사용 불가능한 토큰");
			
			resultMap.put("message", e.getMessage());
			status = HttpStatus.UNAUTHORIZED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@Operation(summary = "로그인 상태의 유저 정보 획득", description = "헤더에 담긴 access_token으로 검사 및 정보 획득")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/info")
	public ResponseEntity<Map<String, Object>> getInfo(HttpServletRequest request) {
		logger.info("getInfo - 호출");
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
			
			try {
				UserDto userDto = loginService.getUserInfo(userPk);
				
				resultMap.put("userInfo", userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.info("사용자 정보 조회 실패" + " " + e);
				
				resultMap.put("message", FAIL);
				status = HttpStatus.BAD_REQUEST;
			} 
		} else {
			logger.info("사용 불가능한 토큰");
			
			resultMap.put("message", "Token has expired");
			status = HttpStatus.UNAUTHORIZED;
		}
		
		return new ResponseEntity<Map<String,Object>>(resultMap, status);
	}

	@Transactional(readOnly = false)
	@Operation(summary = "access_token 재발급", description = "유저의 refresh_token 및 userPk를 사용하여 access_token 재발급 "
			+ " \n 토큰과 userPk값만 입력하시면 됩니다.")
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
			logger.info("Refresh Token Check ... ");
			
			if ( token.equals( loginService.getRefreshToken(userDto.getUserPk()) ) ) {
				String accessToken = jwtTokenProvider.createAccessToken("userPk", userDto.getUserPk());
				
				resultMap.put("access_token", accessToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
				logger.info("액세스 토큰 재발급 완료");
				
			}
		} else {
			logger.info("사용 불가능한 리프레쉬 토큰");
			
			resultMap.put("message", "Token has expired");
			status = HttpStatus.UNAUTHORIZED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@Transactional(readOnly = false)
	@Operation(summary = "로그아웃", description = "DB에 저장된 refresh_token 삭제")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	@PutMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		logger.info("logout - 호출");
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
		
			try {
				loginService.deleteRefreshToken(userPk);
				resultMap.put("message", SUCCESS);
			} catch (Exception e) {
				logger.info("로그아웃 실패 - " + e);
	
				resultMap.put("message", e.getMessage());
				status = HttpStatus.BAD_REQUEST;
			}
		} else {
			logger.info("사용 불가능한 토큰");
			
			resultMap.put("message", "Token has expired");
			status = HttpStatus.UNAUTHORIZED;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
		
	}
	
}
