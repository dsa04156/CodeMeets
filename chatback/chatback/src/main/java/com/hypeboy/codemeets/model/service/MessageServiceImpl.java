package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.GroupDao;
import com.hypeboy.codemeets.model.dao.MessageDao;
import com.hypeboy.codemeets.model.dto.MessageDto;

@Service
public class MessageServiceImpl implements MessageService {
private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	private MessageDao dao;
	
	@Autowired
	public MessageServiceImpl(MessageDao dao) {
		super();
		this.dao = dao;
	}
	
	@Override
	public List<MessageDto> messageList(MessageDto messageDto) throws SQLException {
		return dao.messageList(messageDto);
	}

	@Override
	public String getNickName(int userPk) throws Exception {
		return dao.getNickName(userPk);
	}

	@Override
	public int countUnread(MessageDto mto) throws Exception {
		return dao.countUnread(mto);
	}

	@Override
	public String getOtherProfile(MessageDto mto) throws Exception {
		return dao.getOtherProfile(mto);
	}

	@Override
	public List<MessageDto> roomContentList(MessageDto messageDto) throws SQLException {
		return dao.roomContentList(messageDto);
	}

	@Override
	public void messageReadChk(MessageDto messageDto) throws Exception {
		dao.messageReadChk(messageDto);
	}

	@Override
	public int existChat(MessageDto messageDto) throws Exception {
		return dao.existChat(messageDto);
	}

	@Override
	public int maxRoom(MessageDto messageDto) throws Exception {
		return dao.maxRoom(messageDto);
		}

	@Override
	public String selectRoom(MessageDto messageDto) throws Exception {
		return dao.selectRoom(messageDto);
	}

	@Override
	public int sendMessage(MessageDto messageDto) throws Exception{
		return dao.sendMessage(messageDto);
	}





	
}
