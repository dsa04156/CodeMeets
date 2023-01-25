package com.hypeboy.codemeets.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.GroupNoticeDto;
import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.GroupNoticeServiceImpl;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/group-notice")
public class GroupNoticeController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private GroupNoticeServiceImpl groupNoticeService;
	
    @Operation(summary = "Write Notice", description = "그룹 공지사항 작성 "
    		+ " \n groupNoticeDate, groupNoticeHit, groupNoticePk 제외 "
    		+ " \n 현재 파일 업로드는 미구현")
    @PostMapping
	public ResponseEntity<?> write(@RequestBody GroupNoticeDto groupNoticeDto) {
		logger.info("write - 호출");
		
		try {
			logger.info("writeGroupNotice - 호출");
			
			groupNoticeService.writeGroupNotice(groupNoticeDto);
			
			return new ResponseEntity<String>("Write GroupNotice Success", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Write GroupNotice Fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "Get Notice", description = "그룹 공지사항 확인")
    @GetMapping
	public ResponseEntity<?> getGroupNotice(@RequestParam("groupNoticePk") int groupNoticePk) {
		logger.info("getGroupNotice - 호출");
		
		try {
			GroupNoticeDto groupNoticeDto = groupNoticeService.getGroupNotice(groupNoticePk);
			
			return new ResponseEntity<GroupNoticeDto>(groupNoticeDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Write GroupNotice Fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "Get Notice List", description = "그룹 공지사항 목록 확인 "
    		+ " \n nowPage = 현재 페이지, items = 불러올 공지 목록 수")
    @GetMapping(value="/list")
	public ResponseEntity<?> getGroupNoticeList(@RequestParam("groupPk") int groupPk,
			@RequestParam("nowPage") int nowPage,
			@RequestParam("items") int items) {
		logger.info("getGroupNoticeList - 호출");
		
		try {
			List<GroupNoticeDto> groupNoticeList = groupNoticeService.getGroupNoticeList(groupPk, nowPage - 1, items);
			
			return new ResponseEntity<List<GroupNoticeDto>>(groupNoticeList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Write GroupNotice Fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
