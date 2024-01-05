export class WebSocketConfig {
    //Método constructor
    constructor(scene, userId) {
		
		// Imprime la URL completa del WebSocket en la consola
        console.log("WebSocket URL:", "ws://" + location.host + "/echo?id=" + userId);
        
        // Establecemos el websocket, con  el id del usuario
       	this.socket = new WebSocket("ws://" + location.host + "/echo?id=" + userId);
        
        //Asignamos la correspondiente escena
        this.scene = scene;
    
        //Comportamiento al abrir la conexión
        this.socket.onopen = () => {
            console.log('WebSocket connection opened.');
            this.socket.send(JSON.stringify({
						tipo: 'numero_usuarios',
					}));
			console.log('Se ha mandado un mesnaje')
        };
    
        //Comportamiento al cerrar la conexión
        this.socket.onclose = function(event) 
        {
            console.log('Se ha cerrado la conexión');
        }
    
        //Comportamiento al ocurrir un error
        this.socket.onerror = function(error) 
        {
            console.log('Se ha producido un error: ' +error);
        }

        //Comportamiento al recibir un mensaje
        this.socket.onmessage = (event) => {
		    console.log('Se ha recibido un mensaje');
		
		    let data; // Declarar data aquí
		
		    try {
		        // Obtener los datos del JSON
		        data = JSON.parse(event.data);
		
		        // Invocar al método del juego que gestiona qué hacer al recibir un mensaje
		        this.scene.handleWebSocketMessage(data);
		    } catch (error) {
		        console.error('Error al analizar JSON:', error);
		    }
		};
    }
  
    // Método para enviar un mensaje al servidor WebSocket
    sendMessage(message) {
        
        //En caso de que el websocket esté abierto...
        if (this.socket.readyState === WebSocket.OPEN) {
			console.log(message);
            this.socket.send(JSON.stringify(message));
        } else {
            //En caso contrario, se indica que ha habido un error
            console.log('El websocket no tiene una conexión iniciada');
        }
    }
  
    // Mëtodo para cerrar la conexión del webcocket
    cerrarConexion() {
      this.socket.close();
    }
  }
