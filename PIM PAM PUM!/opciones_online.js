var sonidoDisparo;

//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

export class Opciones extends Phaser.Scene {

	constructor() {
		super({ key: 'opciones' });
	}

	preload() {

		this.load.image('AjustesF', 'resources/opcionesOnline/FondoOpcionesF.png')
   			.spritesheet('botonJugarB','resources/opcionesOnline/jugarB.png',{ frameWidth: 966, frameHeight: 457 })
			.spritesheet('botonModificar', 'resources/opcionesOnline/ModificarB.png', { frameWidth: 1076, frameHeight: 129 })
		this.load.audio('sonidoDisparo', 'sounds/disparoSound.mp3')

	}

	create() {

		//Se recibe el nombre del usuario 
		var userNameFromPreviousScene;
		if (this.scene.settings && this.scene.settings.data) {
		    userNameFromPreviousScene = this.scene.settings.data.UserName;
		    console.log('UserName:', userNameFromPreviousScene);
		} else {
		    console.error('No se pudo obtener el nombre del usuario.');
		}
		
		this.add.image(1280 / 2, 720 / 2, 'AjustesF');
		var sonidoDisparo = this.sound.add('sonidoDisparo');

		const mod = this.add.sprite(641, 65, 'botonModificar').setInteractive();

		// Botón Modificar
		// Define las animaciones del botón
		this.anims.create({
			key: 'buttonNormal5989',
			frames: this.anims.generateFrameNumbers('botonModificar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonHover5989',
			frames: this.anims.generateFrameNumbers('botonModificar', { start: 1, end: 1 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonClick5989',
			frames: this.anims.generateFrameNumbers('botonModificar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		// Configura la interactividad del botón
		mod.on('pointerover', () => {
			mod.play('buttonHover5989');
		});

		mod.on('pointerout', () => {
			mod.play('buttonNormal5989');
		});

		mod.on('pointerdown', () => {
			mod.play('buttonClick5989');
			//meter tiempo espera
			sonidoDisparo.play();
			this.scene.transition({
				target: 'modificar',
				duration:1000,
				data: { UserName: userNameFromPreviousScene }
			});


		});

		mod.on('pointerup', () => {
			mod.play('buttonHover5989');
		});

		const acc = this.add.sprite(641, 360, 'botonJugarB').setInteractive();
		        
		      // Botón Jugar
		      // Define las animaciones del botón
		      this.anims.create({
		       key: 'buttonNormal59889',
		        frames: this.anims.generateFrameNumbers('botonJugarB', { start: 0, end: 0 }),
		        frameRate: 1,
		        repeat: 0
		      });
		  
		      this.anims.create({
		        key: 'buttonHover59889',
		        frames: this.anims.generateFrameNumbers('botonJugarB', { start: 1, end: 9 }),
		        frameRate: 15,
		          repeat: 0
		      });
		  
		      this.anims.create({
		        key: 'buttonClick59889',
		        frames: this.anims.generateFrameNumbers('botonJugarB', { start: 10, end: 10 }),
		        frameRate: 1,
		        repeat: 0
		      });
		  
		      // Configura la interactividad del botón
		      acc.on('pointerover', () => {
		        acc.play('buttonHover59889');
		      });
		  
		      acc.on('pointerout', () => {
		        acc.play('buttonNormal59889');
		      });
		  
		      acc.on('pointerdown', () => {
		        acc.play('buttonClick59889');
		          //meter tiempo espera
		          this.scene.transition({
		            target: 'gameonline',
		            duration:1000,
			    data: { UserName: userNameFromPreviousScene }
		        });
		        sonidoDisparo.play();
		        });
		  
		        acc.on('pointerup', () => {
		            acc.play('buttonHover59889');
		        });
		
	}
}
