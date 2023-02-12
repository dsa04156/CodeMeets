package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.ConferenceGroupDto;
import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;
import com.hypeboy.codemeets.model.dto.UserDto;

@Mapper
public interface UserDao {
	// 개발용 API
	public List<UserDto> devGetUserInfo(String userId) throws SQLException;
	public List<UserDto> devGetUserInfoAllList() throws SQLException;
	
	// 회원가입
	public void registUser(UserDto userDto) throws SQLException;
	public void registUserInfo(UserDto userDto) throws SQLException;

	// 유저 중복검사
	public int getUserIdOverlap(String userId) throws SQLException;
	public int getUserTelOverlap(String userId) throws SQLException;
	public int getUserEmailOverlap(String userId) throws SQLException;

	// ID 찾기
	public String searchIdFromEmail(String data) throws SQLException;
	public String searchIdFromTel(String data) throws SQLException;
	
	// PW 찾기 및 수정
	public int forgotPwFromEmail(String userId, String data) throws SQLException;
	public int forgotPwFromTel(String userId, String data) throws SQLException;
	public int editPw(String userId, String password) throws SQLException;

	// myProfile 조회
	public UserDto getMyProfile(int userPk) throws SQLException;
	
	// myProfile 수정
	public int editMyProfile(UserDto userDto) throws SQLException;

	// 다른 유저 조회
	public List<UserDto> getUserInfoList(String userPkList) throws SQLException;

	// 자신의 회의 참석 기록 조회
	public List<ConferenceGroupDto> getMyConferenceRecord(int nowPage, int items, int userPk) throws SQLException;
	public List<ConferenceGroupDto> getMyConferenceRecordFilter(int nowPage, int items, int userPk, int groupPk) throws SQLException;
	
	// 자신의 질문 목록 조회
	public List<ConferenceQuestionDto> getMyQuestionRecord(int nowPage, int items, int userPk) throws SQLException;
	
	// 회원탈퇴
	public int resign(int userPk) throws SQLException;
	
	// 그룹가입
	public void registGroup(UserDto userDto) throws SQLException;
	
}
