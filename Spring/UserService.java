package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios") //Utilizaremos la misma raíz del directorio para todos los métodos de esta clase
public class UserController {

	//Crearemos un objeto de la clase UserService con la que utilizaremos sus métodos 
	//Usaremos Autowired para que se enlace automáticamente
	
	@Autowired
	private UserService User_Service;
	
	//Primero determinaremos un método con el que registrarse
	//Se tratará de una operación de tipo post, pues crearemos un nuevo objeto
	
	@PostMapping
	public ResponseEntity<User> signUp(@RequestBody User usuario)
	{
		//Primero añadiremos a User_Service el usuario, en caso de que no exista uno igual
		//Nos devuelve un boolean, con  el que podemos lanzar un mensaje para indicar si se ha registrado o no
		boolean usuarioRepetido=User_Service.registrarse(usuario);
		//En función del valor obtenido, lanzamos uno u otro mensaje
		if(usuarioRepetido==true)
		{
			//En caso de que se halla creado, devolveremos un indicador de que se ha creado con éxito
			// También se devuelve el correspondiente usuario con sus datos
			return new ResponseEntity<>(usuario, HttpStatus.OK);
		}
		else
		{
			//En caso de que no haya podido crearse se devuelve un mensaje de error
			//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	//Ahora determinaremos un método con el que iniciar sesión
	//Se tratará de una operación de tipo post, pues solo requeriremos de un usuario como cuerpo de la petición para obtener el resultado requerido
	
	@GetMapping
	public ResponseEntity<User> logIn(@RequestBody User usuario)
	{
		//Se comprobará mediante el método correspondiente de User_Service que usuario y contraseña coinciden
		//Nos devuelve un User, con  el que podemos lanzar un mensaje para indicar si se ha logeado
		User usuarioObtenido=User_Service.inicio_sesion(usuario);
		//En función del valor obtenido, lanzamos uno u otro pensaje
		if(usuarioObtenido!=null)
		{
			//En caso de que se halla accedido correctamente, devolveremos un indicador de que se ha creado con éxito
			// También se devuelve el correspondiente usuario con sus datos
			return new ResponseEntity<>(usuario, HttpStatus.OK);
		}
		else
		{
			//En caso de que no haya podido obtenerse se devuelve un mensaje de error
			//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	/*
	//Ahora determinaremos un método con el que cerrar sesión
	//Se tratará de una operación de tipo post, pues solo requeriremos de un usuario como cuerpo de la petición
	@PostMapping(value="/logOut")
	public ResponseEntity<User> logOut(@RequestBody User usuario)
	{
		//Se comprobará mediante el método correspondiente de User_Service que usuario y contraseña coinciden
		//Nos devuelve un boolean, con  el que podemos lanzar un mensaje para indicar si se ha logeado
		boolean usuarioObtenido=User_Service.deleteUser(usuario.getUsuario(),usuario.getPassword());
		//En función del valor obtenido, lanzamos uno u otro pensaje
		if(usuarioObtenido==true)
		{
			//En caso de que se halla accedido correctamente, devolveremos un indicador de que se ha creado con éxito
			// También se devuelve el correspondiente usuario con sus datos
			return new ResponseEntity<>(usuario, HttpStatus.OK);
		}
		else
		{
			//En caso de que no haya podido obtenerse se devuelve un mensaje de error
			//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	//Ahora determinaremos un método que nos permitirá visualizar la información de un jugador a partir de su ID
	@GetMapping(value="/playerInfo")
	public ResponseEntity<String> playerInfo(@PathVariable String nombre)
	{
		User usuarioObtenido= User_Service.getUser(nombre);
		//Ahora devolveremos una u otra información en función de si el usuario existe o no
		if(usuarioObtenido!=null)
		{
			return new ResponseEntity<>(usuarioObtenido.toString(),HttpStatus.OK);
		}
		//En caso de que no se haya conseguido se devuelve un mensaje de error
		//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
		else
		{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	//A continuación, se definirá un método que permititrá cambiar la contraseña de un jugador
	@PutMapping(value="/changePassword")
	public ResponseEntity<User> changePassword(@PathVariable String nombre, @RequestBody User usuario)
	{
		User usuarioObtenido= User_Service.getUser(nombre);
		//Ahora devolveremos una u otra ifnormación en caso de que el usuario exista o no
		if(usuarioObtenido!=null)
		{
			//Ahora comprobaremos si coinciden las contraseñas o no
			if(usuario.getPassword().equals(usuarioObtenido.getPassword()))
			{
				usuarioObtenido.setPassword(usuario.getPassword());
				return new ResponseEntity<>(usuarioObtenido,HttpStatus.OK);
			}
			else
			{
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	}

	//Definimos un método ahora que nos permite obtener el número de usuarios como si se tratase de un string
	@GetMapping(value="/numUsuarios")
	public String numUsers()
	{
		return "Hay "+ User_Service.getNumUsuarios()+ " usuarios conectados";
	}
	*/
}
