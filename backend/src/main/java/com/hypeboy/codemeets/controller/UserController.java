package com.hypeboy.codemeets.controller;

import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.ConferenceGroupDto;
import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;
import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.UserServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/user")
@Api(tags = "유저 API")
public class UserController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private UserServiceImpl userService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
    @Value("${jwt.access-token}")
    private String accessToken;
    
    @Value("${jwt.refresh-token}")
    private String refreshToken;
	
    @Operation(summary = "개발용 - 유저 정보 검색", description = "유저 ID로 유저 정보 검색")
	@GetMapping(value="/dev-search-userinfo", produces = "application/json;charset=utf-8")
	public ResponseEntity<?> devGetUserInfoList(@RequestParam("userId") String userId) throws Exception {
		logger.info("userInfoList - 호출");

		try {
			List<UserDto> user = userService.devGetUserInfo(userId);
			return new ResponseEntity<List<UserDto>>(user, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("userInfoList fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "개발용 - 유저 정보 목록 획득", description = "모든 유저 정보 얻기")
	@GetMapping(value="/dev-all-userlist", produces = "application/json;charset=utf-8")
	public ResponseEntity<?> devGetUserInfoAllList() throws Exception {
		logger.info("userInfoAllList - 호출");

		try {
			List<UserDto> allUserList = userService.devGetUserInfoAllList();
			
			return new ResponseEntity<List<UserDto>>(allUserList, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("userInfoAllList fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "회원가입", description = "유저 회원가입 API "
    		+ " \n userPk, userInfoPk, userActive값은 제외해주세요 "
    		+ " \n 이메일, 전화번호 공개 시 값 1로 설정바랍니다.")
    @PostMapping("/regist")
	public ResponseEntity<?> regist(@RequestBody UserDto userDto) {
		logger.info("regist - 호출");
		
		try {
			logger.info("registUser - 호출");
			
			userDto.setProvider("codemeets");
			userService.registUser(userDto);
			
			logger.info(userDto.toString());
			logger.info("registUser - 성공");
			
			return new ResponseEntity<String>("Regist User Success", HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("regist fail - " + e);

			return new ResponseEntity<String>("Regist User Fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "ID 중복검사", description = "회원가입시 ID 중복 검사 API")
    @GetMapping("/overlap")
	public ResponseEntity<?> userIdOverlap(@RequestParam("userId") String userId) throws Exception {
		logger.info("userIdOverlap - 호출");

		try {
			logger.info("userId : " + userId);
			
			int result = userService.getUserIdOverlap(userId);
			
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("userIdOverlap fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "전화번호 중복 검사", description = "회원가입시 전화번호 중복 검사 API")
    @GetMapping("/telOverlap")
	public ResponseEntity<?> userTelOverlap(@RequestParam("tel") String tel) throws Exception {
		logger.info("userTelOverlap - 호출");

		try {
			logger.info("Tel : " + tel);
			
			int result = userService.getUserTelOverlap(tel);
			
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("userTelOverlap fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "이메일 중복 검사", description = "회원가입시 이메일 중복 검사 API")
    @GetMapping("/emailOverlap")
	public ResponseEntity<?> userEmailOverlap(@RequestParam("email") String email) throws Exception {
		logger.info("userTelOverlap - 호출");

		try {
			logger.info("email : " + email);
			
			int result = userService.getUserEmailOverlap(email);
			
			return new ResponseEntity<Integer>(result, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("userEmailOverlap fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "ID 찾기", description = "email 혹은 전화번호 기반 ID 찾기 "
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
			logger.warn("searchId fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "패스워드 수정 자격 확인", description = "ID와 email 혹은 전화번호 기반 PW 수정 자격 확인 "
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
			logger.warn("forgotPw fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "패스워드 수정", description = "PW 수정")
    @PutMapping("/edit-pw")
	public ResponseEntity<?> editPw(@RequestParam("userId") String userId, @RequestParam("password") String password) throws Exception {
    	logger.info("editPw - 호출");
    	
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			resultMap.put("message", userService.editPw(userId, password) ? SUCCESS : FAIL);
			
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("editPw fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

    
    @Operation(summary = "유저 본인 정보 조회", description = "유저 정보 조회 "
    		+ " \n 헤더에 담긴 토큰으로 확인")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/{userPk}/myprofile")
	public ResponseEntity<?> getMyProfile(HttpServletRequest request) throws Exception {
		logger.info("getMyProfile - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
			
			try {
				UserDto userDto = userService.getMyProfile(userPk);
				resultMap.put("myProfile", userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.warn("getMyProfile fail - " + e);

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

    
	@Operation(summary = "다른 유저 정보 조회", description = "다른 유저의 정보 조회 " +
			" \n 얻을 유저의 정보(userPk)를 ,로 구분하여 문자열 형태로 전달, 한 사람 정보만 필요하면 ,는 제외 " +
			" \n 공개설정이 0(비공개)라면 '비공개'로 처리")
	@GetMapping(value="/userInfoList", produces = "application/json;charset=utf-8")
	public ResponseEntity<?> getUserInfoList(@RequestParam("userPkList") String userPkList) throws Exception {
		logger.info("getUserInfoList - 호출");

		try {
			List<UserDto> userList = userService.getUserInfoList(userPkList);

			if (userList != null) {
				for (UserDto user : userList) {
					if (user.getEmailPublic() == 0) {
						user.setEmail("비공개");
					}

					if (user.getTelPublic() == 0) {
						user.setTel("비공개");
					}
				}
			}

			return new ResponseEntity<List<UserDto>>(userList, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("getUserInfoList fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
    @Operation(summary = "유저 회의 참석 기록 조회", description = "헤더에 담긴 토큰으로 확인 "
    		+ " \n 현재 페이지와 필요한 행 개수 입력 "
    		+ " \n total은 총 결과 개수 "
    		+ " \n 결과값 중 callEndTime, conferenceContents, userPk, groupDesc, managerId은 반환하지 않습니다")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/my-conference-record")
	public ResponseEntity<?> getMyConferenceRecord(@RequestParam("nowPage") int nowPage, 
			@RequestParam("items") int items, 
			HttpServletRequest request) throws Exception {
		logger.info("getMyConferenceRecord - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
			
			try {
				List<ConferenceGroupDto> conferenceGroupDto = userService.getMyConferenceRecord((nowPage - 1) * items, items, userPk);
				resultMap.put("conference_record", conferenceGroupDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.warn("getMyConferenceRecord fail - " + e);

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
    
    
    @Operation(summary = "유저 회의 참석 기록 조회 (그룹 필터링)", description = "헤더에 담긴 토큰으로 확인 "
    		+ " \n 필터링할 그룹, 현재 페이지와 필요한 행 개수 입력 "
    		+ " \n total은 총 결과 개수"
    		+ " \n 결과값 중 callEndTime, conferenceContents, userPk, groupDesc, managerId은 반환하지 않습니다")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/my-conference-record/{group_pk}")
	public ResponseEntity<?> getMyConferenceRecordFilter(@PathVariable("group_pk") int groupPk,
			@RequestParam("nowPage") int nowPage, 
			@RequestParam("items") int items, 
			HttpServletRequest request) throws Exception {
		logger.info("getMyConferenceRecordFilter - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
			
			try {
				List<ConferenceGroupDto> conferenceGroupDto = userService.getMyConferenceRecordFilter((nowPage - 1) * items, items, userPk, groupPk);
				resultMap.put("conference_record", conferenceGroupDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.warn("getMyConferenceRecordFilter fail - " + e);

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
    
    
    @Operation(summary = "유저 질문 목록 조회", description = "헤더에 담긴 토큰으로 확인 "
    		+ " \n 현재 페이지와 필요한 행 개수 입력 "
    		+ " \n total은 총 결과 개수")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/my-question-record")
	public ResponseEntity<?> getMyQuestionRecord(@RequestParam("nowPage") int nowPage, 
			@RequestParam("items") int items, 
			HttpServletRequest request) throws Exception {
		logger.info("getMyQuestionRecord - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
			
			try {
				List<ConferenceQuestionDto> conferenceQuestionDto = userService.getMyQuestionRecord((nowPage - 1) * items, items, userPk);
				resultMap.put("question_record", conferenceQuestionDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.warn("getMyQuestionRecord fail - " + e);

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
    
	
    @Operation(summary = "프로필 수정", description = "유저 프로필 정보 수정 "
    		+ " \n 프로필 사진, 이메일, 전화번호, 닉네임 수정")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @PutMapping("/edit-profile")
	public ResponseEntity<?> editProfile(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
		logger.info("editProfile - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			int userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
			
			try {
				userDto.setUserPk(userPk);
				userService.editMyProfile(userDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.warn("editProfile fail - " + e);

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
	@Operation(summary = "회원탈퇴", description = "회원탈퇴 " +
			" \n ")
	@ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@PutMapping("/resign")
	public ResponseEntity<?> resign(@RequestParam("userPk") int userPk, HttpServletRequest request) {
		logger.info("resign - 호출");
		
    	Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			try {
				userService.resign(userPk);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.warn("resign fail - " + e);

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
