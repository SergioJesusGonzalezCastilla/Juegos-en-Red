package com.example.demo;

public class User {
	
	//Definimos las variables que determinarán las carcaterísticas de un usuario
	private boolean registrado; //Booleano en que se indicará si el usuario ya forma parte dle sistema
	private String nombre; //Nombre del usuario
	private String password; //Contraseña
	private float puntuacion; //Puntuación para clasificarlo
	
	//Definimos ahora el constructor con el que se definirá un usuario al registrarse
	public User(String nombre_usuario, String password_usuario)
	{
		//Primero asiganremos un valor por defecto al parámetro registrado
		registrado=false;
		//Asignamos los valores que se reciben al crear un usuario a las variables correspondientes
		nombre=nombre_usuario;
		password=password_usuario;
		//Al crear un usuario, se inicializará su correspondiente puntuación a 0
		puntuacion=0;
	}
	
	//Se definen ahora los métodos get correspondientes para poder obtener la infromación del usuario
	public boolean getRegistrado()
	{
		return this.registrado;
	}
	public String getUsuario()
	{
		return this.nombre;
	}
	public String getPassword()
	{
		return this.password;
	}
	public float getPuntuacion()
	{
		return this.puntuacion;
	}
	
	//Se definen ahora lo métodos set correspondientes, con los que se modificará la información relativa al usaurio
	//Cabe destacar que, evidentemente, no se definirá un método set para el usuario
	//Esto se debe a que el nombre de usuairo es fijo, pudiendo cambiar solo el resto de parámetros
	//En estos métodos se devolverá un booleano, que permita identificar al sistema si se han producido cambios o no
	
	public boolean setRegistrado(boolean registrado_param)
	{
		//Primero nos aseguraremos de que el usario no tenga el mismo valor para registrado que el parámetro que se está pasando, en cuyo caso no tendría sentido cambiar este parámetro
		if(this.registrado==registrado_param)
		{
			return false; //No se ha modificado el valor
		}
		else
		{
			this.registrado=registrado_param;
			return true; //En caso de que no coincidan, se modifica el valor
		}
	}
	public boolean setPassword(String password_param)
	{
		//Primero nos aseguraremos de que el usario no tenga el mismo valor para password que el parámetro que se está pasando, en cuyo caso no tendría sentido cambiar este parámetro
		if(this.password.equals(password_param)) //Con el método equals comparamos el contenido de dos String
		{
			return false; //No se ha modificado el valor
		}
		else
		{
			this.password=password_param;
			return true; //En caso de que no coincidan, se modifica el valor
		}
	}
	public boolean setPuntuacion(float puntuacion_param)
	{
		//Primero nos aseguraremos de que el usario no tenga el mismo valor para puntuacion que el parámetro que se está pasando, en cuyo caso no tendría sentido cambiar este parámetro
		if(this.puntuacion==puntuacion_param)
		{
			return false; //No se ha modificado el valor
		}
		else
		{
			this.puntuacion=puntuacion_param;
			return true; //En caso de que no coincidan, se modifica el valor
		}
	}
	
	//EL MÉTODO SIGUIENTE PODRÍA SER DE UTILIDAD, AUNQUE QUIZÁS PUEDA BORRARSE AL FINAL DE LA FASE!!!!
	//Definimos un método con la que podamos pasar a String el contenido de un usuario
	//Para ello hay que hacer override
	
	@Override
	public String toString() 
	{
		return "Usuario: Nombre=" + this.nombre + ", contraseña=" +this.password + ", Puntuación: " +this.puntuacion;
	}
}
