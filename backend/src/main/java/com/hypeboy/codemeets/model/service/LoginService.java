package com.hypeboy.codemeets.model.service;

import com.hypeboy.codemeets.model.dto.LoginDto;

public interface LoginService {
	public String login(LoginDto loginDto) throws Exception;
}
