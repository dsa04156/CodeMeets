package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.QnaDto;

public interface QnaService {
	//QNA 등록
	int writeQna(QnaDto qnaDto) throws Exception;
	//QNA 목록 조회
	List<QnaDto> getList(int groupPK) throws Exception;
	//QNA 상세 조회
	QnaDto getQna(int groupQuestionPk) throws Exception;
	//QNA 수정
	int modifyQna(QnaDto qnaDto) throws Exception;
	//QNA 삭제
	int deleteQna(int groupQuestionPk) throws Exception;
	//QNA 좋아요
	int likeQna(int groupQuestionPk) throws Exception;
}	
	
