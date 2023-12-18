package com.example.demo;

import java.util.List;

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
	
	@GetMapping("/lista")
	public List<User> loadUsers()
	{
		List<User> userList= User_Service.getUsuarios();
		return userList;
	}

	
	//A continuación, se definirá un método que permititrá cambiar la contraseña de un jugador
	@PutMapping
	public ResponseEntity<User> changePassword(@PathVariable String psw, @RequestBody User usuario)
	{
		User usuarioObtenido= User_Service.getUser(usuario.getUsuario());
		//Ahora devolveremos una u otra ifnormación en caso de que el usuario exista o no
		if(usuarioObtenido!=null)
		{
			//Ahora comprobaremos si coinciden las contraseñas o no
			if(usuario.getPassword().equals(psw))
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
}
