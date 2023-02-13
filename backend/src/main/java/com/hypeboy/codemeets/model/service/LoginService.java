package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface LoginService {
	// 로그인
	public LoginDto login(LoginDto loginDto) throws Exception;
	
	// 로그인한 유저 정보 획득
	public UserDto getUserInfo(int userPk) throws Exception;
	
	// token
	public void saveRefreshToken(int userPk, String refreshToken) throws Exception;
	public String getRefreshToken(int userPk) throws Exception;
	public int deleteRefreshToken(int userPk) throws Exception;

	//social login
    public UserDto findByEmail(String email) throws Exception;
    public int findByEmailPk(String email) throws Exception;
}
