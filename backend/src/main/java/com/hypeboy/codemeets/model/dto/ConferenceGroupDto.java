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
	int groupPk;
	int conferencePk;
	String callStartTime;
	String callEndTime;
	String conferenceTitle;
	String conferenceContents;
	int conferenceActive;
	int userPk; // 회의 생성한 유저의 pk값
	String groupName;
	String groupDesc;
	int managerId; // 그룹 생성한 유저의 pk값
	String groupUrl;
	int total;
}
