package com.hypeboy.codemeets.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;
import com.hypeboy.codemeets.model.service.ConferenceQuestionService;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@Api(tags = "회의내 질문")
@RequestMapping("/api/conferenceQna")
public class ConferenceQuestionController {
	
	private static final Logger Logger = LoggerFactory.getLogger(QnaController.class);
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	private ConferenceQuestionService service;
	
    @Value("${jwt.access-token}")
    private String accessToken;
	
	@Autowired
	public ConferenceQuestionController(ConferenceQuestionService service) {
		super();
		this.service = service;
	}
	
	
	@Operation(summary = "회의 내 질문", description = "질문 만들기 API "
    		+ " conferencePk, groupPk, content, userPk 입력해주시면 됩니다")
	@PostMapping
	public ResponseEntity<String> writeConferenceQna(@ApiParam(value = "conferenceQna 작성.", required = true)@RequestBody ConferenceQuestionDto conferenceQuestionDto) throws Exception {
		Logger.info("writeConferenceQna - 호출");
		try {
			service.writeConferenceQuestion(conferenceQuestionDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("writeConferenceQna fail - " + e); 

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	}
	
    @Operation(summary = "회의 내 질문 목록", description = "회의 내 질문 리스트")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping
	public ResponseEntity<?> getList(HttpServletRequest request, @RequestParam("conferencePk") int conferencePk) throws Exception {    	
    	Logger.info("conferenceQna List 호출");
    	int userPk = 0;
    	
    	try {
    		Logger.info("token check");
    		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
    			Logger.info("사용가능한 토큰입니다");
    			
    			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
    			Logger.info("userPk - " + userPk);
    			
    		}
    		else {
    			Logger.info("토큰 실패");
    		}
    		List<ConferenceQuestionDto> conferenceQuestionList = service.getList(conferencePk, userPk);
    	return new ResponseEntity<List<ConferenceQuestionDto>>(conferenceQuestionList, HttpStatus.OK);
    	} catch (Exception e) {
    		Logger.warn("Controller conferenceQuestionList fail -" + e);
    		return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
	
    @Operation(summary = "회의 내 질문 상세보기", description = "회의 내 질문 상세보기 API "
    		+ " \n 필수값 AccessToken, conferenceQuestionPk")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/detail")
	public ResponseEntity<?> getConferenceQuestion(HttpServletRequest request, @RequestParam("conferenceQuestionPk") int conferenceQuestionPk)throws Exception {
		Logger.info("Controller getconferenceQuestion  - 호출");
    	int userPk = 0;
		
		try {
			Logger.info("token check");
    		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
    			Logger.info("사용가능한 토큰입니다");
    			
    			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
    			Logger.info("userPk - " + userPk);
    			
    		}
    		else {
    			Logger.info("토큰 실패");
    		}
    		
			ConferenceQuestionDto conferenceQuestionDto = service.getConferenceQuestion(conferenceQuestionPk, userPk);
			
			return new ResponseEntity<ConferenceQuestionDto>(conferenceQuestionDto, HttpStatus.OK);		
		} catch (Exception e) {
			Logger.warn("Controller getconferenceQuestion fail -" + e);
			
			return new ResponseEntity<String>("Controller getconferenceQuestion Fail",  HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
    @Operation(summary = "회의 내 질문 수정", description = "회의 내 질문 수정 API "
    		+ " conferenceQuestionPk, contents 입력해주시면 됩니다")
	@PutMapping
	public ResponseEntity<?> modiftConferenceQuestion(@RequestBody ConferenceQuestionDto conferenceQuestionDto) throws Exception {
		try {
			service.modifyConferenceQuestion(conferenceQuestionDto);
			
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			Logger.warn("modifyConferenceQuestion fail - " + e);
			
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
    @Operation(summary = "회의 내 질문 삭제", description = "회의 내 질문 삭제 API "
    		+ " conferenceQuestionPk 입력해주시면 됩니다")
	@DeleteMapping
	public ResponseEntity<String> deleteConferenceQuestion(@RequestParam("conferenceQuestionPk") int conferenceQuestionPk) {
		try {
			service.deleteConferenceQuestion(conferenceQuestionPk);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}catch (Exception e) {
			Logger.warn("deleteConferenceQuestion -" + e);
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
    @Operation(summary = "회의 내 질문 좋아요", description = "회의 내 질문 좋아요 API "
    		+ " conferenceQuestionPk, userPk 입력해주시면 됩니다")
	@PutMapping("/like")
	public ResponseEntity<String> likeConferenceQuestion(@RequestBody ConferenceQuestionDto conferenceQuestionDto) throws Exception {
		try {
			service.likeConferenceQuestion(conferenceQuestionDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}catch (Exception e) {
			Logger.warn("likeConferenceQuestion - " + e);
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@Operation(summary = "페이지네이션 회의 내 질문 목록", description = "회의 내 질문 리스트")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/pageList")
	public ResponseEntity<?> pageList(HttpServletRequest request, @RequestParam("conferencePk") int conferencePk,
			@RequestParam("nowPage") int nowPage,
			@RequestParam("items") int items) throws Exception {
    	Logger.info("conferenceQna List 호출");
    	int userPk = 0;
    	
    	try {
    		Logger.info("token check");
    		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
    			Logger.info("사용가능한 토큰입니다");
    			
    			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
    			Logger.info("userPk - " + userPk);
    			
    		}
    		else {
    			Logger.info("토큰 실패");
    		}
    		List<ConferenceQuestionDto> conferenceQuestionList = service.pageList(conferencePk, userPk, (nowPage -1) * items, items);
    	return new ResponseEntity<List<ConferenceQuestionDto>>(conferenceQuestionList, HttpStatus.OK);
    	} catch (Exception e) {
    		Logger.warn("Controller conferenceQuestionList fail -" + e);
    		return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
	
	
	
	
}
	
	
	
	
