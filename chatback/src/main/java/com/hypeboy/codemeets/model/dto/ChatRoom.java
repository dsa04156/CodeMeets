package com.hypeboy.codemeets.model.dto;

import java.util.Random;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

	@Getter
	@Setter
	@NoArgsConstructor
	public class ChatRoom {

	    private int room;


	    public static ChatRoom create(String name) {
	        ChatRoom chatRoom = new ChatRoom();
	        Random random = new Random();
	        chatRoom.room = random.nextInt();
	        return chatRoom;
	    }
	}

