package com.hypeboy.codemeets.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/group")
@Api(tags = "그룹 API")
public class GroupController {
	private final Logger logger = LoggerFactory.getLogger(GroupController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	GroupServiceImpl groupService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    
    @Operation(summary = "그룹 만들기", description = "그룹 만들기 API "
    		+ " \n group_Pk값은 제외해주세요"
    		+ "\n manager_id 값은 회원 pk 번호입니다 ")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/create")
	public ResponseEntity<?> regist(@RequestBody @ApiParam(value="그룹 만들기",required = true) GroupDto groupDto,HttpServletRequest request) throws Exception {
			logger.info("create group - 호출");
			GroupUserDto guDto = new GroupUserDto();
			int userPk=0;
			if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
				logger.info("사용가능한 토큰입니다");
				
				userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
				logger.info("userPk - " + userPk);
	    	}
	    	else {
	    		logger.info("토큰 실패");
	    	}
			groupDto.setManagerId(userPk);
			if(groupService.createGroup(groupDto)!=0) {
				logger.info("createGroup - 성공");
				logger.info(groupDto.toString());
				guDto.setGroupPk(groupDto.getGroupPk());
				guDto.setUserPk(groupDto.getManagerId());
				groupService.createGroupUser(guDto);
				logger.info(guDto.toString());
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			}else
				return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
	}
    
    @Operation(summary = "그룹 회원 목록", description = "그룹 멤버 리스트 API ")
    @GetMapping("/{groupPk}/member")
	public ResponseEntity<?> groupMemberList(@PathVariable("groupPk") int groupPk) {
		try {
			logger.info("group member list - 호출");
			List<UserDto> groupMemberList = groupService.groupMemberList(groupPk);
			logger.info("group member list - 호출 성공");
			System.out.println(groupMemberList.toString());
			return new ResponseEntity<List<UserDto>>(groupMemberList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "그룹 가입하기", description = "그룹 가입 API ")
    @PostMapping("/{groupPk}/join")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
	public ResponseEntity<?> groupJoin(@PathVariable("groupPk") int groupPk,HttpServletRequest request) throws SQLException  {
    	logger.info("group join - 호출");
    	System.out.println(groupPk);
    	int userPk=0;
     	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
     	GroupUserDto guDto = new GroupUserDto();
     	guDto.setGroupPk(groupPk);
     	guDto.setUserPk(userPk);
    	if(groupService.groupJoin(guDto)!=0) {
    		logger.info("group-join 성공");
    		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    	}else
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
	}
    
    @Operation(summary = "그룹 목록", description = "그룹 리스트")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/list")
    public ResponseEntity<?> groupList(HttpServletRequest request) throws Exception{
//    	public ResponseEntity<?> groupList(@PathVariable("userPk") int userPk) throws Exception{
    	logger.info("group list 호출");
    	Map<String, Object> resultMap = new HashMap<String, Object>();
    	HttpStatus status = HttpStatus.UNAUTHORIZED;
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	List<GroupListDto> groupList = groupService.getList(userPk);
    	logger.info("gpList 호출");
    	logger.info(groupList.toString());
    	List<Integer> groupPkList = groupService.gpList(userPk);
    	logger.info(groupPkList.toString());
    	int gc = groupPkList.size();
    	System.out.println(gc);
    	for(int i=0;i<gc;i++) {
    		groupList.get(i).setCnt(i+1);
    		groupList.get(i).setGroupPk(groupPkList.get(i));
    		groupList.get(i).setCount(groupService.countMember(groupPkList.get(i)));
    		groupList.get(i).setCallStartTime(groupService.callStartTime(groupPkList.get(i)));
    	}
    	return new ResponseEntity<List<GroupListDto>>(groupList,HttpStatus.OK);
    }
    
    
    @Operation(summary = "그룹 수정하기", description = "그룹 수정")
    @PutMapping("/{groupPk}/modify")
	public ResponseEntity<?> groupModify(@PathVariable("groupPk") int groupPk,@RequestBody GroupDto groupDto) {
		try {
			logger.info("group modify - 호출");
			groupDto.setGroupPk(groupPk);
			groupService.groupModify(groupDto);
			logger.info("group modify - 호출 성공");
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(String.valueOf(e));
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @Operation(summary = "그룹 삭제하기", description = "그룹 삭제하기")
    @PutMapping("/{groupPk}/delete")
	public ResponseEntity<?> groupDelete(@PathVariable("groupPk") int groupPk) {
		try {
			logger.info("group delete - 호출");
			groupService.groupDelete(groupPk);
			logger.info("group delete - 호출 성공");
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
}
