package com.example.demo;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class WebSocketHandlerPimPamPum extends TextWebSocketHandler {

	// Mapa con el que realizaremos un seguimiento de los ususarios conectados
    private ConcurrentHashMap<String, Player> usuariosConectados = new ConcurrentHashMap<>();
    	
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception 
    {
    	//Primero obtenemos el id del usuario
        String userId = session.getUri().getQuery().split("=")[1];
        // En caso de haber obtenido un ID
        if (userId != null && !userId.isEmpty()) {
            // Creamos un objeto de la clase player con el nuevo ID
            Player player = new Player(userId, session);

            // Almacenar el nuevo jugador en el mapa
            usuariosConectados.put(userId, player);

            //Indicamos que hemos iniciado la conexión
            System.out.println("Usuario conectado con ID: " + userId);
        }
        //En caso de no obtener el id
        else {
            System.out.println("No se pudo identificar al usuario");
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //Recibe el mensaje desde el cliente:   	
        String payload = message.getPayload(); 
        try {
            //Se lee el mensaje recibido en JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(payload);
            
            //Envíamos el mensaje a los usuarios
            notificarActualizacion(session, jsonNode);
            System.out.println("Se ha enviado un mensaje");
            
            //En caso de haber algún problema durante la lectura
        } catch (IOException e) {
        	//Indicamos lo correspondiente
        	System.out.println("Se ha producido un error");
        	//Imprimimos el error
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	//Primero obtenemos el id del usuario
        String userId = session.getUri().getQuery().split("=")[1];
        // En caso de haber obtenido un ID
        if (userId != null && !userId.isEmpty()) {
            //Indicamos que hemos cerrado la conexión
        	usuariosConectados.remove(userId);
            System.out.println("Conexión cerrada para el usuario con ID: " + userId);
        } else {
            // En caso de no obtener el ID
            System.out.println("Conexión cerrada para un usuario no identificado");
        }
    }
    
 // Método que se encarga de enviar mensajes a todos los clientes con la información correspondiente
    private void notificarActualizacion(WebSocketSession session, JsonNode jsonNode) {
        // Enviar mensaje a todos los usuarios conectados excepto al que lo ha enviado
    	// No sería necesario que recibiese es ainformación, ya que forma parte directamente dle juego
    	// Y por lo tanto ya dispone de ella
        for (Player player : usuariosConectados.values()) {
        	//Obtenemos la sesión de cada usuario
            WebSocketSession userSession = player.getSession();
            // Comprobamos que los usuarios estén conectados a la hora de mandar mensajes
            //Verificamso que no sea el que las ha enviado
            if (userSession != null && !userSession.getId().equals(session.getId())) {
                try {
                	//Se les envía un mensaje a los usuarios con la información
                    userSession.sendMessage(new TextMessage(jsonNode.toString()));
                  //En caso de haber algún problema durante el envío de información
                } catch (IOException e) {
                	//Indicamos lo correspondiente
                	System.out.println("Se ha producido un error");
                	//Imprimimos el error
                    e.printStackTrace();
                }
            }
        }
    }
    
}


