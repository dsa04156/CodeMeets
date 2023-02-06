package com.hypeboy.codemeets.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;

@Mapper
public interface ConferenceQuestionDao {
	//질문 작성
	int writeConferenceQuestion(ConferenceQuestionDto ConferenceQuestionDto);
	//질문 목록
	List<ConferenceQuestionDto> getList(int conferencePk, int userPk);
	//질문 조회
	ConferenceQuestionDto getConferenceQuestion(int conferenceQuestionPk, int userPk);
	//질문 수정하기
	int modifyConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto);
	//질문 삭제
	int deleteConferenceQuestion(int conferenceQuestionPk);
	//질문 좋아요
	int likeConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto);
	//질문 좋아요 유무 검사
	int searchLike(ConferenceQuestionDto conferenceQuestionDto);
	//질문 좋아요시 삭제
	int deleteLike(ConferenceQuestionDto conferenceQuestionDto);
	
	List<ConferenceQuestionDto> pageList(int conferencePk, int userPk, int nowPage, int items);
}
