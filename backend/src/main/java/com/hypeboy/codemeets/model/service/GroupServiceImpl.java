package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.model.dao.GroupDao;
import com.hypeboy.codemeets.model.dto.GroupDto;
import com.hypeboy.codemeets.model.dto.UserDto;

@Service
public class GroupServiceImpl implements GroupService {
	
	private GroupDao dao;
	
	@Autowired
	public GroupServiceImpl(GroupDao dao) {
		super();
		this.dao = dao;
	}

	@Override
	public void createGroup(GroupDto groupDto) throws SQLException {
		dao.createGroup(groupDto);
	}

	@Override
	public List<UserDto> groupMemberList(int groupPk) throws SQLException {
		return dao.groupMemberList(groupPk);
	}

	@Override
	public void groupJoin(int groupPk,int userPk) throws SQLException {
		dao.groupJoin(groupPk,userPk);
	}
	

}
