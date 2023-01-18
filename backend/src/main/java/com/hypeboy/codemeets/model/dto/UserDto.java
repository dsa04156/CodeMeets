package com.hypeboy.codemeets.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDto {
	private int userPk;
	private String userId;
	private String password;
	private int userActive;
	private int userInfoPk;
	private String userName;
	private String nickname;
	private String tel;
	private String email;
	private String profilePhoto;
	private int profilePublic;
}
