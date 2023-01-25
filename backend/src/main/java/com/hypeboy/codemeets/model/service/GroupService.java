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
	
	public List<GroupListDto> getList() throws SQLException;
	
}
