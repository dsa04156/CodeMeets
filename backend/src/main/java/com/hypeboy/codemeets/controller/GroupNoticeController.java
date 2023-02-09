package com.hypeboy.codemeets.controller;

import java.util.List;

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

import com.hypeboy.codemeets.model.dto.GroupNoticeDto;
import com.hypeboy.codemeets.model.service.GroupNoticeServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/group-notice")
@Api(tags = "그룹 공지 API")
public class GroupNoticeController {
	private final Logger logger = LoggerFactory.getLogger(GroupNoticeController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private GroupNoticeServiceImpl groupNoticeService;
	
	@Operation(summary = "그룹 공지사항 작성", description = "필수 groupNoticeTitle, groupNoticeContents, groupPk, userPk "
			+ " \n 옵션 originFilename, dbFilename "
			+ " \n 제외 groupNoticeDate, groupNoticeHit, groupNoticePk")
    @PostMapping
	public ResponseEntity<?> writeGroupNotice(@RequestBody GroupNoticeDto groupNoticeDto) {
		logger.info("Controller writeGroupNotice - 호출");
		
		try {
			groupNoticeService.writeGroupNotice(groupNoticeDto);
			
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("Controller writeGroupNotice fail - " + e);
			
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
	@Operation(summary = "그룹 공지사항 확인", description = "그룹 공지사항 상세 확인")
    @GetMapping("/{groupNoticePk}")
	public ResponseEntity<?> getGroupNotice(@PathVariable("groupNoticePk") int groupNoticePk) {
		logger.info("Controller getGroupNotice - 호출");
		
		try {
			GroupNoticeDto groupNoticeDto = groupNoticeService.getGroupNotice(groupNoticePk);
			
			return new ResponseEntity<GroupNoticeDto>(groupNoticeDto, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("Controller getGroupNotice fail - " + e);
			
			return new ResponseEntity<String>("Write GroupNotice Fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
	@Operation(summary = "그룹 공지사항 목록 확인", description = "nowPage = 현재 페이지, items = 불러올 공지 목록 수 "
			+ " \n order = ['group_notice_pk', 'user_name', 'group_notice_date'] 중 하나를 선택해 보내주세요 (번호 순, 작성자 순, 작성일 순)")
    @GetMapping
	public ResponseEntity<?> getGroupNoticeList(@RequestParam("groupPk") int groupPk,
			@RequestParam("nowPage") int nowPage,
			@RequestParam("items") int items,
			@RequestParam("order") String order) {
		logger.info("Controller getGroupNoticeList - 호출");
		
		try {
			List<GroupNoticeDto> groupNoticeList = groupNoticeService.getGroupNoticeList(groupPk, (nowPage - 1) * items, items, order);
			
			return new ResponseEntity<List<GroupNoticeDto>>(groupNoticeList, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("Controller getGroupNoticeList fail - " + e);
			
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
	@Operation(summary = "그룹 공지사항 수정", description = "groupNoticeDate, groupNoticeHit, groupPk, userPk는 제외하셔도 됩니다")
    @PutMapping
	public ResponseEntity<?> editGroupNotice(@RequestBody GroupNoticeDto groupNoticeDto) {
		logger.info("Controller editGroupNotice - 호출");
		
		GroupNoticeDto newGroupNoticeDto = new GroupNoticeDto();
		newGroupNoticeDto.setGroupNoticePk(groupNoticeDto.getGroupNoticePk());
		newGroupNoticeDto.setGroupNoticeTitle(groupNoticeDto.getGroupNoticeTitle());
		newGroupNoticeDto.setGroupNoticeContents(groupNoticeDto.getGroupNoticeContents());
		newGroupNoticeDto.setOriginFilename(groupNoticeDto.getOriginFilename());
		newGroupNoticeDto.setDbFilename(groupNoticeDto.getDbFilename());
		
		try {
			groupNoticeService.editGroupNotice(newGroupNoticeDto);
			
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("Controller editGroupNotice fail - " + e);
			
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
	@Operation(summary = "그룹 공지사항 삭제", description = "그룹 공지사항 삭제")
    @DeleteMapping
	public ResponseEntity<?> deleteGroupNotice(@RequestParam("groupNoticePk") int groupNoticePk) {
		logger.info("Controller deleteGroupNotice - 호출");
		
		try {
			groupNoticeService.deleteGroupNotice(groupNoticePk);
			
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			logger.warn("Controller deleteGroupNotice fail - " + e);
			
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
