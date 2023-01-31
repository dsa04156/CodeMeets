package com.hypeboy.codemeets.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QnaAnswerDto {

	private int groupQnaAnswerPk;
	private String groupQnaAnswerContents;
	private String groupQnaAnswerDate;
	private int groupQnaAnswerUpdate;
	private int groupQuestionPk;
	private int userPk;

	// like 수
	private int groupQnaAnswerLikeCnt;
	// 회원의 like 유무	
	private int groupQnaAnswerLike;
}
