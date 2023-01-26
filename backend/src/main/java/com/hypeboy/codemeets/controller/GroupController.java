package com.hypeboy.codemeets.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dao.GroupDao;
import com.hypeboy.codemeets.model.dto.GroupDto;
import com.hypeboy.codemeets.model.dto.GroupListDto;
import com.hypeboy.codemeets.model.dto.GroupUserDto;
import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.GroupService;
import com.hypeboy.codemeets.model.service.GroupServiceImpl;

import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/group")
public class GroupController {
	private final Logger logger = LoggerFactory.getLogger(GroupController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	GroupServiceImpl groupService;
	
	
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    
    @Operation(summary = "Regist Group", description = "그룹 만들기 API "
    		+ " \n group_Pk값은 제외해주세요"
    		+ "\n manager_id 값은 회원 pk 번호입니다 ")
    @PostMapping("/create")
	public ResponseEntity<?> regist(@RequestBody @ApiParam(value="그룹 만들기",required = true) GroupDto groupDto) throws Exception {
			logger.info("create group - 호출");
			GroupUserDto guDto = new GroupUserDto();
			if(groupService.createGroup(groupDto)!=0) {
				logger.info("createGroup - 성공");
				
				logger.info(groupDto.toString());
				guDto.setGpk(groupDto.getGpk());
				guDto.setUserPk(groupDto.getMid());
				logger.info(guDto.toString());
				groupService.createGroupUser(guDto);
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			}else
				return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
	}
    
    @Operation(summary = "Group Member List", description = "그룹 멤버 리스트 API ")
    @GetMapping("/{groupPk}/member")
	public ResponseEntity<?> groupMemberList(@PathVariable("groupPk") int groupPk) {
		try {
			logger.info("group member list - 호출");
			List<UserDto> groupMemberList = groupService.groupMemberList(groupPk);
			logger.info("group member list - 호출 성공");
			return new ResponseEntity<List<UserDto>>(groupMemberList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "Group Join", description = "그룹 가입 API ")
    @PostMapping("/join")
	public ResponseEntity<?> groupJoin(@RequestBody @ApiParam(value="그룹 가입하기",required = true) GroupUserDto guDto) throws SQLException  {
    	logger.info("group join - 호출");
    	System.out.println(guDto);
    	if(groupService.groupJoin(guDto)!=0) {
    		logger.info("group-join 성공");
    		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    	}else
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
	}
    
    @Operation(summary = "Group List", description = "그룹 리스트")
    @GetMapping("/")
    public ResponseEntity<?> groupList() throws Exception{
    	logger.info("group list 호출");
    	List<GroupListDto> groupList = groupService.getList();
    	logger.info("gpList 호출");
    	List<Integer> groupPkList = groupService.gpList();
    	int gc = groupService.countGroup();
    	for(int i=0;i<gc;i++) {
    		groupList.get(i).setCnt(i+1);
    		groupList.get(i).setCount(groupService.countMember(groupPkList.get(i)));
    		groupList.get(i).setCallStartTime(groupService.callStartTime(groupPkList.get(i)));
    	}
    	System.out.println(groupList);
    	return new ResponseEntity<List<GroupListDto>>(groupList,HttpStatus.OK);
    }
    
    
    
}
