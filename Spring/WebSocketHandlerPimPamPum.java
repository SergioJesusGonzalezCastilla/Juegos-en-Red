package com.example.demo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Controller
public class WebSocketHandlerPimPamPum extends TextWebSocketHandler {

	// Mapa con el que realizaremos un seguimiento de los ususarios conectados
    private HashMap<String, Player> usuariosConectados = new HashMap<>();
    
	//Método que obtiene el ID de la sesión
	private String obtenerId(WebSocketSession session) {
		
	    // Se recupera el id de la sesión
	    Object id = session.getAttributes().get("userId");

	    // Ahora comprobamos que el id existe y es una cadena
	    if (id instanceof String) 
	    {
	    	//En caso de hacerlo, se devuelve
	        return (String) id;
	    } 
	    else 
	    {
	        // En caso contrario, devolvemos null
	        return null;
	    }
	}
	
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception 
    {
    	//Primero obtenemos el id del usuario
        String userId = obtenerId(session);
        // En caso de haber obtenido un ID
        if (userId != null) {
            // Creamos un objeto de la clase player con el nuevo ID
            Player player = new Player(userId);

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
        //Se manejan los mensajes recibidos desde el cliente
        String payload = message.getPayload();       
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	//Primero obtenemos el id del usuario
        String userId = obtenerId(session);
        // En caso de haber obtenido un ID
        if (userId != null) {
            //Indicamos que hemos cerrado la conexión
        	usuariosConectados.remove(userId);
            System.out.println("Conexión cerrada para el usuario con ID: " + userId);
        } else {
            // En caso de no obtener el ID
            System.out.println("Conexión cerrada para un usuario no identificado");
        }
    }
}

