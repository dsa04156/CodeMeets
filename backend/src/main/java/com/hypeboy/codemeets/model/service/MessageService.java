package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import com.hypeboy.codemeets.model.dto.MessageDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface MessageService {

	String getNickName(int userPk) throws Exception;

	int countUnread(MessageDto mto) throws Exception;

	String getOtherProfile(int otherPk) throws Exception;

	List<MessageDto> messageList(MessageDto messageDto) throws SQLException;

	List<MessageDto> roomContentList(MessageDto messageDto) throws Exception;

	void messageReadChk(MessageDto messageDto) throws Exception;

	int existChat(MessageDto messageDto) throws Exception;

	int maxRoom(MessageDto messageDto) throws Exception;

	String selectRoom(MessageDto messageDto) throws Exception;

	int sendMessage(MessageDto messageDto) throws Exception;
	
	// 채팅방에 추가할 유저 리스트 조회
	List<UserDto> searchUser(String nickname, int userPk) throws Exception;
	
	// 생성한 방 번호가 사용중인지 확인
	int checkRoomNo(int roomNo) throws Exception;

 

}
