var sonidoDisparo;

//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class Opciones extends Phaser.Scene{

  constructor(){
    super({key:'opciones'});
  }

  preload(){

    this.load.image('AjustesF', 'resources/opcionesOnline/FondoOpciones2.png')
    .spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 })   
    .spritesheet('botonModificar','resources/opcionesOnline/ModificarB.png',{ frameWidth: 1076, frameHeight: 129 })
    .spritesheet('botonChat','resources/opcionesOnline/ChatB.png',{ frameWidth: 1076, frameHeight: 129 })    
    this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')

  }

  create(){

    this.add.image(1280/2, 720/2, 'AjustesF');
    sonidoDisparo = this.sound.add('sonidoDisparo');


    const volver = this.add.sprite(620, 230, 'botonVolver').setInteractive();
        
    // Botón VOLVER
    // Define las animaciones del botón
    this.anims.create({
     key: 'buttonNormal5',
      frames: this.anims.generateFrameNumbers('botonVolver', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'buttonHover5',
      frames: this.anims.generateFrameNumbers('botonVolver', { start: 1, end: 1 }),
      frameRate: 1,
        repeat: 0
    });

    this.anims.create({
      key: 'buttonClick5',
      frames: this.anims.generateFrameNumbers('botonVolver', { start: 2, end: 2 }),
      frameRate: 1,
      repeat: 0
    });

    // Configura la interactividad del botón
    volver.on('pointerover', () => {
    volver.play('buttonHover5');
    });

    volver.on('pointerout', () => {
      volver.play('buttonNormal5');
    });

    volver.on('pointerdown', () => {
      volver.play('buttonClick5');
        //meter tiempo espera
      this.scene.transition({
        target: 'menu-inicio',
        duration:1000,
      });
      sonidoDisparo.play();
      });

    volver.on('pointerup', () => {
      volver.play('buttonHover5');
      });
           






      const mod = this.add.sprite(641, 65, 'botonModificar').setInteractive();
        
    // Botón Modificar
    // Define las animaciones del botón
    this.anims.create({
     key: 'buttonNormal5989',
      frames: this.anims.generateFrameNumbers('botonModificar', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'buttonHover5989',
      frames: this.anims.generateFrameNumbers('botonModificar', { start: 1, end: 1 }),
      frameRate: 1,
        repeat: 0
    });

    this.anims.create({
      key: 'buttonClick5989',
      frames: this.anims.generateFrameNumbers('botonModificar', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    // Configura la interactividad del botón
    mod.on('pointerover', () => {
        mod.play('buttonHover5989');
    });

    mod.on('pointerout', () => {
        mod.play('buttonNormal5989');
    });

    mod.on('pointerdown', () => {
        mod.play('buttonClick5989');
        //meter tiempo espera
        this.scene.start('modificar');


      });

      mod.on('pointerup', () => {
        mod.play('buttonHover5989');
      });



      const acc = this.add.sprite(641, 654, 'botonChat').setInteractive();
        
      // Botón Modificar
      // Define las animaciones del botón
      this.anims.create({
       key: 'buttonNormal59889',
        frames: this.anims.generateFrameNumbers('botonChat', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: 0
      });
  
      this.anims.create({
        key: 'buttonHover59889',
        frames: this.anims.generateFrameNumbers('botonChat', { start: 1, end: 1 }),
        frameRate: 1,
          repeat: 0
      });
  
      this.anims.create({
        key: 'buttonClick59889',
        frames: this.anims.generateFrameNumbers('botonChat', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: 0
      });
  
      // Configura la interactividad del botón
      acc.on('pointerover', () => {
        acc.play('buttonHover59889');
      });
  
      acc.on('pointerout', () => {
        acc.play('buttonNormal59889');
      });
  
      acc.on('pointerdown', () => {
        acc.play('buttonClick59889');
          //meter tiempo espera
  
        });
  
        acc.on('pointerup', () => {
            acc.play('buttonHover59889');
        });
  


  }
}

