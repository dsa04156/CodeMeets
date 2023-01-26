package com.hypeboy.codemeets.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QnaDto {

	private int groupQuestionPk;
	private String groupQuestionTitle;
	private String groupQuestionContents;
	private String groupQuestionDate;
	private int groupQuestionUpdate;
	private int groupPk;
	private int userPk;
	
	//join 으로 찾아야하는값
	// like 수
	private int groupQuestionLikeCnt;
	// 회원의 like 유무
	private int groupQuestionLike;
}
