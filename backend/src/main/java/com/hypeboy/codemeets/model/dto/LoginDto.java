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
public class LoginDto {
	private int userPk;

	@ApiModelProperty(value="유저 아이디", example = "admin01")
	private String userId;
	
	@ApiModelProperty(value="유저 비밀번호", example = "1234")
	private String password;

	private String token;
	private int userActive;
	private String provider;
	private String provider_id;
	
}
