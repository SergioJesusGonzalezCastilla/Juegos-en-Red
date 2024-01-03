const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const servidorWebSocket = new WebSocket.Server({ server });

const PORT = 8080;

const MAX_PLAYERS = 2;
let connectedPlayers = 0;

servidorWebSocket.on('connection', (ws) => {
  if (connectedPlayers < MAX_PLAYERS) {
    connectedPlayers++;

    console.log(`Jugador ${connectedPlayers} conectado`);

    ws.on('message', (message) => {
      // Manejar mensajes del cliente
      servidorWebSocket.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          // Reenviar el mensaje a todos los clientes, excepto al remitente
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      connectedPlayers--;
      console.log(`Jugador desconectado, jugadores restantes: ${connectedPlayers}`);
    });
  } else {
    // Si hay más de dos jugadores, cerrar la conexión inmediatamente
    ws.close(440, 'Demasiados jugadores en la partida.');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
