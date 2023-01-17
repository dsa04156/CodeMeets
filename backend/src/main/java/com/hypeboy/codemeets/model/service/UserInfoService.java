package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.UserInfoDto;

public interface UserInfoService {
	public List<UserInfoDto> getUserInfoList(int userPk) throws Exception;
}
