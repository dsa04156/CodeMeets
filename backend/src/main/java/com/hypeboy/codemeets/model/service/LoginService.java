package com.hypeboy.codemeets.model.service;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface LoginService {
	// 로그인
	public LoginDto login(LoginDto loginDto) throws Exception;
	
	// 로그인한 유저 정보 획득
	public UserDto getUserInfo(int userPk) throws Exception;
	
	// token
	public void saveRefreshToken(String userid, String refreshToken) throws Exception;
	public Object getRefreshToken(int userPk) throws Exception;
	public int deleteRefreshToken(int userPk) throws Exception;

}
