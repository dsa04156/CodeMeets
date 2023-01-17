package com.hypeboy.codemeets.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.UserInfoDto;
import com.hypeboy.codemeets.model.service.UserInfoServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@EnableSwagger2
@RestController
@RequestMapping("/user")
public class UserInfoController {
	private final Logger logger = LoggerFactory.getLogger(UserInfoController.class);
	
	@Autowired
	private UserInfoServiceImpl userInfoService;
	
    @Operation(summary = "test UserInfo", description = "userInfo api example")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
	@GetMapping(produces = "application/json;charset=utf-8")
	public ResponseEntity<?> userInfoList(@RequestParam("userPk") int userPk) throws Exception {
		logger.info("favorite list - 호출");

		try {
			logger.info("favorite list - 시작");
			List<UserInfoDto> test = userInfoService.getUserInfoList(userPk);
			logger.info("favorite list - 값 호출 성공");
			System.out.println(test.toString());
			return new ResponseEntity<List<UserInfoDto>>(test, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    
    
    
}
