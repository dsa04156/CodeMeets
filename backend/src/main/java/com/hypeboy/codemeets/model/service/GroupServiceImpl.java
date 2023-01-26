package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.GroupDao;
import com.hypeboy.codemeets.model.dto.GroupDto;
import com.hypeboy.codemeets.model.dto.GroupListDto;
import com.hypeboy.codemeets.model.dto.GroupUserDto;
import com.hypeboy.codemeets.model.dto.UserDto;

import lombok.RequiredArgsConstructor;

@Service
public class GroupServiceImpl implements GroupService {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	private GroupDao dao;
	
	@Autowired
	public GroupServiceImpl(GroupDao dao) {
		super();
		this.dao = dao;
	}
	
	

	@Override
	public int createGroup(GroupDto groupDto) throws SQLException {
		return dao.createGroup(groupDto);
	}

	@Override
	public List<UserDto> groupMemberList(int groupPk) throws SQLException {
		return dao.groupMemberList(groupPk);
	}

	@Override
	public int groupJoin(GroupUserDto guDto) throws SQLException  {
		return dao.groupJoin(guDto);
}


	@Override
	public List<GroupListDto> getList() throws SQLException {
		return dao.getList();
	}


	@Override
	public void createGroupUser(GroupUserDto guDto) throws SQLException {
		dao.createGroupUser(guDto);
	}


	@Override
	public int countMember(Integer groupPk) throws SQLException {
		return dao.countMember(groupPk);
	}


	@Override
	public int countGroup() throws SQLException {
		return dao.countGroup();//그룹 몇개?
	}


	@Override
	public List<Integer> gpList() throws SQLException{
		// TODO Auto-generated method stub
		return dao.gpList();
	}


	@Override
	public String callStartTime(Integer groupPk) throws SQLException {
		return dao.callStartTime(groupPk);
	}



	

}
