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
public class ConferenceGroupDto {
	private int groupPk;
	private int conferencePk;
	private String callStartTime;
	private String callEndTime;
	private String conferenceTitle;
	private String conferenceContents;
	private int conferenceActive;
	private int userPk; // 회의 생성한 유저의 pk값
	private String groupName;
	private String groupDesc;
	private int managerId; // 그룹 생성한 유저의 pk값
	private String groupUrl;
	private int total;
}
