package com.hypeboy.codemeets.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PwFindDao {
	//아이디와 메일 체크
	int pwFind(String userId, String userEmail) throws Exception;
	//아이디를 통해 임시비밀번호 생성 및 변경
	int pwChange(String userId, String newPw) throws Exception;
}
