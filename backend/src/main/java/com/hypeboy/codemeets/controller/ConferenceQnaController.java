package com.hypeboy.codemeets.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiParam;

@RestController
@Api(tags = "회의내 질문")
@RequestMapping("/conferenceQna")
public class ConferenceQnaController {
	
	private static final Logger Logger = LoggerFactory.getLogger(QnaController.class);
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private ConferenceQna service;
	
	@Autowire
	public ConferenceQna(ConferenceQna service) {
		super();
		this.service = service;
	}
	
	@PostMapping
	public ResponseEntity<String> writeConferenceQna(@ApiParam(value = "qna 정보.", required = true) ConferenceQnaDto conferenceQnaDto) throws Exception {
		
		try {
			service.writeConferenceQna(conferenceQnaDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("writeConferenceQna fail - " + e); 

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	}
	
	@ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/list")
	public ResponseEntity<?> getList(HttpServletRequest request,
			@PathParam("conferencePk") int conferencePk,
			){
			logger.info("conferenceQna list 호출");
	
	
	
	
	}
	
	
	
	
	
	
	
	
	
	
	
}
