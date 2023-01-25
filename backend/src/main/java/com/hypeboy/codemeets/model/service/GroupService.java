package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import com.hypeboy.codemeets.model.dto.GroupDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface GroupService {
	int createGroup(GroupDto groupDto) throws SQLException;

	List<UserDto> groupMemberList(int groupPk) throws SQLException;

	void groupJoin(int groupPk,int userPk) throws SQLException;
}
