package com.hypeboy.codemeets.model.service;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface LoginService {
	// login
	public LoginDto login(LoginDto loginDto) throws Exception;
	
	// token
	public void saveRefreshToken(String userid, String refreshToken) throws Exception;
	public Object getRefreshToken(String userId) throws Exception;
	public int deleteRefreshToken(int userPk) throws Exception;
	
	// not use
	public UserDto getUserInfo(String id) throws Exception;
}
