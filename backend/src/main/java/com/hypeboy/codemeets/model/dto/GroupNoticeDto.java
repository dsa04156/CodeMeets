package com.hypeboy.codemeets.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GroupNoticeDto {
	private int groupNoticePk;
	private String groupNoticeTitle;
	private String groupNoticeContents;
	private String uploadFile;
	private String groupNoticeDate;
	private int groupPk;
	private int userPk;
	private int groupNoticeHit;

}
