//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class Opciones extends Phaser.Scene{

  constructor(){
    super({key:'opciones'});
  }

  preload(){

    this.load.image('AjustesF', 'resources/opcionesOnline/FondoOpcionesF.png')
    .spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 })   
    .spritesheet('botonModificar','resources/opcionesOnline/ModificarB.png',{ frameWidth: 1076, frameHeight: 129 })
    this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')

  }

  create(){

    this.add.image(1280/2, 720/2, 'AjustesF');
    var sonidoDisparo = this.sound.add('sonidoDisparo');        

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


  }
}
