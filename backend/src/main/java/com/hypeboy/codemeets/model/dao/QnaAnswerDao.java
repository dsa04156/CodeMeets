package com.hypeboy.codemeets.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.QnaAnswerDto;
import com.hypeboy.codemeets.model.dto.QnaDto;

@Mapper
public interface QnaAnswerDao {
	//QNA 작성
	int writeQnaAnswer(QnaAnswerDto qnaAnswerDto);
	//QNA 목록
	List<QnaAnswerDto> getList(int groupQuestionPk, int userPk, int nowPage, int items);
	//QNA 조회
	QnaAnswerDto getQnaAnswer(int qnaAnswerPk, int userPk);
	//QNA 수정
	int modifyQnaAnswer(QnaAnswerDto qnaAnswerDto);
	//QNA 삭제
	int deleteQnaAnswer(int qnaAnswerPk);
	//LikeQNA
	int likeQnaAnswer(QnaAnswerDto qnaAnswerDto);
	//like 유무 겁사
	int searchLike(QnaAnswerDto qnaAnswerDto);
	//like 존재 시 삭제
	int deleteLike(QnaAnswerDto qnaAnswerDto);
}
