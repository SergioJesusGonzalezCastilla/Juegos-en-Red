package com.example.demo;

public class User {
	
	//Definimos las variables que determinarán las carcaterísticas de un usuario
	private String nombre; 
	private String password; 
	
	//Definimos ahora el constructor con el que se definirá un usuario al registrarse
	public User(String nombre_usuario, String password_usuario)
	{
		//Asignamos los valores que se reciben al crear un usuario a las variables correspondientes
		nombre=nombre_usuario;
		password=password_usuario;
	}
	
	public String getNombre()
	{
		return this.nombre;
	}
	public String getPassword()
	{
		return this.password;
	}
	//Añadimos también un método get con el que se obtiene una cadena con toda la infomración
	public String getInfo()
	{
		return ("Nombre de usuario: " +this.nombre+" \n Contraseña: " +this.password+ "\n");
	}
	
	//Se definen ahora los métodos set correspondientes, con los que se modificará la información relativa al usuario
	public void setNombre(String nombre)
	{
		this.password=nombre;
	}
	public void setPassword(String password_param)
	{
		this.password=password_param;
	}
}
