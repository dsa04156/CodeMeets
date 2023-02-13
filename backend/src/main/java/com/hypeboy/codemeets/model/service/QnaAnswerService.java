package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.QnaAnswerDto;


public interface QnaAnswerService {
	//QNA 등록
	int writeQnaAnswer(QnaAnswerDto qnaAnswerDto) throws Exception;
	//QNA 목록 조회
	List<QnaAnswerDto> getList(int groupQuestioonPk, int userPk, int nowPage, int items) throws Exception;
	//QNA 상세 조회
	QnaAnswerDto getQnaAnswer(int qnaAnswerPk, int userPk) throws Exception;
	//QNA 수정
	int modifyQnaAnswer(QnaAnswerDto qnaAnswerDto) throws Exception;
	//QNA 삭제
	int deleteQnaAnswer(int groupQuestionAnswerPk) throws Exception;
	//Like QNA
	int likeQnaAnswer(QnaAnswerDto qnaAnswerDto) throws Exception;
}	
	
