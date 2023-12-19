package com.example.demo;

import org.springframework.stereotype.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

	//Crearemos un HashMap en el que almacenaremos el conjunto de usuarios, identificándolos por su nombre
	//Cada vez que un usuario se de de alta, se almacenará en el String su nombre como clave
	//Y en User el conjunto de datos del usuario
	private ConcurrentHashMap<String,User> usuarios = null;
	//También dispondremos de una variable de tipo String en la que almacenaremos al dirección en que se guardará el fichero en que almacenaremos los datos
	private String directorio=System.getProperty("user.dir") + "/src/main/resources/static/usuarios.txt";
	//Creamos una lista de User en la que almacenaremos a aquellos usuarios que esten logeados actualmente
	private List<User> usuariosActivos=new ArrayList<>();
	//Variable para almacenar el número de usuarios activos
	private int numActive=0;
	//Establecemos un método Get para la lista anterior
	public List<User> getUsuariosActivos()
	{
		return this.usuariosActivos;
	}
	//Get para el número de usuarios activos
	public int getNumActive() 
	{
		return numActive;
	}

	//De momento definiremos también un método que nos permita leer también los archivos de un fichero
	//Nos servira de alguna forma como "Constructor por defecto", pues se encargará de inicializar
	//La variable usuarios en caso de estar vacía
	public void obtenerUsuariosSistema()
	{
		//Crearemos un objeto de tipo objectMapper con el que podremos leer el fihcero
        ObjectMapper mapeador = new ObjectMapper();
        //Comenzaremos cargando el fichero correspondiente desde el directorio establecido para ello
        File fichero = new File(directorio);
        //Establecemos ahora un bucle try catch para detectar errores
        try
        {
        	//Primero comprobamos si el fichero obtenido tiene o no información
        	//En caso de no tener, significa que aún no hay usuarios registrados
        	//Por lo tanto sería necesario inicializar el mapa
            if (!fichero.exists())
            	{
            	usuarios = new ConcurrentHashMap<>();
            	}
            //Ahora que ya se encuentra inicializada la variable usuarios
            //Podemos proceder a leer la lista de usuarios
            //Se lee de acuerdo al tipo de mapa que nosostros hemos establecido como referencia!!!
            usuarios = mapeador.readValue(fichero, new TypeReference<ConcurrentHashMap<String, User>>() { }); 
        }
        //En caso de no haber podido leerse correctamente, se indica
        catch (IOException e)
        {
        	System.out.println("Error: " +e.getMessage());
        	//Se crearía un nuevo mapa, igual que cuando el fichero está vacío
        	usuarios = new ConcurrentHashMap<>();
        }
    }
	
	//De forma paralela, podemos establecer un método con el que guardar en un fichero los usuarios
	private void guardarUsuariosSistema()
	{
		//Crearemos un objeto de tipo objectMapper con el que podremos ecribir en el fihcero
	    ObjectMapper mapeador = new ObjectMapper();
	  //Comenzaremos cargando el fichero correspondiente desde el directorio establecido para ello
        File fichero = new File(directorio);
	  //Establecemos ahora un bucle try catch para detectar errores
	    try
	    {
	    	//Almacenaremos en el fichero los valores de cada uno de los
	        mapeador.writeValue(fichero, usuarios);
	    }
	    catch (IOException e)
	    {
	    	System.out.println("Error: " +e.getMessage());
	    }
    }
	
	//Definimos ahora un método que nos devolverá el usuario en caso de que se encuentre entre el conjunto de usuarios registrados a partir de su nombre
	public User getUser(String nombre_usuario)
	{
		//Primero tenemos que comprobar si tenemos usuarios dentro del sistema
		//En caso de no contar con ellos, los cargaríamos
		if(usuarios==null)
		{
			this.obtenerUsuariosSistema();
		}
		//En caso de que no exista o el nombre de usuario no se haya introducido
		//(Esta segunda parte la comporbaríamos en el cliente)
		if(!usuarios.containsKey(nombre_usuario)||nombre_usuario==null)
		{
			return null;
		}
		//En caso de que exista
		else
		{
			return usuarios.get(nombre_usuario);
		}
	}
	
	//Definimos ahora un método que se encargará de dar de alta a nuestros usuarios
	//Como ya hemos definido en otras clases, se devolverá un boolean que será verdadero en caso de que se lleve a cabo el registro
	//Y será falso en caso de que ya exista dicho usuario y no pueda registrarse
	public User registrarse(User usuario)
	{
		//Primero tenemos que comprobar si tenemos usuarios dentro del sistema
		//Solo de esta forma podremos añadirlo al total de usuarios dle sistema
		//En caso de no contar con ellos, los cargaríamos
		if(usuarios==null)
		{
			this.obtenerUsuariosSistema();
		}
		//Primero comprobaremos que estamos recibiendo un usuario que contenga información
		//En caso de que hayamos recibido un objeto vacío, devolvemos un null
		if(usuario==null)
		{
			return null;
		}
		//En caso de que uno de los elementos del conjunto de usuarios ya tenga el mismo nombre, no se crea el usuario
		if(usuarios.containsKey(usuario.getNombre()))
		{
			return null;
		}
		//En caso contrario, si que dejaría registrarse
		else
		{
			//También se agregaría el correspondiente usuario al conjunto que tiene el mapa, medinate el método put
			//Como key se asignaría el nombre de usuario
			usuarios.put(usuario.getNombre(),usuario);
			//Lo agregamos también al conjunto de usuarios activos
			usuariosActivos.add(usuario);
			numActive++;
			//Una vez añadidos, guardamos en el fichero correspondiente los usuarios
			guardarUsuariosSistema();
			return usuario;
		}
	}	
	//Ahora, definimos un método que permite que los usuarios inicien sesión a partir de un nombre de usuario y una contraseña
	public User inicio_sesion(User usuario)
	{
		//Primero tenemos que comprobar si tenemos usuarios dentro del sistema
		//Solo de esta forma podremos añadirlo al total de usuarios dle sistema
		//En caso de no contar con ellos, los cargaríamos
		if(usuarios==null)
		{
			this.obtenerUsuariosSistema();
		}
		//Ahora comprobaremos que estamos recibiendo un usuario que contenga información
		//En caso de que hayamos recibido un objeto vacío, devolvemos un null
		if(usuario==null)
		{
			return null;
		}
		//Ahora en caso de que si lo haya hecho
		else
		{
			//Obtenemos el usuario al que le corresponde ese nombre
			User usuarioObtenido= getUser(usuario.getNombre());
			//Si el usuario existe, es decir, no hemos obtenido un null
			if(usuarioObtenido!=null)
			{
				//Ahora que hemos obtenido este usuario, tenemos que comprobar que la contraseña coincide
				if(usuarioObtenido.getPassword().equals(usuario.getPassword()))
				{
					//Se agrega al conjunto de usuarios activos
					numActive++;
					usuariosActivos.add(usuario);
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
	public User borrarUsuario(User usuario)
	{
		//Primero tenemos que comprobar si tenemos usuarios dentro del sistema
		//Solo de esta forma podremos añadirlo al total de usuarios dle sistema
		//En caso de no contar con ellos, los cargaríamos
		if(usuarios==null)
		{
			this.obtenerUsuariosSistema();
		}
		//Ahora comprobamos el hipotético caso de que el usuario no tenga contenido
		if(usuario==null)
		{
			return null;
		}
		//En caso de que si lo haya hecho
		else
		{
			User usuarioObtenido= getUser(usuario.getNombre());
			//Si el usuario existe, es decir, no hemos obtenido un null
			if(usuarioObtenido!=null)
			{
				//Ahora que hemos obtenido este usuario, tenemos que comprobar que la contraseña coincide
				if(usuarioObtenido.getPassword().equals(usuario.getPassword()))
				{
					//Eliminamos al usuario del conjunto total de usuarios
					usuarios.remove(usuario.getNombre());
					//Comprobaremos que número de usuario activo es para eliminar
					int aux=-1;
					for(int i=0;i<usuariosActivos.size();i++)
					{
						if(usuario.getNombre().equals(usuariosActivos.get(i).getNombre()))
						{
							aux=i;
						}
					}
					//Únicamente si i no es el valor por defecto...
					if(aux>=0)
					{
						usuariosActivos.remove(aux);//Se elimina de la lista de usuarios activos
						numActive--;
					}
					//Una vez añadidos, guardamos en el fichero correspondiente los usuarios
					guardarUsuariosSistema();
					return usuario;
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
	
	//Definimos ahora un método que se encargará de borrar la contraseña de un usuario dado
	public User cambiarPsw(User usuario)
	{
		//Primero tenemos que comprobar si tenemos usuarios dentro del sistema
		//Solo de esta forma podremos añadirlo al total de usuarios dle sistema
		//En caso de no contar con ellos, los cargaríamos
		if(usuarios==null)
		{
			this.obtenerUsuariosSistema();
		}
		//Ahora comprobamos el hipotético caso de que el usuario no tenga contenido
		if(usuario==null)
		{
			return null;
		}
		//En caso de que si lo haya hecho
		else
		{
			User usuarioObtenido= getUser(usuario.getNombre());
			//Si el usuario existe, es decir, no hemos obtenido un null
			if(usuarioObtenido!=null)
			{
				//En este caso, determinamos que la contraseña del usuario que buscamos sea la nuestra
				usuarioObtenido.setPassword(usuario.getPassword());
				//Una vez añadidos, guardamos en el fichero correspondiente los usuarios
				guardarUsuariosSistema();
				return usuario;
			}		
			else
			{
				return null;
			}
		}
	}
	
	//Definimos ahora un método que se encargará de conseguir que los usuarios cierren sesión
	public User cierreSesion(User usuario)
	{
		//Primero tenemos que comprobar si tenemos usuarios dentro del sistema
		//Solo de esta forma podremos añadirlo al total de usuarios dle sistema
		//En caso de no contar con ellos, los cargaríamos
		if(usuarios==null)
		{
			this.obtenerUsuariosSistema();
		}
		//Ahora comprobamos el hipotético caso de que el usuario no tenga contenido
		if(usuario==null)
		{
			return null;
		}
		
		//En caso de que si lo haya hecho
		else
		{
			User usuarioObtenido= getUser(usuario.getNombre());
			//Si el usuario existe, es decir, no hemos obtenido un null
			if(usuarioObtenido!=null)
			{
				///Comprobaremos que número de usuario activo es para eliminar
				int aux=-1;
				for(int i=0;i<usuariosActivos.size();i++)
				{
					if(usuario.getNombre().equals(usuariosActivos.get(i).getNombre()))
					{
						aux=i;
					}
				}
				//Únicamente si i no es el valor por defecto...
				if(aux>=0)
				{
					usuariosActivos.remove(aux);//Se elimina de la lista de usuarios activos
					numActive--;
				}
				return usuario;
			}	
			else
			{
				return null;
			}
		}
	}
}
