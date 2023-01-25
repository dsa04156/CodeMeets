package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.GroupDto;
import com.hypeboy.codemeets.model.dto.GroupListDto;
import com.hypeboy.codemeets.model.dto.GroupUserDto;
import com.hypeboy.codemeets.model.dto.UserDto;

@Mapper
public interface GroupDao {

	int createGroup(GroupDto groupDto) throws SQLException;

	List<UserDto> groupMemberList(int groupPk) throws SQLException;

	int groupJoin(GroupUserDto guDto) throws SQLException;

	List<GroupListDto> getList() throws SQLException;

}
