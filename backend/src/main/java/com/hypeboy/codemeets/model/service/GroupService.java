package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import com.hypeboy.codemeets.model.dto.GroupDto;
import com.hypeboy.codemeets.model.dto.GroupListDto;
import com.hypeboy.codemeets.model.dto.GroupUserDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface GroupService {
	int createGroup(GroupDto groupDto) throws SQLException;

	List<UserDto> groupMemberList(int groupPk) throws SQLException;
 
	int groupJoin(GroupUserDto guDto) throws SQLException;
	
//	public List<GroupListDto> getList() throws SQLException;
//	List<GroupListDto> getList(GroupListDto glDto) throws SQLException;

	void createGroupUser(GroupUserDto guDto) throws SQLException;

//	int countMember() throws SQLException;


	int countMember(Integer groupPk) throws SQLException;

	String callStartTime(Integer groupPk) throws SQLException;

	GroupDto groupDetail(int groupPk) throws SQLException;

	void groupModify(GroupDto guDto) throws SQLException;

	List<GroupListDto> getList(int userPk) throws SQLException;

	List<Integer> gpList(int userPk) throws SQLException;

	int countGroup(int userPk) throws SQLException;

	
}	
