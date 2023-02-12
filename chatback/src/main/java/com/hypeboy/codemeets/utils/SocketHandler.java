package com.hypeboy.codemeets.utils;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class SocketHandler extends TextWebSocketHandler {
	private final Logger logger = LoggerFactory.getLogger(SocketHandler.class);
    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        JSONObject jsonObject = new JSONObject(payload);
    	
        for (WebSocketSession s : sessions) {        	
        	// uri에서 찾은 room 번호
        	String uriRoomNo = s.getUri().toString().split("chating/")[1];
        	
        	// 메시지에서 찾은 room 번호
        	String msgRoomNo = String.valueOf(jsonObject.get("room"));
        	String sendPk = String.valueOf(jsonObject.get("sendPk"));
        	String recvPk = String.valueOf(jsonObject.get("recvPk"));
        	String userPk = String.valueOf(jsonObject.get("id"));
        	
        	if ( uriRoomNo.equals(msgRoomNo) ) {
            	logger.info("session - " + s + " msg - " + jsonObject.toString());
                s.sendMessage(new TextMessage(jsonObject.toString()));
        	}
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	logger.info("remove session - " + session + " status - " + status);
    	
        sessions.remove(session);
    }
}