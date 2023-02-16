package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.MessageDto;
import com.hypeboy.codemeets.model.dto.UserDto;

@Mapper
public interface MessageDao {

	String getNickName(int userPk) throws SQLException;

	List<MessageDto> messageList(MessageDto messageDto) throws SQLException;

	int countUnread(MessageDto mto) throws SQLException;

	String getOtherProfile(int otherPk) throws SQLException;

	List<MessageDto> roomContentList(MessageDto messageDto) throws SQLException;

	void messageReadChk(MessageDto messageDto) throws SQLException;

	int existChat(MessageDto messageDto) throws SQLException;

	int maxRoom(MessageDto messageDto) throws SQLException;

	String selectRoom(MessageDto messageDto) throws SQLException;

	int sendMessage(MessageDto messageDto) throws SQLException;
	
	// 채팅방에 추가할 유저 리스트 조회
	List<UserDto> searchUser(String nickname, int userPk) throws SQLException;
	
	// 생성한 방 번호가 사용중인지 확인
	int checkRoomNo(int roomNo) throws SQLException;
}
