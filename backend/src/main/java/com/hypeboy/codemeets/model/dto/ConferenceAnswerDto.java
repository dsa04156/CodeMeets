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
public class ConferenceAnswerDto {
	private int conferenceAnswerPk;
	private String conferenceAnswerContents;
	private String conferenceAnswerDate;
	private int conferenceAnswerUpdate;
	private int conferenceQuestionPk;
	private int userPk;
	
	// 질문의 like 수
	private int conferenceAnswerLikeCnt;
		
	// 유저의 like 여부
	private int conferenceAnswerLiked;
	
	// 결과 총 개수
	private int total;
	
	//유저이름
	private String username;
}
