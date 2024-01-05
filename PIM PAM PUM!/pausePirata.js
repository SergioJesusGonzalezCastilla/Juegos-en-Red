//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class PausaPirata extends Phaser.Scene{

    constructor(){
        super({key:'pausePiratas'});
    }

    preload(){
      //FONDO
      this.load.image('Fondo', 'resources/pausa/PausaFondoPiratas.png');
      //EFECTO SONIDO
      this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
      //BOTONES
      this.load.spritesheet('quit','resources/pausa/PausaAbandonar.png',{ frameWidth: 286, frameHeight: 63 });

      this.load.spritesheet('restart','resources/pausa/PausaReiniciar.png',{ frameWidth: 286, frameHeight: 63 });
        
      this.load.spritesheet('back','resources/pausa/PausaVolver.png',{ frameWidth: 286, frameHeight: 63 });
    }

    create () 
    {
        var sonidoDisparo = this.sound.add('sonidoDisparo');

        //FONDO
        this.add.image(1280/2, 720/2, 'Fondo'); 
      
        const reinicio = this.add.sprite(WIDTH/2,HEIGHT/1.5, 'restart').setInteractive();
        
        // Botón REINICIO
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal5555',
              frames: this.anims.generateFrameNumbers('restart', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover5555',
              frames: this.anims.generateFrameNumbers('restart', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick5555',
              frames: this.anims.generateFrameNumbers('restart', { start: 2, end: 2 }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          reinicio.on('pointerover', () => {
            reinicio.play('buttonHover5555');
          });

          reinicio.on('pointerout', () => {
            reinicio.play('buttonNormal5555');
          });

          reinicio.on('pointerdown', () => {
            reinicio.play('buttonClick5555');
            this.scene.stop('gamePiratas');
            this.scene.start('gamePiratas');
            sonidoDisparo.play();
          });

          reinicio.on('pointerup', () => {
            reinicio.play('buttonHover5555');
          });

          const quit = this.add.sprite(WIDTH/2,HEIGHT/2, 'quit').setInteractive();
        
          // Botón ABANDONAR
          // Define las animaciones del botón
            this.anims.create({
                key: 'buttonNormal6',
                frames: this.anims.generateFrameNumbers('quit', { start: 0, end: 0 }),
                frameRate: 1,
                repeat: 0
            });
  
            this.anims.create({
                key: 'buttonHover6',
                frames: this.anims.generateFrameNumbers('quit', { start: 1, end: 1 }),
                frameRate: 1,
                repeat: 0
            });
  
            this.anims.create({
                key: 'buttonClick6',
                frames: this.anims.generateFrameNumbers('quit', { start: 2, end: 2 }),
                frameRate: 1,
                repeat: 0
            });
  
            // Configura la interactividad del botón
            quit.on('pointerover', () => {
              quit.play('buttonHover6');
            });
  
            quit.on('pointerout', () => {
              quit.play('buttonNormal6');
            });
  
            quit.on('pointerdown', () => {
              quit.play('buttonClick6');
              this.scene.stop('gamePiratas');
              this.scene.start('menu-inicio');
              sonidoDisparo.play();
            });
  
            quit.on('pointerup', () => {
              quit.play('buttonHover6');
            });

        const volver = this.add.sprite(WIDTH/2, 240, 'back').setInteractive();
        
        // Botón VOLVER
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal7',
              frames: this.anims.generateFrameNumbers('back', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover7',
              frames: this.anims.generateFrameNumbers('back', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick7',
              frames: this.anims.generateFrameNumbers('back', { start: 2, end: 2 }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          volver.on('pointerover', () => {
            volver.play('buttonHover7');
          });

          volver.on('pointerout', () => {
            volver.play('buttonNormal7');
          });

          volver.on('pointerdown', () => {
            volver.play('buttonClick7');
            this.scene.switch('gamePiratas');
            sonidoDisparo.play();
          });

          volver.on('pointerup', () => {
            volver.play('buttonHover7');
          });
    }
}
