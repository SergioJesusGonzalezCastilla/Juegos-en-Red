var sonidoFondoG2;
var sonidoDisparo;
export class gameWinJ2 extends Phaser.Scene{

    constructor(){
        super({key:'winJ2'});
    }

    
    preload(){

        //FONDO
        this.load.image('Gana Jugador 2', 'resources/ganadores/GanaJu2.png')   
        .spritesheet('botonInicio','resources/botones/Inicio.png',{ frameWidth: 286, frameHeight: 102 })
        .spritesheet('botonRevancha','resources/botones/Revancha.png',{ frameWidth: 286, frameHeight: 102 })    
    
        //Musica
        this.load.audio('sonidoGana2','resources/ganadores/ganaJugador2.mp3')
        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
    }

    create(){

		//Se recibe el nombre del usuario 
		var userNameFromPreviousScene;
		if (this.scene.settings && this.scene.settings.data) {
		    userNameFromPreviousScene = this.scene.settings.data.UserName;
		    console.log('UserName:', userNameFromPreviousScene);
		} else {
		    console.error('No se pudo obtener el nombre del usuario.');
		}
		var escena_origen;
		if (this.scene.settings && this.scene.settings.data) {
		    escena_origen = this.scene.settings.data.origen;
		    console.log('UserName:', escena_origen);
		} else {
		    console.error('No se pudo obtener el nombre del usuario.');
		}
		//Esstablecemos el objetivo de la escena:
		var destino;
		if(escena_origen==='online')
		{
			destino='gameonline';
		}
		else
		{
			destino='game';
		}
		
        this.add.image(1280/2, 720/2, 'Gana Jugador 2');  
        sonidoFondoG2 = this.sound.add('sonidoGana2');
        sonidoDisparo = this.sound.add('sonidoDisparo');
        sonidoFondoG2.loop =true;
        sonidoFondoG2.play();   
        
        const inicio = this.add.sprite(946, 70, 'botonInicio').setInteractive();
        
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
              sonidoFondoG2.stop();
              sonidoDisparo.play();
          });

          inicio.on('pointerup', () => {
            inicio.play('buttonHover17');
          });



          const revancha = this.add.sprite(346, 70, 'botonRevancha').setInteractive();
        
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
                  target: destino,
                  duration:1000,
                  data: { UserName: userNameFromPreviousScene }
              });
              sonidoFondoG2.stop();
              sonidoDisparo.play();
          });

          revancha.on('pointerup', () => {
            revancha.play('buttonHover8');
          });


    }

    update(){

    }
 }
