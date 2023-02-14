package com.hypeboy.codemeets.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

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

import com.hypeboy.codemeets.model.dto.MessageDto;
import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.MessageServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;

@Controller
@RequestMapping("/api/message")
@Api(tags = "채팅")
public class MessageController {
	private final Logger logger = LoggerFactory.getLogger(MessageController.class);

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
				mto.setUnread(unread);
				mto.setSendNick(messageService.getNickName(mto.getSendPk()));
				mto.setRecvNick(messageService.getNickName(mto.getRecvPk()));
				mto.setOtherPk(mto.getRecvPk() == userPk ? mto.getSendPk() : mto.getRecvPk());
				String profilePhoto = messageService.getOtherProfile(mto.getOtherPk());
				mto.setProfilePhoto(profilePhoto);
				
				if(nick.contentEquals(mto.getSendNick())) {
					mto.setOther_nick(mto.getRecvNick());
				}else {
					mto.setOther_nick(mto.getSendNick());
				}
			}

			return new ResponseEntity<List>(list, HttpStatus.OK);
		}catch (Exception e) {
			logger.info(e.toString());

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
//		System.out.println(room);
		List<MessageDto> list = messageService.roomContentList(messageDto);
		messageService.messageReadChk(messageDto);
		for(MessageDto mdt : list) {
//			System.out.println(mdt.getSendPk());
			mdt.setSendNick(messageService.getNickName(mdt.getSendPk()));
			mdt.setRecvNick(messageService.getNickName(mdt.getRecvPk()));
		}
//		System.out.println(messageDto.getRoom());
		
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
		logger.info(content);
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
	
	@Operation(summary = "유저 리스트 조회", description = "채팅 추가할 유저 목록 조회 "
			+ " \n 닉네임으로 찾고 이메일, 프로필사진으로 비교")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "AccessToken", value = "로그인 성공 후 발급 받은 AccessToken", required = true, dataType = "String", paramType = "header")
    })
	@GetMapping("/search-user")
	public ResponseEntity<?> searchUser(HttpServletRequest request, @RequestParam String nickname) {
		logger.info("searchUser 실행");
		
		int userPk = 0;
		
		if (jwtTokenProvider.validateToken(request.getHeader(accessToken))) {
			logger.info("사용가능한 토큰입니다");
			
			userPk = jwtTokenProvider.getUserPk(request.getHeader(accessToken));
			
			logger.info("userPk - " + userPk);
    	}
    	else {
    		logger.info("사용불가능한 토큰입니다");
			
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
    	}
		
		try {
			List<UserDto> userDto = messageService.searchUser(nickname, userPk);
			
			if (userDto != null) {
				for (UserDto user : userDto) {
					if (user.getEmailPublic() == 0) {
						user.setEmail("비공개");
					}
				}
			}
			
			logger.info("유저 조회 성공");

			return new ResponseEntity<List<UserDto>>(userDto, HttpStatus.OK);
		} catch (Exception e) {
			logger.info("searchUser fail - " + e);
				
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@Operation(summary = "채팅방 번호 획득", description = "생성할 채팅방의 유니크한 번호 얻기")
	@GetMapping("/room-no")
	public ResponseEntity<?> getRoomNo() {
		logger.info("getRoomNo 실행");
		
		int roomNo = 0;
		
		try {
			boolean uniqueOk = false;
			
			while(!uniqueOk) {
				// 1에서 10000사이의 값 생성
				roomNo =  (int) (Math.random() * 10000 + 1);
				logger.info(String.valueOf(roomNo));
				
				if (messageService.checkRoomNo(roomNo) == 0) {
					uniqueOk = true;
				}
			}
			logger.info("getRoomNo success");

			return new ResponseEntity<Integer>(roomNo, HttpStatus.OK);
		} catch (Exception e) {
			logger.info("getRoomNo fail - " + e);
				
			return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
