package com.hypeboy.codemeets.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.MessageDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DmController {

    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/chat/message")
    public void enter(MessageDto message) {
        if (MessageDto.MessageType.ENTER.equals(message.getType())) {
            message.setContent(message.getSendNick()+"님이 입장하였습니다.");
        }
        sendingOperations.convertAndSend("/topic/chat/room/"+message.getRoom(),message);
    }
}