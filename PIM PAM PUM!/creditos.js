var sonidoFondo;
var sonidoDisparo;
export class Creditos extends Phaser.Scene{

    constructor(){
        super({key:'creditos'});
    }

    preload(){

        this.load.image('Creditos', 'resources/FondoCreditos.png')
        .spritesheet('botonVolver','resources/botones/Volver.png',{ frameWidth: 286, frameHeight: 102 })   
        this.load.audio('sonidoFondo','sounds/BackgroundFightSound.mp3')
        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
    }

    create(){

        this.add.image(1280/2, 720/2, 'Creditos');
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
                  target: 'menu-inicio',
                  duration:1000,
              });
                sonidoFondo.stop();
                sonidoDisparo.play();
          });

          volver.on('pointerup', () => {
            volver.play('buttonHover4');
          });
           
        var cursors = this.input.keyboard.createCursorKeys();
        const keyCodes= Phaser.Input.Keyboard.KeyCodes;
        this.teclaZ= this.input.keyboard.addKey(keyCodes.Z);

    }

    update(){

        if (this.teclaZ.isDown)
        {
         this.scene.start('game');
     
        }
    }

}
