 var sonidoFondo;
var sonidoDisparo;
 export class gameWinJ1 extends Phaser.Scene{

    constructor(){
        super({key:'winJ1'});
    }

    preload(){

        //FONDO
        this.load.image('Gana Jugador 1', 'resources/Gana1.png')
        this.load.image('Lose','resources/YOU LOSE.png')
        this.load.image('Win','resources/YOU WIN.png')
        .spritesheet('botonInicio','resources/botones/Inicio.png',{ frameWidth: 286, frameHeight: 102 })
        .spritesheet('botonRevancha','resources/botones/Revancha.png',{ frameWidth: 286, frameHeight: 102 })    
    
        //Musica
        this.load.audio('sonidoFondo','sounds/BackgroundFightSound.mp3')
        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
    }

    create(){

        this.add.image(1280/2, 720/2, 'Gana Jugador 1');  
        this.add.image(300,150,'Win').setScale(1/2);
        this.add.image(1000,150,'Lose').setScale(1/2);
        sonidoFondo = this.sound.add('sonidoFondo');
        sonidoDisparo = this.sound.add('sonidoDisparo');
        sonidoFondo.loop =true;
        sonidoFondo.play();
        const inicio = this.add.sprite(846, 318, 'botonInicio').setInteractive();
        
        // Botón VOLVER
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal17',
              frames: this.anims.generateFrameNumbers('botonInicio', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover17',
              frames: this.anims.generateFrameNumbers('botonInicio', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick17',
              frames: this.anims.generateFrameNumbers('botonInicio', { start: 2, end: 2 }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          inicio.on('pointerover', () => {
            inicio.play('buttonHover17');
          });

          inicio.on('pointerout', () => {
            inicio.play('buttonNormal17');
          });

          inicio.on('pointerdown', () => {
            inicio.play('buttonClick17');
              //meter tiempo espera
              this.scene.transition({
                  target: 'menu-inicio',
                  duration:1000,
              });
              sonidoFondo.stop();
              sonidoDisparo.play();
          });

          inicio.on('pointerup', () => {
            inicio.play('buttonHover17');
           
          });



          const revancha = this.add.sprite(446, 318, 'botonRevancha').setInteractive();
        
        // Botón REVANCHA
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal8',
              frames: this.anims.generateFrameNumbers('botonRevancha', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover8',
              frames: this.anims.generateFrameNumbers('botonRevancha', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick8',
              frames: this.anims.generateFrameNumbers('botonRevancha', { start: 2, end: 2 }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          revancha.on('pointerover', () => {
            revancha.play('buttonHover8');
          });

          revancha.on('pointerout', () => {
            revancha.play('buttonNormal8');
          });

          revancha.on('pointerdown', () => {
            revancha.play('buttonClick8');
              //meter tiempo espera
              this.scene.transition({
                  target: 'game',
                  duration:1000,
              });
              sonidoFondo.stop();
              sonidoDisparo.play();
          });

          revancha.on('pointerup', () => {
            revancha.play('buttonHover8');
          });


    }
    

    

    update(){

    }
 }
    

    update(){

    }
 }
