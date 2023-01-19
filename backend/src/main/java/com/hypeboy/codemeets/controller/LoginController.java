package com.hypeboy.codemeets.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@Operation(summary = "Login", description = "로그인 API \n\n ID와 PW값을 입력해주세요")
    @PostMapping
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDto loginDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			UserDto userDto = loginService.login(loginDto);
			
			if (userDto != null) {
				logger.info("LoginController - login " + userDto.toString());
				String accessToken = jwtTokenProvider.createAccessToken("id", userDto.getUserId());
				String refreshToken = jwtTokenProvider.createRefreshToken("id", userDto.getUserId());
				loginService.saveRefreshToken(userDto.getUserId(), refreshToken);
				resultMap.put("access-token", accessToken);
				resultMap.put("refresh-token", refreshToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				logger.info("정보 조회 실패");
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
	
	@Operation(summary = "Get Login UserInfo", description = "로그인 상태의 유저 정보 획득 API."
			+ " \n\n 아이디와 헤더에 담긴 토큰으로 검사")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> getInfo(@PathVariable("id") String id, HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader("access-token"))) {
			logger.info("사용가능한 토큰입니다");
			try {
				UserDto userDto = loginService.getUserInfo(id);
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
	
	@Operation(summary = "Get Access-Token", description = "유저의 refresh-token 사용하여 access-token 재발급")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "REFRESH-TOKEN", value = "로그인 성공 후 발급 받은 refresh-token", required = true, dataType = "String", paramType = "header")
    })
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.ACCEPTED;
		String token = request.getHeader("refresh-token");
		
		if (jwtTokenProvider.validateToken(token)) {
			if (token.equals(loginService.getRefreshToken(userDto.getUserId()))) {
				String accessToken = jwtTokenProvider.createAccessToken("id", userDto.getUserId());
				resultMap.put("access-token", accessToken);
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

}
