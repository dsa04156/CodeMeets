package com.hypeboy.codemeets.controller;

import java.util.List;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.ConferenceDto;
import com.hypeboy.codemeets.model.service.ConferenceServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/conference")
@Api(tags = "회의 API")
public class ConferenceController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);

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

}
