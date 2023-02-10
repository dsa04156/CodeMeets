package com.hypeboy.codemeets.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
	private JwtTokenProvider jwtTokenProvider;
	
    @Value("${jwt.access-token}")
    private String accessToken;
    
    @Value("${jwt.refresh-token}")
    private String refreshToken;
	
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
				
				String newAccessToken = jwtTokenProvider.createAccessToken("userPk", loginUserDto.getUserPk());
				String newRefreshToken = jwtTokenProvider.createRefreshToken();
				loginService.saveRefreshToken(loginUserDto.getUserPk(), newRefreshToken);
				
				resultMap.put(accessToken, newAccessToken);
				resultMap.put(refreshToken, newRefreshToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
				
				logger.info("로그인 성공");
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
	
	@Operation(summary = "로그인 상태의 유저 정보 획득", description = "헤더에 담긴 AccessToken으로 검사 및 정보 획득")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/info")
	public ResponseEntity<Map<String, Object>> getInfo(HttpServletRequest request) {
		logger.info("getInfo - 호출");
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		if ( jwtTokenProvider.validateToken(request.getHeader(accessToken)) ) {
			logger.info("사용가능한 토큰");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
			
			try {
				UserDto userDto = loginService.getUserInfo(userPk);
				
				resultMap.put("userInfo", userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
				
				logger.info("사용자 정보 조회 성공");
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
	@Operation(summary = "AccessToken 재발급", description = "유저의 RefreshToken 및 userPk를 사용하여 AccessToken 재발급 "
			+ " \n 토큰과 userPk값만 입력하시면 됩니다.")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
		logger.info("refreshToken - 호출");
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.ACCEPTED;
		String token = request.getHeader(refreshToken);
		
		if ( jwtTokenProvider.validateToken(token) ) {
			logger.info("Refresh Token Check ... ");
			
			if ( token.equals( loginService.getRefreshToken(userDto.getUserPk()) ) ) {
				String newAccessToken = jwtTokenProvider.createAccessToken("userPk", userDto.getUserPk());
				
				resultMap.put(accessToken, newAccessToken);
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
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@PutMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		logger.info("logout - 호출");
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		if ( jwtTokenProvider.validateToken(request.getHeader(accessToken)) ) {
			logger.info("사용가능한 토큰");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
		
			try {
				loginService.deleteRefreshToken(userPk);
				resultMap.put("message", SUCCESS);

				logger.info("로그아웃 성공");
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

	// OAuth 로그인 성공 후 실행되는 메소드. 현재 미사용
	@GetMapping("/oauth2/success")
	public ResponseEntity<?> loginSuccess(@RequestParam("accessToken") String accessToken, @RequestParam("refreshToken") String refreshToken) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.ACCEPTED;
		
		resultMap.put("accessToken", accessToken);
		resultMap.put("refreshToken", refreshToken);
        
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
}
