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
public class MessageDto {
	private int messagePk;
	private int room;
	private int sendPk;
	private int recvPk;
	private String sendNick;
	private String recvNick;
	private String sendTime;
	private String recvTime;
	private String content;
	private String readChk;
	private int userPk;
	private int otherPk;
	private String other_nick;
	
	private String profilePhoto;
	private String nick;
	private int unread;
}
