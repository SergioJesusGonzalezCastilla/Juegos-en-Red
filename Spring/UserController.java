package com.example.demo;

import java.util.ArrayList;
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
		///Primero añadiremos a User_Service el usuario, en caso de que no exista uno igual
		//Nos devuelve un boolean, con  el que podemos lanzar un mensaje para indicar si se ha registrado o no
		User usuarioRegistrado=User_Service.registrarse(usuario);
		//En función del valor obtenido, lanzamos uno u otro mensaje
		if(usuarioRegistrado!=null)
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
	
	@GetMapping(value = "/{key}/{psw}")
	public ResponseEntity<User> logIn(@PathVariable String key,@PathVariable String psw)
	{
		//Creamos un nuevo User con los valores obtenidos
		User usuario_logIn=new User(key,psw);
		//Se comprobará mediante el método correspondiente de User_Service que usuario y contraseña coinciden
		//Nos devuelve un User, con  el que podemos lanzar un mensaje para indicar si se ha logeado
		User usuarioObtenido=User_Service.inicio_sesion(usuario_logIn);
		//En función del valor obtenido, lanzamos uno u otro pensaje
		if(usuarioObtenido!=null)
		{
			//En caso de que se halla accedido correctamente, devolveremos un indicador de que se ha creado con éxito
			// También se devuelve el correspondiente usuario con sus datos
			return new ResponseEntity<>(usuario_logIn, HttpStatus.OK);
		}
		else
		{
			//En caso de que no haya podido obtenerse se devuelve un mensaje de error
			//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping(value = "/{key}/{psw}")
	public ResponseEntity<User> deleteUser(@PathVariable String key,@PathVariable String psw)
	{
		//Creamos un nuevo User con los valores obtenidos
		User usuario_delete=new User(key,psw);
		//Se comprobará mediante el método correspondiente de User_Service que usuario y contraseña coinciden
		//Nos devuelve un User, con  el que podemos lanzar un mensaje para indicar si se ha logeado
		User usuarioBorrado=User_Service.borrarUsuario(usuario_delete);
		//En función del valor obtenido, lanzamos uno u otro pensaje
		if(usuarioBorrado!=null)
		{
			//En caso de que se halla accedido correctamente, devolveremos un indicador de que se ha creado con éxito
			// También se devuelve el correspondiente usuario con sus datos
			return new ResponseEntity<>(usuarioBorrado, HttpStatus.OK);
		}
		else
		{
			//En caso de que no haya podido obtenerse se devuelve un mensaje de error
			//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	//A continuación, se definirá un método que permititrá cambiar la contraseña de un jugador
	@PutMapping(value = "/{key}/{psw}")
	public ResponseEntity<User> changePassword(@PathVariable String key, @PathVariable String psw, @RequestBody String pswNew)
	{	
		User usuario=User_Service.getUser(key);
		//Modificiamos el usuario recibido con la contraseña nueva
		usuario.setPassword(psw);
		//Se comprobará mediante el método correspondiente de User_Service que usuario y contraseña coinciden
		//Nos devuelve un User, con  el que podemos lanzar un mensaje para indicar si se ha logeado
		User usuarioModificado=User_Service.cambiarPsw(usuario);
		//En función del valor obtenido, lanzamos uno u otro pensaje
		if(usuarioModificado!=null)
		{
			//En caso de que se halla accedido correctamente, devolveremos un indicador de que se ha creado con éxito
			// También se devuelve el correspondiente usuario con sus datos
			return new ResponseEntity<>(usuarioModificado, HttpStatus.OK);
		}
		else
		{
			//En caso de que no haya podido obtenerse se devuelve un mensaje de error
			//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}		
	}
	
	//Ahora determinaremos un método con el que cerrar sesión
	//Se tratará de una operación de tipo post, pues solo requeriremos de un usuario como cuerpo de la petición
	@PostMapping(value="/logOut")
	public ResponseEntity<User> logOut(@RequestBody User usuario)
	{
		//Se comprobará mediante el método correspondiente de User_Service que usuario y contraseña coinciden
		//Nos devuelve un User, con  el que podemos lanzar un mensaje para indicar si se ha logeado
		User usuarioDeslogeado=User_Service.cierreSesion(usuario);
		//En función del valor obtenido, lanzamos uno u otro pensaje
		if(usuarioDeslogeado!=null)
		{
			//En caso de que se halla accedido correctamente, devolveremos un indicador de que se ha creado con éxito
			// También se devuelve el correspondiente usuario con sus datos
			return new ResponseEntity<>(usuarioDeslogeado, HttpStatus.OK);
		}
		else
		{
			//En caso de que no haya podido obtenerse se devuelve un mensaje de error
			//Este indicará al usuario que se ha llevado a cabo de forma incorrecta la petición
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}		
	}
	
	@GetMapping(value="/numUsuarios")
	public int getActiveUsers()
	{
		int num= User_Service.getNumActive();
		return num;
	}
	
}
