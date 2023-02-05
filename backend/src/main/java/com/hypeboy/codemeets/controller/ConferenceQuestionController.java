package com.hypeboy.codemeets.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/conferenceQna")
public class ConferenceQuestionController {
	
	private static final Logger Logger = LoggerFactory.getLogger(QnaController.class);
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private JwtTokenProvider jwtTokenProvider;
	
	private ConferenceQuestionService service;
	
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
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping
	public ResponseEntity<?> getList(HttpServletRequest request, @RequestParam("conferencePk") int conferencePk) throws Exception {
    	
    	Logger.info("conferenceQna List 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_Token"))) {
    		Logger.info("사용가능한 토큰입니다");
    		
    		userPk = jwtTokenProvider.getUserPk(request.getHeader("acess_token"));
    		Logger.info("userPk - " + userPk);
    	}
    	else {
    		Logger.info("토큰 실패");
    	}
    	
    	try {
    		List<ConferenceQuestionDto> conferenceQuestionList = service.getList(conferencePk, userPk);
    	return new ResponseEntity<List<ConferenceQuestionDto>>(conferenceQuestionList, HttpStatus.OK);
    	} catch (Exception e) {
    		Logger.warn("Controller conferenceQuestionList fail -" + e);
    		return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
	
	@GetMapping("/{conferencePk}")
	public ResponseEntity<?> getConference(@RequestParam("conferencePk") int conferencePk, @RequestParam int userPk)throws Exception {
		Logger.info("Controller getconferenceQuestion  - 호출");
		
		try {
			ConferenceQuestionDto conferenceQuestionDto = service.getConferenceQuestion(conferencePk, userPk);
			return new ResponseEntity<ConferenceQuestionDto>(conferenceQuestionDto, HttpStatus.OK);		
		} catch (Exception e) {
			Logger.warn("Controller getconferenceQuestion fail -" + e);
			
			return new ResponseEntity<String>("Controller getconferenceQuestion Fail",  HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
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
		
	@DeleteMapping
	public ResponseEntity<String> deleteConferenceQuestion(@RequestBody int conferenceQuestionPk) {
		try {
			service.deleteConferenceQuestion(conferenceQuestionPk);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}catch (Exception e) {
			Logger.warn("deleteConferenceQuestion -" + e);
			return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
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
	
}
	
	
	
	
