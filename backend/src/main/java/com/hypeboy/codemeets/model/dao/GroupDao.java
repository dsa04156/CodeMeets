package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.GroupDto;
import com.hypeboy.codemeets.model.dto.UserDto;

@Mapper
public interface GroupDao {

	int createGroup(GroupDto groupDto) throws SQLException;

	List<UserDto> groupMemberList(int groupPk) throws SQLException;

	void groupJoin(int groupPk, int userPk) throws SQLException;

}
