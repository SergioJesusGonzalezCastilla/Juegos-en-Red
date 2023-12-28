package com.example.demo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
	
	//Definimos las variables que determinarán las carcaterísticas de un usuario
	private String nombre; 
	private String password; 
		
	//Se determina el constructor, que se encargará de crear un usuario a partir de la información de un JSON
	//También es el constructor por defecto
	public User(@JsonProperty("nombre")String nombre, @JsonProperty("password")String password)
	{
		this.nombre = nombre;
		this.password = password;
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

