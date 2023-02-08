package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;


@Mapper
public interface LoginDao {
	// 로그인
    Optional<LoginDto> findByUserId(String userId) throws SQLException;
    
    // 로그인한 유저 정보 획득
    public UserDto getUserInfo(int userPk) throws SQLException;
    
    // 소셜 로그인용
    // 이름으로 유저 찾기
    public UserDto findByUserName(String userName) throws SQLException;
    // 이메일로 유저 찾기
    public UserDto findByEmail(String email) throws SQLException;
    public int findByEmailPk(String email) throws SQLException;
    
    
    // token
    public void saveRefreshToken(int userPk, String refreshToken) throws SQLException;
    public Object getRefreshToken(int userPk) throws SQLException;
    public int deleteRefreshToken(int userPk) throws SQLException;

}