package com.hypeboy.codemeets.model.service;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface LoginService {
	public UserDto login(LoginDto loginDto) throws Exception;
	public void saveRefreshToken(String userid, String refreshToken) throws Exception;
}
