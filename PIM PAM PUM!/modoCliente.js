export class ModoCliente extends Phaser.Scene{

    constructor(){
        super({key:'modoCliente'});
    }

    preload(){

        this.load.image('modoCliente', 'resources/modoServer/OnlineD.png')
        .spritesheet('offlineB','resources/modoServer/EnLocalB.png',{ frameWidth: 510, frameHeight: 720 })   
        .spritesheet('onlineB','resources/modoServer/EnLineaB.png',{ frameWidth: 510, frameHeight: 720 }) 
        .spritesheet('botonInicio','resources/botones/Inicio.png',{ frameWidth: 286, frameHeight: 102 }) 
        .audio('sonidoinicio','sounds/MenuInicioSound.mp3')
        .audio('sonidoDisparo','sounds/disparoSound.mp3')
 

    }

    create(){

        this.add.image(1280/2, 720/2, 'modoCliente');

        var sonidoInicio = this.sound.add('sonidoinicio');
        var sonidoDisparo = this.sound.add('sonidoDisparo');


        const offline = this.add.sprite(930, 360, 'offlineB').setInteractive();
        
        // Botón OFFLINE
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal4288',
              frames: this.anims.generateFrameNumbers('offlineB', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover4288',
              frames: this.anims.generateFrameNumbers('offlineB', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick4288',
              frames: this.anims.generateFrameNumbers('offlineB', { start: 0, end: 0  }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          offline.on('pointerover', () => {
            offline.play('buttonHover4288');
          });

          offline.on('pointerout', () => {
            offline.play('buttonNormal4288');
          });

          offline.on('pointerdown', () => {
            offline.play('buttonClick4288');
              //meter tiempo espera
              this.scene.transition({
                  target: 'mapas',
                  duration:1000,
              });
              sonidoDisparo.play();


              

          });

          offline.on('pointerup', () => {
            offline.play('buttonHover4288');
          });


          const online = this.add.sprite(359, 360, 'onlineB').setInteractive();
        
        // Botón 1v1
        // Define las animaciones del botón
          this.anims.create({
              key: 'buttonNormal4399',
              frames: this.anims.generateFrameNumbers('onlineB', { start: 0, end: 0 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonHover4399',
              frames: this.anims.generateFrameNumbers('onlineB', { start: 1, end: 1 }),
              frameRate: 1,
              repeat: 0
          });

          this.anims.create({
              key: 'buttonClick4399',
              frames: this.anims.generateFrameNumbers('onlineB', { start: 0, end: 0  }),
              frameRate: 1,
              repeat: 0
          });

          // Configura la interactividad del botón
          online.on('pointerover', () => {
            online.play('buttonHover4399');
          });

          online.on('pointerout', () => {
            online.play('buttonNormal4399');
          });

          online.on('pointerdown', () => {
            online.play('buttonClick4399');
              //meter tiempo espera
              this.scene.transition({
                  target: 'registro',
                  duration:1000,
              });
              sonidoDisparo.play();
              
          });

          online.on('pointerup', () => {
            online.play('buttonHover4399');
          });



          const inicio = this.add.sprite(640, 645, 'botonInicio').setInteractive();
        

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

