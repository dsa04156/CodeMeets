package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.ConferenceGroupDto;
import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;
import com.hypeboy.codemeets.model.dto.UserDto;

public interface UserService {
	// 개발용 API
	public List<UserDto> devGetUserInfo(String userId) throws Exception;
	public List<UserDto> devGetUserInfoAllList() throws Exception;
	
	// 회원가입
	public void registUser(UserDto userDto) throws Exception;
	
	// 유저 중복검사
	public int getUserIdOverlap(String userId) throws Exception;
	public int getUserTelOverlap(String userId) throws Exception;
	public int getUserEmailOverlap(String userId) throws Exception;
	
	// ID 찾기, PW 찾기 및 수정
	public String searchId(String type, String data) throws Exception;
	public int forgotPw(String userId, String type, String data) throws Exception;
	public boolean editPw(String userId, String password) throws Exception;
	
	// myProfile 조회
	public UserDto getMyProfile(int userPk) throws Exception;
	
	// myProfile 수정
	public int editMyProfile(UserDto userDto) throws Exception;

	// 다른 유저 조회
	public List<UserDto> getUserInfoList(String userPkList) throws Exception;
	
	// 자신의 회의 참석 기록 조회
	public List<ConferenceGroupDto> getMyConferenceRecord(int nowPage, int items, int userPk) throws Exception;
	public List<ConferenceGroupDto> getMyConferenceRecordFilter(int nowPage, int items, int userPk, int groupPk) throws Exception;
	
	// 자신의 질문 목록 조회
	public List<ConferenceQuestionDto> getMyQuestionRecord(int nowPage, int items, int userPk) throws Exception;
	
	// 회원탈퇴
	public int resign(int userPk) throws Exception;
	
}
