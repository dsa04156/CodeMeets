package com.hypeboy.codemeets.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.QnaDto;

@Mapper
public interface QnaDao {
	//QNA 작성
	int writeQna(QnaDto qnaDto);
	//QNA 목록
	List<QnaDto> getList(int groupPk, int nowPage, int items);
	//QNA 조회
	QnaDto getQna(int groupQuestionPk, int userPk);
	//QNA 수정
	int modifyQna(QnaDto qnaDto);
	//QNA 삭제
	int deleteQna(int groupQuestionPk);
	//LikeQNA
	int likeQna(QnaDto qnaDto);
	//like 유무 겁사
	int searchLike(QnaDto qnaDto);
	//like 존재 시 삭제
	int deleteLike(QnaDto qnaDto);
}
