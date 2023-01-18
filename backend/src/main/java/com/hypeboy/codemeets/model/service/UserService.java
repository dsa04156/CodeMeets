package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import com.hypeboy.codemeets.model.dto.UserDto;

public interface UserService {
	public List<UserDto> getUserList(int userPk) throws Exception;
	public void registUser(UserDto userDto) throws Exception;
	public void registUserInfo(UserDto userDto) throws Exception;
	public int getUserIdOverlap(String userId) throws SQLException;
	public int getUserTelOverlap(String userId) throws SQLException;
	public int getUserEmailOverlap(String userId) throws SQLException;
}
