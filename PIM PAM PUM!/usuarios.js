//DEFINICIÓN DE VARIABLES
//Definimos primero un array en el que iremos almacenando los usuarios
var usuariosRegistrados = [];

//MÉTODOS

//Establecemos primero un método que nos permita crear un usuario
//Crear un usuario
function newUser(user) 
{
    $.ajax({
    method:"POST", //Se trata de una petición de tipo post, pues creamos un nuevo recurso
    url:"http://localhost:8080/usuarios", //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
    data:JSON.stringify(user), //Pasaremos como cadena la información del user
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
function loadUsers() {
	$.ajax({
    method:"GET", //Se trata de una petición de tipo get, pues recuperamos recursos existentes
    url:"http://localhost:8080/usuarios", //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
    processData:false,
    headers:{"Content-Type":"application/json"}
    //En caso de lograr cargarse los usuarios, se sacan por consola
    }).done(function(usuariosRegistrados) {
		console.log(usuariosRegistrados);
    //En caso de error, simplemente indicamos que ha habido un error al crear al usuario
    }).fail(function(){
        console.log("Error al cargar los usuarios");
    })
}

//Una vez definidas las funciones, determinaremos el comporrtamiento derivado de la interacción con los diferentes elementos
//Englobaremos toda dicha funcionalidad en la siguiente función, que se inicializa cuando el com está listo
$(document).ready(function(newUsers)
{
    //Indicamos por concola que se ha cargado correctamente
    console.log('El DOM está cargado'); //Únicamente para ayudarnos
	
    //A continuación, agregamos a usuariosRegistrados el conjunto de nuevos usuarios que se hayan creado
    //Para ello, utilizaremos un bucle for
    for (var i = 0; i < newUsers.length; i++) 
    {
        usuariosRegistrados.push(newUsers[i]); //Se van agregando uno a uno
    }

    //Una vez que ya se han agregado todos los usuarios, se cargan
	loadUsuarios(usuariosRegistrados);
	
    //Una vez que se han cargado los usuarios ya existentes, se puede proceder a definir las funcionalidades para el resto de elementos
	//Comenzaremos por el botón que nos permitirá crear un usuario CUANDO AGAMOS CLICK EN EL
	$("#CreateUserButton").click(function () {
        //Para definir un usuario necesitaremos obtener su nombre y contraseña desde el campo correspondiente
        var UserName = $("#name").val(); //Con val accedemos al valor
        var UserPassword = $("#password").val(); //Con val accedemos al valor
        //Ahora, únicamente en el caso de que UserName y userPassword hayan sido rellenados, se crearía un usuario
        if(UserName!=null && UserPassword!=null)
        {
            //Comporbaremos ahora si el usuario ya está en uso
            var repetido=false;//INicializamos la correspondiente variable a false
            for(var i=0;i<usuariosRegistrados.length;i++)
            {
                //Se comprueban todos los nombres de los usuarios registrados
                if(UserName==usuariosRegistrados[i].nombre)
                {
                    //Si coincide con alguno, se cambia el valor de la variable
                    repetido=true;
                }
            }
            //En caso de que ese nombre ya está en uso, se pide que se introduzca otro nombre
            if(repetido==true)
            {
                console.log("Introduzca otro nombre");
            }
            //En caso contrario, se crea un nuevo usuario
            else
            {
                //Creamos un usuario en JSON
                var user = 
                {
                    nombre: UserName,
                    password: UserPassword
                }
                //Agremos el nuevo usuario al conjunto de usuarios registrados
                usuariosRegistrados.push(user);
                //Usamos la función newUser para crear al usuario.
                newUser(user);
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
            //Ahora se comprueba toda la lista de usuarios cargados para detectar un usuario con ese nombre, que sería en el que se quiere iniciar sesión
            for(var i=0;i<usuariosRegistrados.length;i++)
		    {
                //En caso de coincidir, se comprobará también si coincide la contraseña
                if(UserName==usuariosRegistrados[i].nombre)
                {
                    //En caso de que no coincida la contraseña introducida con la real, se le indica al usuario
                    if(UserPassword!=usuariosRegistrados[i].password)
                    {
                        UserPassword.log("No ha introducido la contraseña correcta");
                    }
                    //En caso de haber introducido la contraseña correcta
                    else
                    {
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
                //Si no hay ningún usuario con dicho nombre de usuario, se indica
                {
                    console.log("Su usuario no está registrado");
                }
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