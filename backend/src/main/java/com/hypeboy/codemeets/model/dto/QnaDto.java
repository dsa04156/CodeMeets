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
	
}
