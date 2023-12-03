//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class Pausa extends Phaser.Scene{

    constructor(){
        super({key:'pause'});
    }

    preload(){
        //FONDO
        this.load.image('Simulador', 'resources/simulador/SimuladorFondo.png');

        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')

        this.load.image('quit','/resources/botones/BotonPausa.png')

        this.load.image('restart','/resources/botones/no tocar/InicioBoton.png')
        
        this.load.spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 });
    }

    create () 
    {
        //FONDO
        this.add.image(1280/2, 720/2, 'Simulador'); 

        const restart = this.add.image(WIDTH/2,HEIGHT/1.5,'restart').setScale(0.25).setInteractive();
        restart.on('pointerdown', () => {
            this.scene.stop('game');
            this.scene.start('game');
          });

        const quit = this.add.image(WIDTH/2,HEIGHT/2,'quit').setScale(0.25).setInteractive();
        quit.on('pointerdown', () => {
            this.scene.stop('game');
            this.scene.start('menu-inicio');
          });

        const volver = this.add.sprite(620, 640, 'botonVolver').setInteractive();
        
        // Botón VOLVER
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal4',
              frames: this.anims.generateFrameNumbers('botonVolver', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover4',
              frames: this.anims.generateFrameNumbers('botonVolver', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick4',
              frames: this.anims.generateFrameNumbers('botonVolver', { start: 2, end: 2 }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          volver.on('pointerover', () => {
            volver.play('buttonHover4');
          });

          volver.on('pointerout', () => {
            volver.play('buttonNormal4');
          });

          volver.on('pointerdown', () => {
            volver.play('buttonClick4');
              //meter tiempo espera
              this.scene.switch('game');
                //sonidoDisparo.play();
          });

          volver.on('pointerup', () => {
            volver.play('buttonHover4');
          });
    }
}