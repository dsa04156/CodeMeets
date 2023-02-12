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
	private String conferenceTitle;
	private int groupPk;
	private String groupName;
	private int userPk;
	
	// 질문에 달린 답글 수
	private int answerCnt;
	
	// 질문의 like 수
	private int conferenceQuestionLikeCnt;
		
	// 유저의 like 여부
	private int conferenceQuestionLiked;
	
	// 결과 총 개수
	private int total;
	
	// 유저 이름
	private String username;
}
