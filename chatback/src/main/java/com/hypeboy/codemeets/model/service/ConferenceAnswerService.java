package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.ConferenceAnswerDto;

public interface ConferenceAnswerService {
	//회의 질문 답변 작성
	int writeConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception;
	//답변 리스트
	List<ConferenceAnswerDto> getList(int conferenceQuestionPk, int userPk) throws Exception;
	//답변 수정
	int modifyConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception;
	//답변 삭제
	int deleteConferenceAnswer(int conferenceAnswerPk) throws Exception;
	//좋아요
	int likeConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception;
	
	
}
