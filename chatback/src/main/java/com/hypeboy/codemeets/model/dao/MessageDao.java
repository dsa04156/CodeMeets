package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.MessageDto;

@Mapper
public interface MessageDao {

	String getNickName(int userPk) throws SQLException;

	List<MessageDto> messageList(MessageDto messageDto) throws SQLException;

	int countUnread(MessageDto mto) throws SQLException;

	String getOtherProfile(MessageDto mto) throws SQLException;

	List<MessageDto> roomContentList(MessageDto messageDto) throws SQLException;

	void messageReadChk(MessageDto messageDto) throws SQLException;

	int existChat(MessageDto messageDto) throws SQLException;

	int maxRoom(MessageDto messageDto) throws SQLException;

	String selectRoom(MessageDto messageDto) throws SQLException;

	int sendMessage(MessageDto messageDto) throws SQLException;

	int createRoom(MessageDto messageDto) throws SQLException;

}
