var sonidoFondoA;
var sonidoDisparo;

//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class Ajustes extends Phaser.Scene{

  constructor(){
    super({key:'ajustes'});
  }

  preload(){

    this.load.image('AjustesF', 'resources/ajustes/FondoAjustesFinal.png')
    .spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 })   
    .spritesheet('musicaBoton','resources/ajustes/musicaB.png',{ frameWidth: 370, frameHeight: 77 })   
    this.load.audio('sonidoFondoA','sounds/meme.mp3')
    this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
    .image('MEME', 'resources/meme.png')

  }

  create(){

    this.add.image(1280/2, 720/2, 'AjustesF');
    sonidoFondoA = this.sound.add('sonidoFondoA');
    sonidoDisparo = this.sound.add('sonidoDisparo');
    sonidoFondoA.loop =true;
    sonidoFondoA.play();


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
      sonidoFondoA.stop();
      sonidoDisparo.play();
      });

    volver.on('pointerup', () => {
      volver.play('buttonHover5');
      });
           






      const mute = this.add.sprite(620, 640, 'musicaBoton').setInteractive();
        
    // Botón VOLVER
    // Define las animaciones del botón
    this.anims.create({
     key: 'buttonNormal599',
      frames: this.anims.generateFrameNumbers('musicaBoton', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: 'buttonHover599',
      frames: this.anims.generateFrameNumbers('musicaBoton', { start: 1, end: 1 }),
      frameRate: 1,
        repeat: 0
    });

    this.anims.create({
      key: 'buttonClick599',
      frames: this.anims.generateFrameNumbers('musicaBoton', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    // Configura la interactividad del botón
    mute.on('pointerover', () => {
      mute.play('buttonHover599');
    });

    mute.on('pointerout', () => {
      mute.play('buttonNormal599');
    });

    mute.on('pointerdown', () => {
      mute.play('buttonClick599');
        //meter tiempo espera
        this.game.musicaGlobal.sonidoFondoA.setVolume(0);

      });

      mute.on('pointerup', () => {
        mute.play('buttonHover599');
      });




    this.add.image(1280/2, 820/2, 'MEME').setScale(1/4);   

  }
}
