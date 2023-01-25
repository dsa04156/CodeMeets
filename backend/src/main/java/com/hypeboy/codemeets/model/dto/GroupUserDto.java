package com.hypeboy.codemeets.model.dto;

import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.ToString;

@Getter
@Service
@ToString
public class GroupUserDto {
	private int gpk;
	private int userPk;
	private String userId;
	private String userName;
	
}
