package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.UserDto;

@Mapper
public interface UserDao {
	public List<UserDto> getUserList(String userId) throws SQLException;
	public List<UserDto> getAllUserList() throws SQLException;
	public void registUser(UserDto userDto) throws SQLException;
	public void registUserInfo(UserDto userDto) throws SQLException;
	public int getUserIdOverlap(String userId) throws SQLException;
	public int getUserTelOverlap(String userId) throws SQLException;
	public int getUserEmailOverlap(String userId) throws SQLException;
	public String searchIdFromEmail(String data) throws SQLException;
	public String searchIdFromTel(String data) throws SQLException;
}
