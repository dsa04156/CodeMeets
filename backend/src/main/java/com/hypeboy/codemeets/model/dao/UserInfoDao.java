package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.UserInfoDto;

@Mapper
public interface UserInfoDao {
	public List<UserInfoDto> getUserInfoList(int userPk) throws SQLException;
}
