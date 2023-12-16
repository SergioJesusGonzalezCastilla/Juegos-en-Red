export class Seleccion extends Phaser.Scene{

    constructor(){
        super({key:'seleccion'});
    }

    preload(){

        this.load.image('Seleccion', 'resources/seleccion/FondoEscenaSeleccion.png')
        .spritesheet('boton1v1','resources/seleccion/1v1Boton.png',{ frameWidth: 511, frameHeight: 720 })   
        .spritesheet('botontuto','resources/seleccion/tutorialBoton.png',{ frameWidth: 513, frameHeight: 720 }) 
        .spritesheet('botonInicio','resources/botones/Inicio.png',{ frameWidth: 286, frameHeight: 102 }) 
        .audio('sonidoinicio','sounds/MenuInicioSound.mp3')
        .audio('sonidoDisparo','sounds/disparoSound.mp3')
 

    }

    create(){

        this.add.image(1280/2, 720/2, 'Seleccion');

        var sonidoInicio = this.sound.add('sonidoinicio');
        var sonidoDisparo = this.sound.add('sonidoDisparo');


        const tuto = this.add.sprite(355, 360, 'botontuto').setInteractive();
        
        // Botón TUTORIAL
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal42',
              frames: this.anims.generateFrameNumbers('botontuto', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover42',
              frames: this.anims.generateFrameNumbers('botontuto', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick42',
              frames: this.anims.generateFrameNumbers('botontuto', { start: 0, end: 0  }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          tuto.on('pointerover', () => {
            tuto.play('buttonHover42');
          });

          tuto.on('pointerout', () => {
            tuto.play('buttonNormal42');
          });

          tuto.on('pointerdown', () => {
            tuto.play('buttonClick42');
              //meter tiempo espera
              this.scene.transition({
                  target: 'simulador',
                  duration:1000,
              });
              sonidoDisparo.play();


              

          });

          tuto.on('pointerup', () => {
            tuto.play('buttonHover4');
          });





          const unovuno = this.add.sprite(920, 360, 'boton1v1').setInteractive();
        
        // Botón 1v1
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal43',
              frames: this.anims.generateFrameNumbers('boton1v1', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover43',
              frames: this.anims.generateFrameNumbers('boton1v1', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick43',
              frames: this.anims.generateFrameNumbers('boton1v1', { start: 0, end: 0  }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          unovuno.on('pointerover', () => {
            unovuno.play('buttonHover43');
          });

          unovuno.on('pointerout', () => {
            unovuno.play('buttonNormal43');
          });

          unovuno.on('pointerdown', () => {
            unovuno.play('buttonClick43');
              //meter tiempo espera
              this.scene.transition({
                  target: 'modoCliente',
                  duration:1000,
              });
              sonidoDisparo.play();
              
          });

          unovuno.on('pointerup', () => {
            unovuno.play('buttonHover43');
          });

          const inicio = this.add.sprite(640, 630, 'botonInicio').setInteractive();
        

          // Botón INICIO
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
                sonidoDisparo.play();

  
            });
  
            inicio.on('pointerup', () => {
              inicio.play('buttonHover17');
            });




    }
}
