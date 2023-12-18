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

      var fondo = this.add.image(1280/2, 720/2, 'RegistroF').setInteractive();
      var barra= this.add.image(1291/2, 688/2, 'Barra').setInteractive();
      var barra2= this.add.image(1291/2, 968/2, 'Barra').setInteractive();
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
            text.text += event.key;}

        else if(/^[a-zA-Z0-9]$/.test(event.key)&& Bool2){
            text2.text += event.key;
            console.log('puta');

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
    const crear = this.add.sprite(758, 580, 'Crear').setInteractive();

        
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
      this.scene.transition({
        target: 'mapas',
        duration:1000,
    });
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
       this.scene.transition({
         target: 'mapas',
         duration:1000,
     });
       });
 
       crear.on('pointerup', () => {
        crear.play('buttonHover599999');
       });






    

    }

  }
  
  
