package com.example.demo;

import org.springframework.stereotype.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

	//Crearemos un HashMap en el que almacenaremos el conjunto de usuarios, identificándolos por su nombre
	private ConcurrentHashMap<String,User> usuarios = new ConcurrentHashMap<>();
	//Cada vez que un usuario se de de alta, se almacenará en el String su nombre, y User el conjunto de datos del usuario
	
	//Se define también una variable que almacenará el número de usuarios
	private int numUsuarios=0;
	
	//Método get del numero de usuarios conectados
	public int getNumUsuarios()
	{
		return numUsuarios;
	}
	
	//Definimos ahora un método que se encargará de dar de alta a nuestros usuarios
	//Como ya hemos definido en otras clases, se devolverá un boolean que será verdadero en caso de que se lleve a cabo el registro
	//Y será falso en caso de que ya exista dicho usuario y no pueda registrarse
	
	public boolean registrarse(User usuario)
	{
		//En caso de que uno de los elementos del conjunto de usuarios ya tenga el mismo nombre, no se crea el usuario
		if(usuarios.containsKey(usuario.getUsuario()))
		{
			return false;
		}
		//En caso contrario, si que dejaría registrarse
		else
		{
			//Por lo tanto, el nuevo usuario registrado pasaría a tener su campo registrado a true
			usuario.setRegistrado(true);
			//También se agregaría el correspondiente usuario al conjunto que tiene el mapa, medinate el método put
			//Como key se asignaría el nombre de usuario
			usuarios.put(usuario.getUsuario(),usuario);
			return true;
		}
	}
		
	//Definimos ahora un método que nos devolverá el usuario en caso de que se encuentre entre el conjunto de usuarios registrados a partir de su nombre
	public User getUser(String nombre_usuario)
	{
		//En caso de que no exista
		if(!usuarios.containsKey(nombre_usuario))
		{
			return null;
		}
		//En caso de que exista
		else
		{
			return usuarios.get(nombre_usuario);
		}
	}
	
	//Ahora, definimos un método que permite que los usuarios inicien sesión a partir de un nombre de usuario y una contraseña
	public User inicio_sesion(User usuario)
	{
		//Primero comprobamos el hipotético caso de que no haya rellenado el nombre de usuario ni la contraseña
		if(usuario.getUsuario()==null || usuario.getPassword()==null)
		{
			return null;
		}
		//Ahora en caso de que si lo haya hecho
		else
		{
			User usuarioObtenido= getUser(usuario.getUsuario());
			//Si el usuario existe, es decir, no hemos obtenido un null
			if(usuarioObtenido!=null)
			{
				//Ahora que hemos obtenido este usuario, tenemos que comprobar que la contraseña coincide
				if(usuarioObtenido.getPassword().equals(usuario.getPassword()))
				{
					numUsuarios++;
					return usuarioObtenido;
				}
				//En caso contrario
				else
				{
					return null;
				}
			}
			//En caso contrario
			else
			{
				return null;
			}
		}
	}
	
	//Definimos ahora un método que borrará el usuario en caso de que se encuentre entre el conjunto de usuarios registrados a partir de su nombre
	//Devolverá un booleano que indicará si se ha llevado a cabo el borrado o no
	public boolean deleteUser(String nombre_usuario, String psw)
	{
		//Primero comprobamos el hipotético caso de que no haya rellenado el nombre de usuario ni la contraseña
		if(nombre_usuario==null || psw==null)
		{
			return false;
		}
		//En caso de que si lo haya hecho
		else
		{
			User usuarioObtenido= getUser(nombre_usuario);
			//Si el usuario existe, es decir, no hemos obtenido un null
			if(usuarioObtenido!=null)
			{
				//Ahora que hemos obtenido este usuario, tenemos que comprobar que la contraseña coincide
				if(usuarioObtenido.getPassword().equals(psw))
				{
					usuarioObtenido.setRegistrado(false);
					usuarios.remove(nombre_usuario);
					numUsuarios--;
					return true;
				}
				//En caso contrario
				else
				{
					return false;
				}
			}
			//En caso contrario
			else
			{
				return false;
			}
		}	
	}
}
