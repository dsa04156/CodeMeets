package com.hypeboy.codemeets.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GroupDto {
	private int groupPk;
	private String groupName;
	private String groupDesc;
	private int managerId;
	private String groupUrl;
	
}
