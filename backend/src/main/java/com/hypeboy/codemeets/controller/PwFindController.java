package com.hypeboy.codemeets.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.service.PwFindService;

import io.swagger.annotations.Api;

@RestController
@Api(tags = "비밀번호 찾기 API")
@RequestMapping(value="/api/pwfind")
public class PwFindController {
	private final Logger Logger = LoggerFactory.getLogger(GroupController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private PwFindService service;
	
	@Autowired
	public PwFindController(PwFindService service) {
		super();
		this.service = service;
	}
	
	@GetMapping
	public ResponseEntity<?> pwfind(@RequestParam("userId") String userId, @RequestParam("userEmail") String userEmail) throws Exception {
		Logger.info("아이디, 이메일 매치 확인 호출");
		
		if(service.pwFind(userId, userEmail)==1) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else {	
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping
	public ResponseEntity<?> pwSend(@RequestParam("userId") String userId, @RequestParam("userEmail") String userEmail) throws Exception {
		
		Logger.info("pwFind 호출");
		
		try {
			service.pwSend(userId, userEmail);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			Logger.warn("pwFind fail" + e);
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
