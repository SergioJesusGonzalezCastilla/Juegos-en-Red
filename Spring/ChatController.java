package com.example.demo;

import java.io.File;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")//Utilizaremos la misma raíz del directorio para todos los métodos de esta clase
public class ChatController {

	//Se crea un objeto de la clase ConversorTexto
	public static ConversorTexto conversor = new ConversorTexto();
	//Se generará un fichero en el cual se almacenará la información
	public static File fichero = new File("src\\main\\java\\com\\example\\demo\\mensajes.txt");
	
	//Definiremos ahora un método que nos permitirá recuperar los mensajes
	//En este caso, se tratará de un método Get
	@GetMapping
	public static String[] obtenerMensajes()
	{
		//Se intenta leer el fichero
		try {
			return conversor.leerFichero(fichero);
		} 
		//En caso de no haber podido leerse, se lanza una excepción
		catch (Exception e) 
		{
			//Con la siguiente sentencia, se imprime tanto el error como la línea en la que ha tenido lugar
			//Nos puede ser de muchísima utilidad a la hora de detectar errores
			e.printStackTrace();
		}
		return null;
	}
	
	//Definiremos ahora un método con el que postear los mensajes
	//Se tratará de un método Post
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED) //Indicamos al usuario que se ha subido el mensaje
	public static void SubirMensaje(@RequestBody String mensaje) //El usuario deberá subir su mensaje
	{
		//Agregamos los mensajes al fichero
		conversor.agregarTexto(fichero, mensaje);
		
	}
	
}
