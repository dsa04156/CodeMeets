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
	public List<GroupListDto> getList(int userPk) throws SQLException {
		return dao.getList(userPk);
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
	public int countGroup(int userPk) throws SQLException {
		return dao.countGroup(userPk);//그룹 몇개?
	}


	@Override
	public List<Integer> gpList(int userPk) throws SQLException{
		return dao.gpList(userPk);
	}


	@Override
	public String callStartTime(Integer groupPk) throws SQLException {
		return dao.callStartTime(groupPk);
	}


	@Override
	public GroupDto groupDetail(int groupPk) throws SQLException {
		return dao.groupDetail(groupPk);
	}


	@Override
	public void groupModify(GroupDto groupDto) throws SQLException {
		dao.groupModify(groupDto);
	}


	@Override
	public void groupDelete(int groupPk) throws SQLException {
		dao.groupDelete(groupPk);
	}



	

}
