//DEFINICIÓN DE VARIABLES
//Definimos primero un array en el que iremos almacenando los usuarios
var usuariosRegistrados = [];

//MÉTODOS

//Establecemos primero un método que nos permita crear un usuario
//Crear un usuario
function newUser(username, psw) 
{
    $.ajax({
    method:"POST", //Se trata de una petición de tipo post, pues creamos un nuevo recurso
    url:ip.http +"/usuarios", //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
    data:JSON.stringify({nombre: username, password: psw}), //Pasaremos como cadena la información del user
    processData:false, 
    headers:{"Content-Type":"application/json"}
    //En caso de acierto, se saca por consola al usuario
    }).done(function(user) {
        console.log(user)
    //En caso de error, simplemente indicamos que ha habido un error al crear al usuario
    }).fail(function(){
        console.log("Error al crear al usuario");
    })
}
//Establecemos una función a continuación que nos permite cargar a 
function logIn(username, psw){
	$.ajax({
    method:"GET", //Se trata de una petición de tipo get, pues recuperamos recursos existentes
    url:ip.http +"/usuarios/"+ username + "/" + psw, //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
    data:(username,psw), //Pasaremos como cadena la información del user
    processData:false,
    headers:{"Content-Type":"application/json"}
    //En caso de lograr cargarse los usuarios, se sacan por consola
    }).done(function(usuariosRegistrados) {
		console.log(user);
    //En caso de error, simplemente indicamos que ha habido un error al crear al usuario
    }).fail(function(){
        console.log("Error al cargar los usuarios");
    })
}
//Una vez definidas las funciones, determinaremos el comporrtamiento derivado de la interacción con los diferentes elementos
//Englobaremos toda dicha funcionalidad en la siguiente función, que se inicializa cuando el com está listo
$(document).ready(function()
{
    //Indicamos por concola que se ha cargado correctamente
    console.log('El DOM está cargado'); //Únicamente para ayudarnos

    //Una vez que se han cargado los usuarios ya existentes, se puede proceder a definir las funcionalidades para el resto de elementos
	//Comenzaremos por el botón que nos permitirá crear un usuario CUANDO AGAMOS CLICK EN EL
	$("#CreateUserButton").click(function () {
        //Para definir un usuario necesitaremos obtener su nombre y contraseña desde el campo correspondiente
        var UserName = $("#name").val(); //Con val accedemos al valor
        var UserPassword = $("#password").val(); //Con val accedemos al valor
        //Ahora, únicamente en el caso de que UserName y userPassword hayan sido rellenados, se crearía un usuario
        if(UserName!=null && UserPassword!=null)
        {
            //Comprobamos que no estén vacíos dichos campos
            if(UserName.equals('') || UserPassword.equals(''))
            {
                console.log("Rellene todos los campos por favor");
            }
            else
            {
                if(!UserName.contains(' '))
                {
                    //Usamos la función newUser para crear al usuario.
                    newUser(UserName,UserPassword);
                }
                else
                {
                    console.log("El nombre de usuario no puede contener espacios");
                }
            }
        } 
        //En caso de que no se hayan rellenado los campos, se le piden al usuario
        else
        {
            console.log("Rellene todos los campos por favor");
        }
        
        //Una vez que se ha acabado de crear un usuario, volvemos a restaurar los valores de los campos, para que puedan volver a rellenarse
        $("#name").val('');
        $("#password").val('');
    });
    
    
    //Ahora nos centraremos en el botón que nos permite iniciar sesión dados unos usuarios y contraseña, tras hacer click en él
    $("#LogInButton").click(function () {
        //Para definir un usuario necesitaremos obtener su nombre y contraseña desde el campo correspondiente
        var UserName = $("#name").val(); //Con val accedemos al valor
        var UserPassword = $("#password").val(); //Con val accedemos al valor
        //Ahora, únicamente en el caso de que UserName y userPassword hayan sido rellenados, se crearía un usuario
        if(UserName!=null && UserPassword!=null)
        {
            //Comprobamos que no estén vacíos dichos campos
            if(UserName.equals('') || UserPassword.equals(''))
            {
                console.log("Rellene todos los campos por favor");
            }
            else
            {
                    //Usamos la función newUser para crear al usuario.
                    logIn(UserName,UserPassword);
                    //Se indica al usuario que ha iniciado sesión correctamente
                    console.log("Ha iniciado sesión con éxito");
                    //Se desactivan las casillas de iniciar sesión y crear usuario, pues ya no serían necesarias
                    $("#CreateUserButton").disabled=true;
                    $("#LogInButton").disabled=true;
                    //También se desacttivan los campos de texto
                    $("#name").disabled=true;
                    $("#password").disabled=true;
            }
		}
        //En caso de que no se hayan rellenado los campos, se le piden al usuario
        else
        {
            console.log("Rellene todos los campos por favor");
        }
        //En cualquier caso, hayan permqanecido activos o inactivos los campos, se borra el contenido de los mismos
		$("#name").val('');
        $("#password").val('');
    });
})

