package com.hypeboy.codemeets.controller;

import java.util.HashMap;
import java.util.List;
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

import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.UserServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/user")
public class UserController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private UserServiceImpl userService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	
    @Operation(summary = "Dev - Search UserInfo", description = "유저 ID로 유저 정보 검색")
	@GetMapping(value="/dev-search-userinfo", produces = "application/json;charset=utf-8")
	public ResponseEntity<?> userInfoList(@RequestParam("userId") String userId) throws Exception {
		logger.info("userInfoList - 호출");

		try {
			List<UserDto> user = userService.getUserList(userId);
			return new ResponseEntity<List<UserDto>>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
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
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Transactional
    @Operation(summary = "Regist User", description = "유저 회원가입 API "
    		+ " \n userPk, userInfoPk, userActive값은 제외해주세요 "
    		+ " \n 이메일, 전화번호 공개 시 값 1로 설정바랍니다.")
    @PostMapping("/regist")
	public ResponseEntity<?> regist(@RequestBody UserDto userDto) {
		logger.info("regist - 호출");
		
		try {
			logger.info("registUser - 호출");
			
			userService.registUser(userDto);
			logger.info(userDto.toString());
			logger.info("registUserInfo - 호출");
			
			userService.registUserInfo(userDto);
			logger.info(userDto.toString());
			logger.info("registUser, registUserInfo - 성공");
			
			return new ResponseEntity<String>("Regist User Success", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Regist User Fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "Check Overlap ID", description = "회원가입시 ID 중복 검사 API")
    @GetMapping("/overlap")
	public ResponseEntity<?> userIdOverlap(@RequestParam("userId") String userId) throws Exception {
		logger.info("userIdOverlap - 호출");

		try {
			logger.info("userId : " + userId);
			
			int result = userService.getUserIdOverlap(userId);
			
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "Check Overlap Tel", description = "회원가입시 전화번호 중복 검사 API")
    @GetMapping("/telOverlap")
	public ResponseEntity<?> userTelOverlap(@RequestParam("tel") String tel) throws Exception {
		logger.info("userTelOverlap - 호출");

		try {
			logger.info("Tel : " + tel);
			
			int result = userService.getUserTelOverlap(tel);
			
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "Check Overlap Email", description = "회원가입시 이메일 중복 검사 API")
    @GetMapping("/emailOverlap")
	public ResponseEntity<?> userEmailOverlap(@RequestParam("email") String email) throws Exception {
		logger.info("userTelOverlap - 호출");

		try {
			logger.info("email : " + email);
			
			int result = userService.getUserEmailOverlap(email);
			
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
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
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
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
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "Edit PW", description = "PW 수정")
    @PutMapping("/edit-pw")
	public ResponseEntity<?> editPw(@RequestParam("userId") String userId, @RequestParam("password") String password) throws Exception {
    	logger.info("editPw - 호출");
    	
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			resultMap.put("message", userService.editPw(userId, password) ? SUCCESS : FAIL);
			
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "Get MyPage Info", description = "MyPage 유저 정보 확인 "
    		+ " \n userPk와 헤더에 담긴 토큰으로 확인")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/{userPk}/myprofile")
	public ResponseEntity<?> getMyProfile(@PathVariable("userPk") String userPk, HttpServletRequest request) throws Exception {
    	logger.info("getMyProfile - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader("access-token"))) {
			logger.info("사용가능한 토큰입니다");
			
			try {
				UserDto userDto = userService.getMyProfile(userPk);
				resultMap.put("myProfile", userDto);
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
    
    
    @Operation(summary = "Edit User Profile", description = "유저 프로필 수정 "
    		+ " \n 프로필 사진, 이메일, 전화번호, 닉네임 수정")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @PutMapping("/{userPk}/edit-profile")
	public ResponseEntity<?> editProfile(@PathVariable("userPk") int userPk, @RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
		logger.info("editProfile - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader("access-token"))) {
			logger.info("사용가능한 토큰입니다");
			
			try {
				userDto.setUserPk(userPk);
				userService.editMyProfile(userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.info("사용자 정보 수정 실패" + " " + e);
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
	@Operation(summary = "Resign", description = "회원탈퇴")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS-TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	@PutMapping("/resign")
	public ResponseEntity<?> resign(@RequestParam("userPk") int userPk, HttpServletRequest request) {
		logger.info("resign - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader("access-token"))) {
			logger.info("사용가능한 토큰입니다");
			
			try {
				userService.resign(userPk);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.info("유저 회원탈퇴 실패" + " " + e);
				
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
    
    
}
