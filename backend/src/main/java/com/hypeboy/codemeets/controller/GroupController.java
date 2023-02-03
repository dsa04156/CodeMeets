package com.hypeboy.codemeets.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping(value="/group",produces="application/json;charset=UTF-8")
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
			logger.info("난수 생성");
			String url = RandomStringUtils.randomAlphanumeric(10);
			groupDto.setGroupUrl(url);
			groupDto.setManagerId(userPk);
			if(groupService.createGroup(groupDto)!=0) {
				logger.info("createGroup - 성공");
				logger.info(groupDto.toString());
				guDto.setGroupPk(groupDto.getGroupPk());
				guDto.setUserPk(groupDto.getManagerId());
				groupService.createGroupUser(guDto);
				logger.info("createGroup 성공");
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			}else
				return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
	}
    
    @Operation(summary = "그룹 회원 목록", description = "그룹 멤버 리스트 API ")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/{groupPk}/member")
	public ResponseEntity<?> groupMemberList(@PathVariable("groupPk") int groupPk,HttpServletRequest request) {
    	
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
		try {
			Map<String,List<UserDto>> resultMap = new HashMap<String, List<UserDto>>();
			logger.info("group member list - 호출");
			List<UserDto> groupMemberList = groupService.groupMemberList(groupPk);
			int total = groupMemberList.size();
			int position = groupService.checkManager(userPk,groupPk);
			if(position==1||position==2) {
				resultMap.put("Manager", groupMemberList);
				System.out.println(123);
			}
			else {
				resultMap.put("Normal", groupMemberList);
			}
			logger.info("group member list - 호출 성공");
			System.out.println(groupMemberList.toString());
			return new ResponseEntity<Map<String,List<UserDto>>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    

    //     @Operation(summary = "그룹 가입하기", description = "그룹 가입 API ")
    // @PostMapping("/{groupPk}/join")
    // @ApiImplicitParams({
    //     @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    // })
	// public ResponseEntity<?> groupJoin(@PathVariable("groupPk") int groupPk,HttpServletRequest request) throws SQLException  {
    // 	logger.info("group join - 호출");
    // 	System.out.println(groupPk);
    // 	int userPk=0;
    //  	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
	// 		logger.info("사용가능한 토큰입니다");
			
	// 		userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
	// 		logger.info("userPk - " + userPk);
    // 	}
    // 	else {
    // 		logger.info("토큰 실패");
    // 	}
    //  	GroupUserDto guDto = new GroupUserDto();
    //  	guDto.setGroupPk(groupPk);
    //  	guDto.setUserPk(userPk);
    // 	if(groupService.groupJoin(guDto)!=0) {
    // 		logger.info("group-join 성공");
    // 		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    // 	}else
	// 		return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
	// }
        
        @Operation(summary = "그룹 url 가입", description = "그룹 url 가입 API ")
        @PostMapping("/join/{groupUrl}")
        @ApiImplicitParams({
            @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
        })
    	public ResponseEntity<?> groupUrlJoin(@PathVariable("groupUrl") String groupUrl, HttpServletRequest request) throws SQLException  {
        	logger.info("group join - 호출");
        	System.out.println(groupUrl);
        	int userPk=0;
         	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
    			logger.info("사용가능한 토큰입니다");
    			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
    			logger.info("userPk - " + userPk);
        	}
        	else {
        		logger.info("토큰 실패");
        	}
         	
         	GroupDto groupDto = groupService.checkUrl(groupUrl);
         	if(groupDto.getGroupPk()!=0) {
         		logger.info(groupDto.toString());
         	GroupUserDto guDto = new GroupUserDto();
         	guDto.setGroupPk(groupDto.getGroupPk());
         	int groupPk = guDto.getGroupPk();
         	guDto.setUserPk(userPk);
         	logger.info("중복검사 시작");
         	if(groupService.duplicated(userPk,groupPk)!=null) {
         		return new ResponseEntity<String>("이미 가입된 유저입니다", HttpStatus.IM_USED);
         	}
        	if(groupService.groupJoin(guDto)!=0) {
        		logger.info("group-join 성공");
        		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        	}
        }
		return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
     	
        
        }
    
    
    @Operation(summary = "그룹 목록", description = "그룹 리스트")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/list")
    public ResponseEntity<?> groupList(HttpServletRequest request,
    		@RequestParam("nowPage") int nowPage,
			@RequestParam("items") int items,
			@RequestParam("order") String order) throws Exception{
    	logger.info("group list 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	List<GroupListDto> groupList = groupService.getList(userPk,(nowPage - 1) * items, items, order);
    	Map<String,List<GroupListDto>> resultMap = new HashMap<String, List<GroupListDto>>();
    	logger.info("gpList 호출");
    	logger.info(groupList.toString());
    	List<Integer> groupPkList = groupService.gpList(userPk);
    	logger.info(groupPkList.toString());
    	int gc = groupPkList.size();
    	System.out.println(gc);
//    	for(int i=(nowPage-1)*items+1;i<=items*nowPage;i++) {
		for(int i=0;i<items;i++) {
    		if(i>=groupList.size()) {
    			break;
    		}
    		int k =(nowPage-1)*items+i;
	    		System.out.println(k);
    		groupList.get(i).setCnt(k+1);
    		groupList.get(i).setGroupPk(groupPkList.get(k));
    		groupList.get(i).setCount(groupService.countMember(groupPkList.get(k)));
    		groupList.get(i).setCallStartTime(groupService.callStartTime(groupPkList.get(k)));
    		groupList.get(i).setTotal(gc);
    	}
    	resultMap.put("groupList", groupList);
    	
    	return new ResponseEntity<Map<String,List<GroupListDto>>>(resultMap,HttpStatus.OK);
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
    
    @Operation(summary = "그룹 탈퇴하기", description = "그룹 탈퇴하기")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "ACCESS_TOKEN", value = "로그인 성공 후 발급 받은 access_token", required = true, dataType = "String", paramType = "header")
    })
    @PutMapping("/{groupPk}/left")
	public ResponseEntity<?> groupleft(@PathVariable("groupPk") int groupPk, HttpServletRequest request) {
    	int userPk=0;
    	
    	if (jwtTokenProvider.validateToken(request.getHeader("access_token"))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader("access_token"));
			logger.info("userPk - " + userPk);
			try {
				logger.info("group left - 호출");
				groupService.groupLeft(groupPk,userPk);
				logger.info("group left - 호출 성공");
				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
			}
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
    
}
