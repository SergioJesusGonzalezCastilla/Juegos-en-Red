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
import com.fasterxml.jackson.databind.node.ObjectNode;

@Controller
public class WebSocketHandlerPimPamPum extends TextWebSocketHandler {

	// Mapa con el que realizaremos un seguimiento de los ususarios conectados
    private ConcurrentHashMap<String, Player> usuariosConectados = new ConcurrentHashMap<>();
    private int numUsuariosConectados=0;
    private boolean juego_iniciado=false;
    	
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
            numUsuariosConectados++;
            if(numUsuariosConectados>=2)
            {
            	juego_iniciado=true;
            }
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
            
            //En caso de que el tipo de mensaje sea numero_usuarios
            if (jsonNode.has("tipo") && jsonNode.get("tipo").asText().equals("numero_usuarios")) {
                // Agregamos la información de numUsuariosConectados al mensaje
                ((ObjectNode) jsonNode).put("numUsuariosConectados", numUsuariosConectados);
            }
          //En caso de que el tipo de mensaje sea juego_iniciado
            if (jsonNode.has("tipo") && jsonNode.get("tipo").asText().equals("juego_iniciado")) {
                // Agregamos la información de numUsuariosConectados al mensaje
                ((ObjectNode) jsonNode).put("juego_iniciado", juego_iniciado);
            }
            //Envíamos el mensaje a los usuarios
            notificarActualizacion(session, jsonNode);
            
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
        	numUsuariosConectados--;
        	if(numUsuariosConectados<2)
            {
            	juego_iniciado=false;
            }
            System.out.println("Conexión cerrada para el usuario con ID: " + userId);
        } else {
            // En caso de no obtener el ID
            System.out.println("Conexión cerrada para un usuario no identificado");
        }
    }
    
 // Método que se encarga de enviar mensajes a todos los clientes con la información correspondiente
    private void notificarActualizacion(WebSocketSession session, JsonNode jsonNode) {
    	// Código para enviar el JSON al cliente
        // Obtemción del tipo del mensaje
        String tipoMensaje = jsonNode.has("tipo") ? jsonNode.get("tipo").asText() : "";

        // Se verifica el tipo de mensaje
        if ("numero_usuarios".equals(tipoMensaje)) {
            // Si el mensaje es de tipo 'numero_usuarios', se envía exclusivamente al emisor
            try {
                session.sendMessage(new TextMessage(jsonNode.toString()));
            } catch (IOException e) {
                System.out.println("Error al enviar el mensaje al emisor");
                e.printStackTrace();
            }
        }
        else if("juego_iniciado".equals(tipoMensaje))
        {
        	// Si es 'juego_iniciado', envía el mensaje a todos los usuarios conectados incluso al emisor
            for (Player player : usuariosConectados.values()) {
                WebSocketSession userSession = player.getSession();
                if (userSession != null) {
                    try {
                        userSession.sendMessage(new TextMessage(jsonNode.toString()));
                    } catch (IOException e) {
                        System.out.println("Se ha producido un error");
                        e.printStackTrace();
                    }
                }
            }
        } else {
            // Si no es 'numero_usuarios', envía el mensaje a todos los usuarios conectados excepto al emisor
            for (Player player : usuariosConectados.values()) {
                WebSocketSession userSession = player.getSession();
                if (userSession != null && !userSession.getId().equals(session.getId())) {
                    try {
                        userSession.sendMessage(new TextMessage(jsonNode.toString()));
                    } catch (IOException e) {
                        System.out.println("Se ha producido un error");
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
