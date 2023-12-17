package com.example.demo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class ConversorTexto {

	//Definimos un array de strings vacío inicialmente en el que se almacenarán los mensajes del chat
	String [] chat = new String[0];
	
	//Primero definimos un método con el que se extenderá la cadena en caso de que se tenga que añadir más contendio
	//Este método nos devolverá una nueva cadena de mayor longitud
	public static String[] agregarElementos(String[] cadena, String adicion) {
		//Inicialmente definimos una cadena nueva, que tendrá más longitud que la anterior
	    String[] nuevaCadena = new String[cadena.length + 1];
	    //A continuación, utilizamos copiamos todos los elementos de la cadena original en la nueva cadena
	    for(int i=0;i<cadena.length;i++)
	    {
	    	nuevaCadena[i]=cadena[i];
	    }
	    //Finalmente, agregamos el nuevo elemento al array
	    nuevaCadena[cadena.length] = adicion;
	    //Finalmente, devolvemos la cadena ya actualizada
	    return nuevaCadena;
	}
	
	//Creamos un método con el que agregamos texto a la cadena
	public void agregarTexto(File fichero, String cadena)
	{
		//Primero se comporbará si la cadena está o no vacía
		try
		{
			//En caso de que el fichero no se haya creado aún se crea un nuevo fichero
			if(!fichero.exists())
			{
				fichero.createNewFile();
			}
			//Ahora que ya tenemos un fichero operativo, podemos empezar a agregar información
			//Para ello utilizaremos objetos de las clases BufferedWriter y FileWriter
			//Estas serán importadas para poder ser utilizadas
			//De esta forma, podremos utilizar finalmente el fichero
			//¡La siguiente sentencia try la ha automatizado el programa, así que supongo que será algo más eficiente!
			try (BufferedWriter writer = new BufferedWriter(new FileWriter(fichero))) 
			{
				//A continuación agregamos al string chat la información que adicional
				chat=agregarElementos(chat, cadena);
				//Ahora agregamos todos los elementos de la cadena al string
				for (int i=0;i<chat.length;i++) 
				{
					writer.write(chat[i] + "\n"); //Saltaremos de línea tras cada palabra
				}
			}
		}
		catch(IOException ioe)
		{
			//Con la siguiente sentencia, se imprime tanto el error como la línea en la que ha tenido lugar
			//Nos puede ser de muchísima utilidad a la hora de detectar errores
			ioe.printStackTrace();
		}
	}
	
	//Finalmente, definimos un método que nos permite leer el contenido del fichero
	public String[] leerFichero (File fichero)
	{
		try (BufferedReader reader = new BufferedReader(new FileReader(fichero))) 
		{
			//Se crea un array de strings en el que se irá almacenando la información leída
			String[] leido=new String[0];
			//Se lee el primer elmento para comporbar que no está vacío, de cara a leer el resto
			leido=agregarElementos(leido,reader.readLine());
			//Se le agregan los elementos almacenados en el fichero mientras este no se encuentre vacío
			for(int i = 0; leido[i] != null; i++)
			{
				leido=agregarElementos(leido,reader.readLine());
			}
			//Finalmente, se devuelve el string correspondeinte
			return leido;
		}
		catch(IOException ioe)
		{
			//Con la siguiente sentencia, se imprime tanto el error como la línea en la que ha tenido lugar
			//Nos puede ser de muchísima utilidad a la hora de detectar errores
			ioe.printStackTrace();
			return null;
		}
	}
}

