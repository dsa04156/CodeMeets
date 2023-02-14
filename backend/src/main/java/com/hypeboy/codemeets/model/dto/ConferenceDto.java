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
public class ConferenceDto {
	private int conferencePk;
	private String callStartTime;
	private String callEndTime;
	private String conferenceTitle;
	private String conferenceContents;
	private int conferenceActive;
	private String conferenceUrl;
	private int groupPk;
	private int userPk; // 회의 생성한 유저
	private String joinUser; // 회의 참가한 유저 목록
	private int joinUserCnt; // 회의 참가한 총 유저수
	private int total; // 회의 총 수
}
