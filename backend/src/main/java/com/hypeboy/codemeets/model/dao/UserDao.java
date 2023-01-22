package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.UserDto;

@Mapper
public interface UserDao {
	// 개발용 기능
	// 특정 유저 확인
	public List<UserDto> getUserList(String userId) throws SQLException;
	// 모든 유저 목록 확인
	public List<UserDto> getAllUserList() throws SQLException;
	
	// 회원가입
	public void registUser(UserDto userDto) throws SQLException;
	public void registUserInfo(UserDto userDto) throws SQLException;
	
	// 중복검사
	public int getUserIdOverlap(String userId) throws SQLException;
	public int getUserTelOverlap(String userId) throws SQLException;
	public int getUserEmailOverlap(String userId) throws SQLException;
	
	// ID 찾기
	public String searchIdFromEmail(String data) throws SQLException;
	public String searchIdFromTel(String data) throws SQLException;
	
	// PW 수정
	public int forgotPwFromEmail(String userId, String data) throws SQLException;
	public int forgotPwFromTel(String userId, String data) throws SQLException;
	public int editPw(String userId, String password) throws SQLException;
	
	// myProfile 정보 획득
	public UserDto getMyProfile(String userPk) throws SQLException;
	
	// myProfile 정보 수정
	public int editMyProfile(UserDto userDto) throws SQLException;
	
	// 회원탈퇴
	public int resign(int userPk) throws SQLException;
	
}
