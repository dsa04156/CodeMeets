package com.hypeboy.codemeets.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.ConferenceAnswerDto;

@Mapper
public interface ConferenceAnswerDao {
	//회의 질문 답변 작성
	int writeConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception;
	//회의 답변 리스트
	List<ConferenceAnswerDto> getList(int conferenceQuestionPk, int userPk) throws Exception;
	//회의 답변 수정
	int modifyConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception;
	//답변 삭제
	int deleteConferenceAnswer(int conferenceAnswerPk) throws Exception;
	//좋아요 
	int likeConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto);
	//좋아요 확인
	int searchLike(ConferenceAnswerDto conferenceAnswerDto);
	//좋아요 취소
	int deleteLike(ConferenceAnswerDto conferenceAnswerDto);
	
}
