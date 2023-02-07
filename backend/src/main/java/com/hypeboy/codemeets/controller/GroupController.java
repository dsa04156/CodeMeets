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
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping(value="/api/group",produces="application/json;charset=UTF-8")
@Api(tags = "그룹 API")
public class GroupController {
	private final Logger logger = LoggerFactory.getLogger(GroupController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	GroupServiceImpl groupService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
    @Value("${jwt.access-token}")
    private String accessToken;

    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    

      @Operation(summary = "그룹 만들기 버튼 클릭", description = "그룹 만들기 버튼 클릭 API ")
    @PostMapping("/click")
	public ResponseEntity<?> clickCreateGroup(HttpServletRequest request) throws Exception {
			logger.info("click create group - 호출");
			//그룹 리스트 마이 그룹 리스트 만들기
			logger.info("난수 생성");
			String url = request.getRequestURL().toString().replace(request.getRequestURI(), "");
			String r = RandomStringUtils.randomAlphanumeric(10);
			url = url + "/api/group/join/"+r;
			List<String> list = new ArrayList<String>();
			list.add(url);
			list.add(r);
	
			return new ResponseEntity<List>(list, HttpStatus.OK);
	}
    
    
    @Operation(summary = "그룹 만들기", description = "그룹 만들기 API "
    		+ " \n group_Pk값은 제외해주세요"
    		+ "\n manager_id 값은 회원 pk 번호입니다 ")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @PostMapping("/create")
	public ResponseEntity<?> regist(@RequestBody @ApiParam(value="그룹 만들기",required = true) GroupDto groupDto,HttpServletRequest request) throws Exception {
			logger.info("create group - 호출");
			GroupUserDto guDto = new GroupUserDto();
			int userPk=0;
			if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
				logger.info("사용가능한 토큰입니다");
				userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
				logger.info("userPk - " + userPk);
	    	}
	    	else {
	    		logger.info("토큰 실패");
	    	}
			logger.info("난수 생성");
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
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/{groupPk}/member")
	public ResponseEntity<?> groupMemberList(@PathVariable("groupPk") int groupPk,HttpServletRequest request) {
    	
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
		try {
			Map<String,Object> resultMap = new HashMap<String, Object>();
			logger.info("group member list - 호출");
			List<UserDto> groupMemberList = groupService.groupMemberList(groupPk);
			int total = groupMemberList.size();
			System.out.println(groupMemberList.toString());
			int position = groupService.checkManager(userPk,groupPk);
			resultMap.put("position", position);
			resultMap.put("List", groupMemberList);
		
			logger.info("group member list - 호출 성공");
			System.out.println(groupMemberList.toString());
			return new ResponseEntity<Map<String,Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    

//        @Operation(summary = "그룹 가입하기", description = "그룹 가입 API ")
//    @PostMapping("/{groupPk}/join")
//    @ApiImplicitParams({
//        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
//    })
//	public ResponseEntity<?> groupJoin(@PathVariable("groupPk") int groupPk,HttpServletRequest request) throws SQLException  {
//    	logger.info("group join - 호출");
//    	System.out.println(groupPk);
//    	int userPk=0;
//     	if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
//			logger.info("사용가능한 토큰입니다");
//			
//			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
//			logger.info("userPk - " + userPk);
//    	}
//    	else {
//    		logger.info("토큰 실패");
//    	}
//     	GroupUserDto guDto = new GroupUserDto();
//     	guDto.setGroupPk(groupPk);
//     	guDto.setUserPk(userPk);
//    	if(groupService.groupJoin(guDto)!=0) {
//    		logger.info("group-join 성공");
//    		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
//    	}else
//			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
//	}
        
         @Operation(summary = "그룹 url 가입", description = "그룹 url 가입 API ")
        @GetMapping("/join/{groupUrl}")
        @ApiImplicitParams({
            @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
        })
    	public ResponseEntity<?> groupUrlJoin(@PathVariable("groupUrl") String groupUrl, HttpServletRequest request) throws SQLException  {
        	logger.info("group join - 호출");
        	System.out.println(groupUrl);
        	int userPk=0;
         	if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
    			logger.info("사용가능한 토큰입니다");
    			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
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
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @GetMapping("/list")
    public ResponseEntity<?> groupList(HttpServletRequest request,
    		@RequestParam("nowPage") int nowPage,
			@RequestParam("items") int items,
			@RequestParam("order") String order) throws Exception{
    	logger.info("group list 호출");
    	int userPk=0;
    	if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
    	List<GroupListDto> groupList = groupService.getList(userPk,(nowPage - 1) * items, items, order);
    	Map<String,List<GroupListDto>> resultMap = new HashMap<String, List<GroupListDto>>();
    	logger.info("gpList 호출");
    	List<Integer> groupPkList = groupService.gpList(userPk);
    	logger.info(groupList.toString());
//    	groupPkList.remove(0);
    	logger.info(groupPkList.toString());
    	int gc = groupPkList.size();
    	System.out.println(gc);
//    	for(int i=(nowPage-1)*items+1;i<=items*nowPage;i++) {
		for(int i=0;i<items;i++) {
    		if(i>=groupList.size()) {
    			break;
    		}
    		int k =(nowPage-1)*items+i;
    		groupList.get(i).setCnt(k+1);
    		groupList.get(i).setGroupPk(groupPkList.get(k));
    		groupList.get(i).setCount(groupService.countMember(groupPkList.get(k)));
    		groupList.get(i).setCallStartTime(groupService.callStartTime(groupPkList.get(k)));
    		groupList.get(i).setTotal(gc);
    	}
		for(int i=0;i<groupList.size();i++) {
			if(groupList.get(i).getGroupPk()==0) {
				groupList.remove(i);
				System.out.println("지원ㅅ다"+i);
				break;
			}
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
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
    @PutMapping("/{groupPk}/left")
	public ResponseEntity<?> groupleft(@PathVariable("groupPk") int groupPk, HttpServletRequest request) {
    	int userPk=0;
    	
    	if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
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
