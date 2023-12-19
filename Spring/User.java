package com.example.demo;

public class User {
	
	//Definimos las variables que determinarán las carcaterísticas de un usuario
	private String nombre; 
	private String password; 
	
	//Definimos ahora el constructor con el que se definirá un usuario al registrarse
	public User(String nombre, String password)
	{
		//Asignamos los valores que se reciben al crear un usuario a las variables correspondientes
		this.nombre=nombre;
		this.password=password;
	}
	
	public String getNombre()
	{
		return this.nombre;
	}
	public String getPassword()
	{
		return this.password;
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
