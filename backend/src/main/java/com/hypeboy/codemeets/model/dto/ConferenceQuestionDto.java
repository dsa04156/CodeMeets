package com.hypeboy.codemeets.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ConferenceQuestionDto {
	private int conferenceQuestionPk;
	private String conferenceQuestionContents;
	private String conferenceQuestionDate;
	private int conferenceQuestionUpdate;
	private int conferencePk;
	private int groupPk;
	private int userPk;
	
	// 질문에 달린 답글 수
	private int answerCnt;
	
	// 질문의 like 수
	private int conference_question_like_cnt;
		
	// 유저의 like 여부
	private int conference_question_like;
	
	// 결과 총 개수
	private int total;
}
