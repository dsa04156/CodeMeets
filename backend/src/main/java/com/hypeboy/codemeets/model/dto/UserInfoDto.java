package com.hypeboy.codemeets.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserInfoDto {
	private int user_info_pk;
	private String userName;
	private String nickname;
	private String tel;
	private String email;
	private String profile_photo;
	private int profilePublic;
	private int userPk;
}
