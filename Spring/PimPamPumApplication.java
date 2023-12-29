package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class PimPamPumApplication {

	public void registerWebSocketHandlers(
			WebSocketHandlerRegistry registry) {
		registry.addHandler(messageHandler(), "/echo").setAllowedOrigins("*");		
	}
	@Bean
	public WebSocketHandler messageHandler() {
		return new WebSocketHandlerPimPamPum();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(PimPamPumApplication.class, args);
	}

}
