package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;

public interface ConferenceQuestionService {

	//질문 등록
	int writeConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto) throws Exception;
	//질문 목록 조회
	List<ConferenceQuestionDto> getList(int conferencePk, int userPk) throws Exception;
	//질문 상세조회
	ConferenceQuestionDto getConferenceQuestion(int conferenceQuestionPk, int userPk) throws Exception;
	//질문 수정
	int modifyConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto) throws Exception;
	//질문 삭제
	int deleteConferenceQuestion(int conferenceQuestionPk) throws Exception;
	//질문 좋아요
	int likeConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto) throws Exception;

	List<ConferenceQuestionDto> pageList(int conferencePk, int userPk, int nowPage, int items) throws Exception;
}
