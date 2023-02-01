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

	List<GroupListDto> getList(int userPk) throws SQLException;

	void createGroupUser(GroupUserDto guDto) throws SQLException ;

	int countMember(Integer groupPk) throws SQLException;

	int countGroup(int userPk) throws SQLException;

	List<Integer> gpList(int userPk) throws SQLException;

	String callStartTime(Integer groupPk) throws SQLException;

	GroupDto groupDetail(int groupPk) throws SQLException;

	void groupModify(GroupDto groupDto) throws SQLException;

	void groupDelete(int groupPk);

	GroupDto checkUrl(String groupUrl);

	Integer duplicated(int userPk, int groupPk);

}
