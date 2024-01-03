const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const servidorWebSocket = new WebSocket.Server({ server });

const PORT = 8080;

servidorWebSocket.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');
  ws.on('message', (message) => {
    // Manejar mensajes del cliente
    servidorWebSocket.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Reenviar el mensaje a todos los clientes, excepto al remitente
        client.send(message);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
