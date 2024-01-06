var sonidoFondo;
var sonidoDisparo;
export class Mapas extends Phaser.Scene{

    constructor(){
        super({key:'mapas'});
    }

    preload(){

        this.load.image('Mapas', 'resources/mapa/ENC.png')
        .spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 })
        .spritesheet('botonVaqueros','resources/mapa/dueloB.png',{ frameWidth: 498, frameHeight: 720 })
        .spritesheet('botonPiratas','resources/mapa/asaltoB.png',{ frameWidth: 498, frameHeight: 720 })      
        this.load.audio('sonidoFondo','sounds/BackgroundFightSound.mp3')
        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
    }

    create(){

        this.add.image(1280/2, 720/2, 'Mapas');
        sonidoFondo = this.sound.add('sonidoFondo');
        sonidoDisparo = this.sound.add('sonidoDisparo');
        sonidoFondo.loop = true;

        const vaqueros = this.add.sprite(352, 360, 'botonVaqueros').setInteractive();

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
            frames: this.anims.generateFrameNumbers('botonVaqueros', { start: 2, end: 2 }),
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
            vaqueros.play('buttonHoverP4');
        });


        const piratas = this.add.sprite(926, 360, 'botonPiratas').setInteractive();

          // Botón PIRATAS
        // Define las animaciones del botón
        this.anims.create({
            key: 'buttonNormalP4',
            frames: this.anims.generateFrameNumbers('botonPiratas', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'buttonHoverP4',
            frames: this.anims.generateFrameNumbers('botonPiratas', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'buttonClickP4',
            frames: this.anims.generateFrameNumbers('botonPiratas', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: 0
        });

        // Configura la interactividad del botón
        piratas.on('pointerover', () => {
            piratas.play('buttonHoverP4');
        });

        piratas.on('pointerout', () => {
            piratas.play('buttonNormalP4');
        });

        piratas.on('pointerdown', () => {
            piratas.play('buttonClickP4');
            //meter tiempo espera
            this.scene.transition({
                target: 'gamePiratas',
                duration:1000,
            });
              sonidoFondo.stop();
              sonidoDisparo.play();
        });

        piratas.on('pointerup', () => {
            piratas.play('buttonHoverP4');
        });


         const volver = this.add.sprite(1280/2, 1300/2, 'botonVolver').setInteractive();
        
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

    }

}

