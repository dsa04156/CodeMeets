package com.hypeboy.codemeets.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GroupNoticeDto {
	private int groupNoticePk;
	private String groupNoticeTitle;
	private String groupNoticeContents;
	private String originFilename;
	private String dbFilename;
	private String groupNoticeDate;
	private String userName;
	private int groupPk;
	private int userPk;
	private int groupNoticeHit;
	private int total;
	
}
