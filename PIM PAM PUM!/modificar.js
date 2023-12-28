//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

var sonidoDisparo;

export class Modificar extends Phaser.Scene {

	constructor() {
		super({ key: 'modificar' });
	}

	preload() {

		this.load.image('ModificarF', 'resources/modificar/NewFondo.png')
			.spritesheet('botonEliminar', 'resources/modificar/eliminarB.png', { frameWidth: 720, frameHeight: 53 })
			.spritesheet('botonCambiar', 'resources/modificar/cambiarB.png', { frameWidth: 720, frameHeight: 53 })
			.spritesheet('botonAtras', 'resources/modificar/atrasB.png', { frameWidth: 720, frameHeight: 53 })
			.spritesheet('botonCerrar', 'resources/modificar/cerrarB.png', { frameWidth: 720, frameHeight: 53 })
			.image('Escribir', 'resources/modificar/Introducir.png', { frameWidth: 720, frameHeight: 53 })
			.image('Verificar', 'resources/modificar/verificar.png')
			.audio('sonidoDisparo', 'sounds/disparoSound.mp3')
			.image('Barra', 'resources/registro/Banda.png')

	}

	create() {

		sonidoDisparo = this.sound.add('sonidoDisparo');
		var fondo = this.add.image(1280 / 2, 720 / 2, 'ModificarF').setInteractive();

		const eliminar = this.add.sprite(1775 / 2, 650 / 2, 'botonEliminar').setInteractive();
		const cambiar = this.add.sprite(1775 / 2, 400 / 2, 'botonCambiar').setInteractive();
		const atras = this.add.sprite(1775 / 2, 900 / 2, 'botonAtras').setInteractive();
		const cerrar = this.add.sprite(1775 / 2, 1180 / 2, 'botonCerrar').setInteractive();

		var cambio = false;
		var ok = false;
		//no se crea hasta que seleccione el botón de cambiar contraseña
		/////////const escribir=this.add.sprite(1280/2, 540/2, 'Escribir').setInteractive();
		//añadir texto





		var Bool1 = false;
		var Bool2 = false;
		var Bool3 = false;
		var eliminado = false;
		var deslogueado = false;

		var creado = false;
		var iniciado = false;

		var barra = this.add.image(509 / 2, 532 / 2, 'Barra').setInteractive();
		barra.setData('name', 'acceder');

		var barra2 = this.add.image(509 / 2, 810 / 2, 'Barra').setInteractive();
		barra2.setData('password', 'acceder');

		var barra3 = this.add.image(509 / 2, 1094 / 2, 'Barra').setInteractive();
		barra3.setData('password', 'acceder');

		var text = this.add.text(280 / 2, 504 / 2, '', { fontSize: '32px', fill: '#000' }).setInteractive();
		var text2 = this.add.text(280 / 2, 790 / 2, '', { fontSize: '32px', fill: '#000' }).setInteractive();
		var text2Aux = this.add.text(5000, 5000, '', { fontSize: '32px', fill: '#000' }).setInteractive();
		var text3 = this.add.text(280 / 2, 1076 / 2, '', { fontSize: '32px', fill: '#000' }).setInteractive();
		var text3Aux = this.add.text(5000, 5000, '', { fontSize: '32px', fill: '#000' }).setInteractive();


		text.on('pointerdown', () => {
			Bool1 = true;
			Bool2 = false;
			Bool3 = false;

		});

		text2.on('pointerdown', () => {
			Bool1 = false;
			Bool2 = true;
			Bool3 = false;

		});

		text3.on('pointerdown', () => {
			Bool1 = false;
			Bool2 = false;
			Bool3 = true;

		});

		barra.on('pointerdown', () => {
			Bool1 = true;
			Bool2 = false;
			Bool3 = false;

		});

		barra2.on('pointerdown', () => {
			Bool1 = false;
			Bool2 = true;
			Bool3 = false;

		});
		barra3.on('pointerdown', () => {
			Bool1 = false;
			Bool2 = false;
			Bool3 = true;

		});


		this.input.keyboard.on('keydown', function(event) {
			// Verificar si se ha presionado una tecla alfanumérica
			if (/^[a-zA-Z0-9]$/.test(event.key) && Bool1) {
				// Actualizar el texto con la tecla presionada

				text.text += event.key;
				const buttonId = barra.getData('name');
			}

			else if (/^[a-zA-Z0-9]$/.test(event.key) && Bool2) {
				text2.text += '*';
				text2Aux.text += event.key;
				const buttonId = barra.getData('password');
			}
			else if (/^[a-zA-Z0-9]$/.test(event.key) && Bool3) {
				text3.text += '*';
				text3Aux.text += event.key;
				const buttonId = barra.getData('password');
			}
			else if (event.key === 'Backspace' && Bool1) {
				// Eliminar el último carácter si se presiona la tecla "Backspace"
				text.text = text.text.slice(0, -1);
			}
			else if (event.key === 'Backspace' && Bool2) {
				// Eliminar el último carácter si se presiona la tecla "Backspace"
				text2.text = text2.text.slice(0, -1);
				text2Aux.text = text2Aux.text.slice(0, -1);
			}
			else if (event.key === 'Backspace' && Bool3) {
				// Eliminar el último carácter si se presiona la tecla "Backspace"
				text3.text = text3.text.slice(0, -1);
				text3Aux.text = text3Aux.text.slice(0, -1);
			}
		});




























		//eliminar
		this.anims.create({
			key: 'buttonNormalE',
			frames: this.anims.generateFrameNumbers('botonEliminar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonHoverE',
			frames: this.anims.generateFrameNumbers('botonEliminar', { start: 1, end: 1 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonClickE',
			frames: this.anims.generateFrameNumbers('botonEliminar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		// Configura la interactividad del botón
		eliminar.on('pointerover', () => {
			eliminar.play('buttonHoverE');
		});

		eliminar.on('pointerout', () => {
			eliminar.play('buttonNormalE');
		});

		eliminar.on('pointerdown', () => {
			eliminar.play('buttonClickE');
			sonidoDisparo.play();
			//Para definir un usuario necesitaremos obtener su nombre y contraseña desde el campo correspondiente
			var UserName = text._text; //Con val accedemos al valor
			var UserPassword = text2Aux._text; //Con val accedemos al valor
			console.log(UserName);
			console.log(UserPassword)
			//Ahora, únicamente en el caso de que UserName y userPassword hayan sido rellenados, se crearía un usuario
			if (UserName != null && UserPassword != null) {
				//Comprobamos que no estén vacíos dichos campos
				if (UserName === ('') || UserPassword === ('')) {
					console.log("Rellene todos los campos por favor");
				}
				else {
					$.ajax({
						method: "DELETE", //Se trata de una petición de tipo get, pues recuperamos recursos existentes
						url: 'http://' + location.host + '/usuarios/' + UserName + "/" + UserPassword, //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
						processData: false,
						headers: { "Content-Type": "application/json" }
						//En caso de lograr cargarse los usuarios, se sacan por consola
					}).done(function(usuario) {
						//Se indica al usuario que ha iniciado sesión correctamente
						console.log("Ha borrado corretamente su cuenta");
						eliminado = true;
						console.log(usuario);
						//En caso de error, simplemente indicamos que ha habido un error al crear al usuario
					}).fail(function() {
						console.log("Error al borrar a los usuarios");
					})
				}
			}
			//En caso de que no se hayan rellenado los campos, se le piden al usuario
			else {
				console.log("Rellene todos los campos por favor");
			}

			if (eliminado) {
				this.scene.transition({
					target: 'menu-inicio',
					duration: 1000,
				});
			}

		});

		eliminar.on('pointerup', () => {
			eliminar.play('buttonHoverE');
		});

		//cambiar
		this.anims.create({
			key: 'buttonNormalC',
			frames: this.anims.generateFrameNumbers('botonCambiar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonHoverC',
			frames: this.anims.generateFrameNumbers('botonCambiar', { start: 1, end: 1 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonClickC',
			frames: this.anims.generateFrameNumbers('botonCambiar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		// Configura la interactividad del botón
		cambiar.on('pointerover', () => {
			cambiar.play('buttonHoverC');
		});

		cambiar.on('pointerout', () => {
			cambiar.play('buttonNormalC');
		});

		cambiar.on('pointerdown', () => {
			sonidoDisparo.play();
			cambiar.play('buttonClickC');
			//Para definir un usuario necesitaremos obtener su nombre y contraseña desde el campo correspondiente
			var UserName = text._text;
			var UserPassword = text2Aux._text;
			var NewPassword=text3Aux._text;
			//Ahora, únicamente en el caso de que UserName y userPassword hayan sido rellenados, se crearía un usuario
			if (UserName != null && UserPassword != null && NewPassword != null) {
				//Comprobamos que no estén vacíos dichos campos
				if (UserName === ('') || UserPassword === ('') || NewPassword === ('')) {
					console.log("Rellene todos los campos por favor");
				}
				else {
					$.ajax({
						method: "PUT", //Se trata de una petición de tipo PUT, pues recuperamos recursos existentes
						url: 'http://' + location.host + '/usuarios/' + UserName + "/" + UserPassword, //En el servidor definiremos el directorio /usuarios medinante @RequestMapping
						data: NewPassword,
						processData: false,
						headers: { "Content-Type": "application/json" }
						//En caso de lograr cargarse los usuarios, se sacan por consola
					}).done(function(usuario) {
						//Se indica al usuario que ha iniciado sesión correctamente
						console.log("Ha modificado su contraseña");
						console.log(usuario)
						//En caso de error, simplemente indicamos que ha habido un error al crear al usuario
					}).fail(function() {
						console.log("Error al modificar su contraseña");
					})
				}
			}
			//En caso de que no se hayan rellenado los campos, se le piden al usuario
			else {
				console.log("Rellene todos los campos por favor");
			}
		});

		cambiar.on('pointerup', () => {
			cambiar.play('buttonHoverC');
		});

		//atras
		this.anims.create({
			key: 'buttonNormalA',
			frames: this.anims.generateFrameNumbers('botonAtras', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonHoverA',
			frames: this.anims.generateFrameNumbers('botonAtras', { start: 1, end: 1 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonClickA',
			frames: this.anims.generateFrameNumbers('botonAtras', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		// Configura la interactividad del botón
		atras.on('pointerover', () => {
			atras.play('buttonHoverA');
		});

		atras.on('pointerout', () => {
			atras.play('buttonNormalA');
		});

		atras.on('pointerdown', () => {
			atras.play('buttonClickA');
			sonidoDisparo.play();
			this.scene.start('opciones');
		});

		atras.on('pointerup', () => {
			atras.play('buttonHoverA');
		});

		//cerrar
		this.anims.create({
			key: 'buttonNormalCE',
			frames: this.anims.generateFrameNumbers('botonCerrar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonHoverCE',
			frames: this.anims.generateFrameNumbers('botonCerrar', { start: 1, end: 1 }),
			frameRate: 1,
			repeat: 0
		});

		this.anims.create({
			key: 'buttonClickCE',
			frames: this.anims.generateFrameNumbers('botonCerrar', { start: 0, end: 0 }),
			frameRate: 1,
			repeat: 0
		});

		// Configura la interactividad del botón
		cerrar.on('pointerover', () => {
			cerrar.play('buttonHoverCE');
		});

		cerrar.on('pointerout', () => {
			cerrar.play('buttonNormalCE');
		});

		cerrar.on('pointerdown', () => {
			cerrar.play('buttonClickCE');
			sonidoDisparo.play();
			cambio = false;
			this.scene.start('menu-inicio');

		});

		cerrar.on('pointerup', () => {
			cerrar.play('buttonHoverCE');
		});

		//Pinchar el Fondo


		fondo.on('pointerdown', () => {
			cambio = false;
		});




	}
}

function StarOpciones() {
	this.scene.start('opciones');
}

