package com.hypeboy.codemeets.model.dto;

import io.swagger.annotations.ApiModelProperty;
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
	
	@ApiModelProperty(value="리프레쉬 토큰.")
	private String token;
	
	@ApiModelProperty(value="계정 활성 여부. 0 = 탈퇴 | 1 = 사용중")
	private int userActive;
	
	private int userInfoPk;
	private String userName;
	private String nickname;
	private String tel;
	private String email;
	private String profilePhoto;

	@ApiModelProperty(value="이메일 공개 여부. 0 = 비공개 | 1 = 공개")
	private int emailPublic;
	
	@ApiModelProperty(value="전화번호 공개 여부. 0 = 비공개 | 1 = 공개")
	private int telPublic;
	
	private int groupUserPosition;
	
	@ApiModelProperty(value="소셜로그인 제공자.")
	private String provider;

	@ApiModelProperty(value="소셜로그인 제공자에서 발급한 ID.")
	private String providerId;
		
}
