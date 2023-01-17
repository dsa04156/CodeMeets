package com.hypeboy.codemeets.model.dao;

import java.util.List;

import com.hypeboy.codemeets.model.dto.QnaDto;

public interface QnaDao {
	//QNA 작성
	int writeQna(QnaDto qnaDto);
	//QNA 목록
	List<QnaDto> getList(int groupPk);
	//QNA 조회
	QnaDto getQna(int groupQuestionPk);
	//QNA 수정
	int modifyQna(QnaDto qnaDto);
	//QNA 삭제
	int deleteQna(int groupQuestionPk);
}
