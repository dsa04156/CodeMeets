package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;


@Mapper
public interface LoginDao {
	// login
    Optional<LoginDto> findByUserId(String userId) throws SQLException;
    
    // token
    public void saveRefreshToken(Map<String, String> map) throws SQLException;
    public Object getRefreshToken(String userId) throws SQLException;
    public int deleteRefreshToken(int userPk) throws SQLException;
    
    // not use
    public UserDto getUserInfo(String id) throws SQLException;
}