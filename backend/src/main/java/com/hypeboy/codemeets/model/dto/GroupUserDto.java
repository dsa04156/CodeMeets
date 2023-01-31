package com.hypeboy.codemeets.model.dto;

import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GroupUserDto {
	private int groupPk;
	private int userPk;
	private String userId;
	private String userName;
	
}
