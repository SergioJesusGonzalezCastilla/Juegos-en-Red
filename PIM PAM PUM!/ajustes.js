var sonidoFondo;
var sonidoDisparo;

//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class Ajustes extends Phaser.Scene{

  constructor(){
    super({key:'ajustes'});
  }

  preload(){

    this.load.image('mute','/resources/botones/BotonPausa.png')

    this.load.image('AjustesF', 'resources/FondoDesierto.png')
    this.load.image('Ajustes', 'resources/Ajustes.png')
    .spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 })   
    this.load.audio('sonidoFondo','sounds/BackgroundFightSound.mp3')
    this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
  }

  create(){

    this.add.image(1280/2, 720/2, 'AjustesF');
    this.add.image(700,150,'Ajustes').setScale(1/3);
    sonidoFondo = this.sound.add('sonidoFondo');
    sonidoDisparo = this.sound.add('sonidoDisparo');
    sonidoFondo.loop =true;
    sonidoFondo.play();
    const volver = this.add.sprite(620, 640, 'botonVolver').setInteractive();
        
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
      sonidoFondo.stop();
      sonidoDisparo.play();
      });

    volver.on('pointerup', () => {
      volver.play('buttonHover5');
      });
           
    const mute = this.add.image(WIDTH/2,HEIGHT/2,'mute').setScale(0.25).setInteractive();
      mute.on('pointerdown', () => {
      if (this.sound.mute=true)
      {
        this.sound.mute=false;
      } else {
        this.sound.mute=true;
      }
    });
  }
}