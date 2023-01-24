package com.hypeboy.codemeets.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GroupDto {
	private int group_pk;
	private String group_name;
	private String group_desc;
	private int manager_id;
	private String group_url;
	
}
