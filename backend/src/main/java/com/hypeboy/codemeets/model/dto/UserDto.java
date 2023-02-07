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
public class UserDto {
	private int userPk;
	private String userId;
	private String password;
	private String token;
	private int userActive;
	private int userInfoPk;
	private String userName;
	private String nickname;
	private String tel;
	private String email;
	private String profilePhoto;
	private int emailPublic;
	private int telPublic;
	private int groupUserPosition;
	private String provider;
	private String providerId;
		
}
