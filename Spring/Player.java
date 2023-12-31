package com.example.demo;

import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Player {
	
	private String userId;
    private WebSocketSession session;

    public Player(String userId, WebSocketSession session) {
        this.userId = userId;
        this.session = session;
    }

    public String getUserId() {
        return userId;
    }
    
    public WebSocketSession getSession() {
        return session;
    }
}

Como podría implementar las funcionalidades necesarias en el siguiente método del servidor?:
@Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //Se manejan los mensajes recibidos desde el cliente
        String payload = message.getPayload();       
    }
