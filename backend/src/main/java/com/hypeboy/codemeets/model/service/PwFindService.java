package com.hypeboy.codemeets.model.service;

public interface PwFindService {

	//아이디, 이메일 매치 확인
	int pwFind(String userId, String userEmail) throws Exception;
	//이메일로 메일 보내기
	int pwSend(String userId, String userEmail) throws Exception;
}
