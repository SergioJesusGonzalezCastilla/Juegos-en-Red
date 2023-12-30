// Establecemos el websocket
var socket = new WebSocket("ws://" + location.host + "/echo");

// Función que se activará cuando se abra una conexión correctamente
socket.onopen = function(event) 
{
    console.log('Se ha abierto la conexión');
}
// Función que se activará cuando se cierre la conexión correctamente
socket.onclose = function(event) 
{
    console.log('Se ha cerrado la conexión');
}
// Función que se activará cuando se produzca un error
socket.onclose = function(event) 
{
    console.log('Se ha producido un error');
}
// Función que se activará cuando se envíe un mensaje
socket.onclose = function(event) 
{
    //Aquí toda la lógica del intercambio de información
}