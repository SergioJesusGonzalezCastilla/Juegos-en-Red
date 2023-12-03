var sonidoFondo;
var sonidoDisparo;
export class Mapas extends Phaser.Scene{

    constructor(){
        super({key:'mapas'});
    }

    preload(){

        this.load.image('Mapas', 'resources/mapa/MapaSelecciónProximamente.png')
        .spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 })
        .spritesheet('botonVaqueros','resources/mapa/DueloDePistolas.png',{ frameWidth: 480, frameHeight: 258 })   
        this.load.audio('sonidoFondo','sounds/BackgroundFightSound.mp3')
        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
    }

    create(){

        this.add.image(1280/2, 720/2, 'Mapas');
        sonidoFondo = this.sound.add('sonidoFondo');
        sonidoDisparo = this.sound.add('sonidoDisparo');
        sonidoFondo.loop = true;
        
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
              this.scene.transition({
                  target: 'seleccion',
                  duration:1000,
              });
                sonidoFondo.stop();
                sonidoDisparo.play();
          });

          volver.on('pointerup', () => {
            volver.play('buttonHover4');
          });



          const vaqueros = this.add.sprite(352, 190, 'botonVaqueros').setInteractive();

          // Botón VAQUEROS
        // Define las animaciones del botón
        this.anims.create({
            key: 'buttonNormalV4',
            frames: this.anims.generateFrameNumbers('botonVaqueros', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'buttonHoverV4',
            frames: this.anims.generateFrameNumbers('botonVaqueros', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'buttonClickV4',
            frames: this.anims.generateFrameNumbers('botonVaqueros', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 0
        });

        // Configura la interactividad del botón
        vaqueros.on('pointerover', () => {
            vaqueros.play('buttonHoverV4');
        });

        vaqueros.on('pointerout', () => {
            vaqueros.play('buttonNormalV4');
        });

        vaqueros.on('pointerdown', () => {
            vaqueros.play('buttonClickV4');
            //meter tiempo espera
            this.scene.transition({
                target: 'game',
                duration:1000,
            });
              sonidoFondo.stop();
              sonidoDisparo.play();
        });

        vaqueros.on('pointerup', () => {
            vaqueros.play('buttonHoverV4');
        });

    }

}
