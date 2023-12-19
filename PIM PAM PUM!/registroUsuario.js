export class Registro extends Phaser.Scene{

    constructor(){
      super({key:'registro'});
    }
    preload(){
  
      this.load.image('RegistroF', 'resources/registro/RegistroUsuarios.png')
      .image('Barra','resources/registro/Banda.png')
      .spritesheet('Acceder','resources/registro/AccederB.png',{ frameWidth: 156, frameHeight: 70 })   
      .spritesheet('Crear','resources/registro/CrearB.png',{ frameWidth: 156, frameHeight: 70 }) 
      
    }
  
    create(){
        var Bool1 = false;
        var Bool2 = false;
        var creado=false;
        var iniciado=false;

      var fondo = this.add.image(1280/2, 720/2, 'RegistroF').setInteractive();
      var barra= this.add.image(1291/2, 688/2, 'Barra').setInteractive();
      barra.setData('name','acceder');

      var barra2= this.add.image(1291/2, 968/2, 'Barra').setInteractive();
      barra2.setData('password','acceder');

      var text = this.add.text(980/2, 655/2,'', { fontSize: '32px', fill: '#000' }).setInteractive();
      var text2 = this.add.text(980/2, 930/2,'', { fontSize: '32px', fill: '#000' }).setInteractive();

      fondo.on('pointerdown', () => {
        Bool1 = false;
        Bool2 = false;
      });

      text.on('pointerdown', () => {
        Bool1 = true;
        Bool2 = false;
      });

      text2.on('pointerdown', () => {
        Bool1 = false;
        Bool2 = true;
      });

      barra.on('pointerdown', () => {
        Bool1 = true;
        Bool2 = false;
      });

      barra2.on('pointerdown', () => {
        Bool1 = false;
        Bool2 = true;
      });

      this.input.keyboard.on('keydown', function (event) {
        // Verificar si se ha presionado una tecla alfanumérica
        if (/^[a-zA-Z0-9]$/.test(event.key)&& Bool1) {
            // Actualizar el texto con la tecla presionada
            
            text.text += event.key;
            const buttonId = barra.getData('name');
            }

        else if(/^[a-zA-Z0-9]$/.test(event.key)&& Bool2){
            text2.text += '*';
          //text2.text += event.key;
            const buttonId = barra.getData('password');
        } 

        else if (event.key === 'Backspace'&& Bool1) {
            // Eliminar el último carácter si se presiona la tecla "Backspace"
            text.text = text.text.slice(0, -1);
        }
        else if (event.key === 'Backspace'&& Bool2) {
            // Eliminar el último carácter si se presiona la tecla "Backspace"
            text2.text = text2.text.slice(0, -1);
        }
    });


    //////////////////////////////////////////
    //Botones
    const acceder = this.add.sprite(524, 580, 'Acceder').setInteractive();
    acceder.setData('LogInButton','acceder');
    const crear = this.add.sprite(758, 580, 'Crear').setInteractive();
    crear.setData('CreateUserButton','crear');

        
    // Botón ACCEDER
    // Define las animaciones del botón
    this.anims.create({
     key: 'buttonNormal59999',
      frames: this.anims.generateFrameNumbers('Acceder', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'buttonHover59999',
      frames: this.anims.generateFrameNumbers('Acceder', { start: 1, end: 1 }),
      frameRate: 1,
        repeat: 0
    });

    this.anims.create({
      key: 'buttonClick59999',
      frames: this.anims.generateFrameNumbers('Acceder', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    // Configura la interactividad del botón
    acceder.on('pointerover', () => {
      acceder.play('buttonHover59999');
    });

    acceder.on('pointerout', () => {
      acceder.play('buttonNormal59999');
    });

    acceder.on('pointerdown', () => {
      acceder.play('buttonClick59999');
      const LogInButton = acceder.getData('LogInButton');
      console.log(`Se hizo clic en el botón con ID: ${LogInButton}`);
      //Ahora nos centraremos en el botón que nos permite iniciar sesión dados unos usuarios y contraseña, tras hacer click en él
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
                  $.ajax({
                    method:"GET", //Se trata de una petición de tipo get, pues recuperamos recursos existentes
                    url:ip.http +"/usuarios/"+ UserName + "/" + UserPassword, //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
                    data:(UserName,UserPassword), //Pasaremos como cadena la información del user
                    processData:false,
                    headers:{"Content-Type":"application/json"}
                    //En caso de lograr cargarse los usuarios, se sacan por consola
                    }).done(function(usuariosRegistrados) {
                    console.log(user);
                    iniciado=true;
                    //En caso de error, simplemente indicamos que ha habido un error al crear al usuario
                    }).fail(function(){
                        console.log("Error al cargar los usuarios");
                    })
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
      if(iniciado)
      {
      this.scene.transition({
        target: 'opciones',
        duration:1000,
    });}
      });

      acceder.on('pointerup', () => {
        acceder.play('buttonHover59999');
      });
    // Botón CREAR
    // Define las animaciones del botón
    this.anims.create({
      key: 'buttonNormal599999',
       frames: this.anims.generateFrameNumbers('Crear', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     this.anims.create({
       key: 'buttonHover599999',
       frames: this.anims.generateFrameNumbers('Crear', { start: 1, end: 1 }),
       frameRate: 1,
         repeat: 0
     });
 
     this.anims.create({
       key: 'buttonClick599999',
       frames: this.anims.generateFrameNumbers('Crear', { start: 0, end: 0 }),
       frameRate: 1,
       repeat: 0
     });
 
     // Configura la interactividad del botón
     crear.on('pointerover', () => {
      crear.play('buttonHover599999');
     });
 
     crear.on('pointerout', () => {
      crear.play('buttonNormal599999');
     });
 
     crear.on('pointerdown', () => {
      crear.play('buttonClick599999');
      const buttonId = crear.getData('CreateUserButton');
      console.log(`Se hizo clic en el botón con ID: ${buttonId}`);
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
                $.ajax({
                  method:"POST", //Se trata de una petición de tipo post, pues creamos un nuevo recurso
                  url:ip.http +"/usuarios", //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
                  data:JSON.stringify({nombre: UserName, UserName: psw}), //Pasaremos como cadena la información del user
                  processData:false, 
                  headers:{"Content-Type":"application/json"}
                  //En caso de acierto, se saca por consola al usuario
                  }).done(function(user) {
                      console.log(user)
                      creado=true;
                  //En caso de error, simplemente indicamos que ha habido un error al crear al usuario
                  }).fail(function(){
                      console.log("Error al crear al usuario");
                  })
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
      if(creado)
      {
       this.scene.transition({
         target: 'opciones',
         duration:1000,
        });
      }
       });
 
       crear.on('pointerup', () => {
        crear.play('buttonHover599999');
       });
    }

  }
