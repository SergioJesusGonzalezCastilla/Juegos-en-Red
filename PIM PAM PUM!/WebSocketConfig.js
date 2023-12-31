export class WebSocketConfig {
    //Método constructor
    constructor(scene, userId) {
        // Establecemos el websocket, con  el id del usuario
        var socket = new WebSocket("ws://" + location.host + "/echo?id=" + userId);
        
        //Asignamos la correspondiente escena
        this.scene = scene;
    
        //Comportamiento al abrir la conexión
        this.socket.onopen = () => {
            console.log('WebSocket connection opened.');
            // Puede realizar acciones adicionales cuando se abre la conexión aquí
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
            //Obtenemos los fatos del JSON
            data = JSON.parse(event.data);

            //Indicamos la información que se ha recibido
            console.log('Se ha recibido el siguiente mensaje:', data);
    
            //Finalmente, se invocará al método del juego que gestiona qué hacer al recibir un mensaje.
            //Variará en función de la información que pasemos o recibamos
            this.scene.handleWebSocketMessage(data);
        };
    }
  
    // Método para enviar un mensaje al servidor WebSocket
    sendMessage(message) {
        
        //En caso de que el websocket esté abierto...
        if (this.socket.readyState === WebSocket.OPEN) {
            //Se manda el mensaje en forma de string en formato JSON
            this.socket.send(JSON.stringify(message));
        } else {
            //En caso contrario, se indica que ha habido un error
            console.error('Error. El websocket no tiene una conexión iniciada');
        }
    }
  
    // Mëtodo para cerrar la conexión del webcocket
    cerrarConexion() {
      this.socket.close();
    }
  }
