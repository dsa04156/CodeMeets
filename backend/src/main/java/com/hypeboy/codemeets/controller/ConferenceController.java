package com.hypeboy.codemeets.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.ConferenceDto;
import com.hypeboy.codemeets.model.dto.GroupUserDto;
import com.hypeboy.codemeets.model.service.ConferenceServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/conference")
@Api(tags = "회의 API")
public class ConferenceController {
	private final Logger logger = LoggerFactory.getLogger(ConferenceController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private ConferenceServiceImpl conferenceService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
    @Operation(summary = "회의 상세 조회", description = "회의 상세 페이지 조회")
	@GetMapping(value="/detail/{conference_pk}", produces = "application/json;charset=utf-8")
	public ResponseEntity<?> getConferenceDetail(@PathVariable("conference_pk") int conferencePk) throws Exception {
		logger.info("getConferenceDetail - 호출");

		try {
			ConferenceDto conferenceDetail = conferenceService.getConferenceDetail(conferencePk);
			
			if (conferenceDetail != null) {
				StringTokenizer st = new StringTokenizer(conferenceDetail.getJoinUser(), ", ");
				conferenceDetail.setJoinUserCnt(st.countTokens());
				
				return new ResponseEntity<ConferenceDto>(conferenceDetail, HttpStatus.OK);
			}
			else {
				logger.warn("존재하지 않는 회의(conferencePk)입니다");
				
				return new ResponseEntity<String>("Not Exist ConferencePk", HttpStatus.BAD_REQUEST);
			}
			
		} catch (Exception e) {
			logger.warn("Controller getConferenceDetail fail - " + e);

			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    @Operation(summary = "회의 생성 버튼 클릭",description = "회의 생성 버튼 클릭 시 데이터")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token",required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/click")
    public ResponseEntity<?> clickCreate(HttpServletRequest request) throws Exception{
    	logger.info("회의 생성 버튼 클릭 API 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	try {
			logger.info("난수 생성");
			String url = RandomStringUtils.randomAlphanumeric(10);
			List<String> myGroup = new ArrayList<String>();
			myGroup.add(url);
			myGroup.addAll((conferenceService.clickCreate(userPk)));
    		System.out.println(myGroup.toString());	
    		return new ResponseEntity<List<String>>(myGroup,HttpStatus.OK);
    	}catch (Exception e) {
    		System.out.println(e);
    		return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
		}
    		
	}

    
    @Operation(summary = "회의 생성",description = "회의 생성하기 ")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token",required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/create")
    public ResponseEntity<?> createConference(HttpServletRequest request,@RequestBody ConferenceDto conferenceDto) throws Exception{
    	logger.info("회의 생성 API 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	conferenceDto.setUserPk(userPk);
    	if( conferenceService.createConference(conferenceDto)!=0) {
    		try {
    			int conferencePk = conferenceDto.getConferencePk();
    			conferenceService.joinConference(conferencePk, userPk);
    			logger.info("회의 생성 성공");
    			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
    		}catch (Exception e) {
    			logger.info("회의 실패");
    			return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
			}
    		
    	}
    	else {
    		return new ResponseEntity<String>(FAIL,HttpStatus.BAD_REQUEST);
    	}
    }
    
    @Operation(summary = "회의 종료",description = "회의 종료하기 ")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token",required = true, dataType = "String", paramType = "header")
    })
    @PutMapping("/close")
    public ResponseEntity<?> closeConference(HttpServletRequest request,@RequestParam int conferencePk) throws Exception{
    	logger.info("회의 종료 API 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    		try {
    			conferenceService.closeConference(conferencePk,userPk);
    				
				logger.info("회의 종료 성공");
				return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
    	
    		}
    		catch (Exception e) {
    			
    			logger.info("회의종료 실패");
    			return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
			}
    		
		}
    
    
    @Operation(summary = "회의 참가",description = "회의 참가하기 ")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token",required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/enter")
    public ResponseEntity<?> enterConference(HttpServletRequest request,@RequestParam String conferenceUrl) throws Exception{
    	logger.info("회의 참가 API 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	logger.info("회의참가하기");
		try {
			logger.info("url 확인");
			int conferencePk = conferenceService.checkUrl(conferenceUrl);
			logger.info("url 체크 완료" + conferencePk);
			conferenceService.enterConference(userPk,conferencePk);
			logger.info("회의 참가 성공");
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}catch (Exception e) {
			logger.info("회의 참가 실패"+e);
			return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
    	}
    
    
    
    @Operation(summary = "회의 나가기 개발중",description = "회의 나가기 ")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token",required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/exit")
    public ResponseEntity<?> exitConference(HttpServletRequest request,@RequestParam int conferencePk) throws Exception{
    	logger.info("회의 참가 API 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	logger.info("회의 나가기 API");
		try {
			conferenceService.exitConference(conferencePk,userPk);
			logger.info("회의 나가기 완료");
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}catch (Exception e) {
			logger.info("회의 나가기 실패"+e);
			return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
    	}
    
    
    
}
