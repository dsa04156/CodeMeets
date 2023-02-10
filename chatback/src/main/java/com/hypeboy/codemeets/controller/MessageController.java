package com.hypeboy.codemeets.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.MessageDto;
import com.hypeboy.codemeets.model.service.GroupServiceImpl;
import com.hypeboy.codemeets.model.service.MessageService;
import com.hypeboy.codemeets.model.service.MessageServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Controller
@RequestMapping("/api/message")
@Api(tags = "채팅")
public class MessageController {
	private final Logger logger = LoggerFactory.getLogger(GroupController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
    @Value("${jwt.access-token}")
    private String accessToken;

    
	@Autowired
	private MessageServiceImpl messageService;
	
	@Operation(summary = "메세지 목록", description = "메세지 목록 API ")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping(value = "/list")
	public ResponseEntity<?> listMessage(HttpServletRequest request) throws Exception {
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
			String nick = messageService.getNickName(userPk);
			logger.info(nick);
			MessageDto messageDto = new MessageDto();
			messageDto.setNick(nick);
			messageDto.setUserPk(userPk);
			List<MessageDto> list = messageService.messageList(messageDto);
			for(MessageDto mto : list) {
				mto.setNick(nick);
				int unread = messageService.countUnread(mto);
				String profilePhoto = messageService.getOtherProfile(mto);
				System.out.println(profilePhoto);
				mto.setSendNick(messageService.getNickName(mto.getSendPk()));
				mto.setRecvNick(messageService.getNickName(mto.getRecvPk()));
				mto.setUnread(unread);
				mto.setProfilePhoto(profilePhoto);
				if(nick.contentEquals(mto.getSendNick())) {
					mto.setOther_nick(mto.getRecvNick());
				}else {
					mto.setOther_nick(mto.getSendNick());
				}
			}
			System.out.println(list.toString());
			return new ResponseEntity<List>(list, HttpStatus.OK);
		}catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<String>(FAIL,HttpStatus.INTERNAL_SERVER_ERROR);
	}
		
	}
	
	@Operation(summary = "방별 메세지 목록", description = "방별 메세지 목록 API ")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/messagecontentlist")
	public ResponseEntity<?> messageContentList(HttpServletRequest request,@RequestParam int room) {
		int userPk=0;
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("토큰 실패");
    	}
		String nick;
		try {
			nick = messageService.getNickName(userPk);
		
		MessageDto messageDto = new MessageDto();
		messageDto.setRoom(room);
		messageDto.setNick(nick);
		System.out.println(room);
		List<MessageDto> list = messageService.roomContentList(messageDto);
		messageService.messageReadChk(messageDto);
		for(MessageDto mdt : list) {
			System.out.println(mdt.getSendPk());
			mdt.setSendNick(messageService.getNickName(mdt.getSendPk()));
			mdt.setRecvNick(messageService.getNickName(mdt.getRecvPk()));
		}
		System.out.println(messageDto.getRoom());
		
		return new ResponseEntity<List>(list, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<String>(FAIL,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@Operation(summary = "메세지리스트에서 메세지 보내기", description = "메세지보내기 API ")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@PostMapping("/send")
	public ResponseEntity<?> sendMessage(HttpServletRequest request,@RequestParam(defaultValue = "0", required = false) int room,@RequestParam int otherPk, @RequestParam String content) {
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
			String nick = messageService.getNickName(userPk);
		
			MessageDto messageDto = new MessageDto();
			messageDto.setRoom(room);
			messageDto.setNick(nick);
			messageDto.setSendNick(nick);
			messageDto.setSendPk(userPk);
			messageDto.setOtherPk(otherPk);
			messageDto.setContent(content);
			messageDto.setRecvPk(otherPk);
			messageDto.setRecvNick(messageService.getNickName(otherPk));
			messageDto.setOther_nick(messageService.getNickName(otherPk));
			
			if(messageDto.getRoom()==0) {
				int exist_chat = messageService.existChat(messageDto);
				System.out.println(exist_chat);
				if(exist_chat==0) {
					int max_room = messageService.maxRoom(messageDto);
					messageDto.setRoom(max_room+1);
				}else {
					room = Integer.parseInt(messageService.selectRoom(messageDto));
					messageDto.setRoom(room);
				}
			}
			int flag = messageService.sendMessage(messageDto);
			System.out.println(flag);
			System.out.println();
			return new ResponseEntity<Integer>(flag, HttpStatus.OK);
			} catch (Exception e) {
				System.out.println(e);
				return new ResponseEntity<String>(FAIL,HttpStatus.BAD_REQUEST);
			}
	}
	
}
