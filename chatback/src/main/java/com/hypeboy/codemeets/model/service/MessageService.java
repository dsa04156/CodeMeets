package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import com.hypeboy.codemeets.model.dto.MessageDto;

public interface MessageService {

	String getNickName(int userPk) throws Exception;

	int countUnread(MessageDto mto) throws Exception;

	String getOtherProfile(MessageDto mto) throws Exception;

	List<MessageDto> messageList(MessageDto messageDto) throws SQLException;

	List<MessageDto> roomContentList(MessageDto messageDto) throws Exception;

	void messageReadChk(MessageDto messageDto) throws Exception;

	int existChat(MessageDto messageDto) throws Exception;

	int maxRoom(MessageDto messageDto) throws Exception;

	String selectRoom(MessageDto messageDto) throws Exception;

	int sendMessage(MessageDto messageDto) throws Exception;

 

}
