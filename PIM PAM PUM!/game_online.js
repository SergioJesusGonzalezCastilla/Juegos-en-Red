import { WebSocketConfig } from './WebSocketConfig.js';

//VARIABLE CONSTANTE DE LA VELOCIDAD DE LOS PERSONAJES FIJA
var BASE_SPEED = 140;

// Elementos del mundo
var vias;
var obstaculos;
var damage_boost;

//Jugador
var vaquero_1;
var vaquero_2;

//Booleanos para indicar cual de los jugadores se es
var soy_1;
var soy_2;
var juego_inciado;

// Balas
var balas_vaquero_1;
var balas_vaquero_2;

//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

//Textos
var texto1;
var texto2;
var texto3;
var texto4;

//Vida de cada Jugador
var life1;
var life2;

//Contador de balas por lanzar simultáneamente para cada jugador
var num_balas_1;
var num_balas_2;

//Booleano para comprobar que se pueda disparar
var posibilidad_1;
var posibilidad_1;
var posibilidad_2;

//Daño por disparo
var damage_1;
var damage_2;

//Velocidad balas
var bullet_speed;

//POWER UPS
var corazones;
var speedup;

//Variables que sirven de contador para los power ups
var vida_total_perdida;
var vida_extra;
var corazon_1_mostrado;
var corazon_2_mostrado;

var total_balas_empleadas;

var velocidad_extra_1;
var velocidad_extra_2;
var speedup_1_mostrado;
var speedup_2_mostrado;
var speedup_1_conseguido;
var speedup_2_conseguido;

var damage_boost_mostrado;
var damage_boost_1_conseguido;
var damage_boost_2_conseguido;
var extra_damage_1;
var extra_damage_2;

//Variables para los sonidos
var sonidoFondo;
var sonidoDisparo;

export class Game_Online extends Phaser.Scene {
	constructor() {
		super({ key: 'gameonline' });
	}

	preload() {
		//FONDO
		this.load.image('Desierto', 'resources/FondoDesierto.png');


		//ELEMENTOS DEL MUNDO
		this.load.image('Vías', 'resources/Juego/ViasTren.png');
		this.load.image('Tanque', 'resources/Juego/Agua.png');
		this.load.image('Carreta1', 'resources/Juego/CarretaDerecha.png');
		this.load.image('Carreta2', 'resources/Juego/CarretaIzquierda.png');
		this.load.image('Mesa', 'resources/Juego/MesaDerecha.png');

		//ELEMENTOS DEL MUNDO DESTRUIDOS
		this.load.image('Tanque_Roto', 'resources/Juego/Agua Rota.png');
		this.load.image('Carreta1_Rota', 'resources/Juego/Carreta derecha rota.png');
		this.load.image('Carreta2_Rota', 'resources/Juego/Carreta izq rota.png');
		this.load.image('Mesa_Rota', 'resources/Juego/Mesa Rota.png');

		//PLAYERS SPRITES
		this.load.spritesheet('vaquero_1', 'resources/Juego/Vaquero dch spritesheet.png', { frameWidth: 203, frameHeight: 72 });
		this.load.spritesheet('vaquero_2', 'resources/Juego/Vaquero izq spritesheet.png', { frameWidth: 204, frameHeight: 70 });

		//BALAS
		this.load.image('bala_vaquero_1', 'resources/Juego/Bala_Derecha.png');
		this.load.image('bala_vaquero_2', 'resources/Juego/Bala_Izquierda.png');

		//CORAZÓN INTERFAZ
		this.load.image('corazon', 'resources/Juego/Corazon.png');

		//GATO
		this.load.image('gato', 'resources/Juego/Gatito.png');

		//DAMAGE_BOOST
		this.load.image('damage', 'resources/Juego/PowerUP damage.png');
		this.load.image('damage_bullet_1', 'resources/Juego/Bala flama izq.png');
		this.load.image('damage_bullet_2', 'resources/Juego/Bala flama dcha.png');

		//AUDIO
		this.load.audio('sonidoFondo', 'sounds/BackgroundFightSound.mp3');
		this.load.audio('sonidoDisparo', 'sounds/disparoSound.mp3');
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
		
		//Inicializamos las variables que indican el juagdor que se es
		soy_1=false;
		soy_2=false;
		juego_inciado=false;
		
		// Creo un manager del websocket pasándole la escena actual
		this.webSocketManager = new WebSocketConfig(this,userNameFromPreviousScene);
	

		//FONDO
		this.add.image(1280 / 2, 720 / 2, 'Desierto');

		//ELEMENTOS DESTRUIDOS
		this.add.image(WIDTH / 3.2, HEIGHT / 15, 'Tanque_Roto');
		this.add.image(WIDTH / 1.3, 100, 'Carreta1_Rota');
		this.add.image(WIDTH / 4.4, HEIGHT - 90, 'Carreta2_Rota');
		this.add.image(1.8 * WIDTH / 3, HEIGHT / 1.2, 'Mesa_Rota');

		//ELEMENTOS DEL MUNDO    
		vias = this.physics.add.staticGroup();
		vias.create(WIDTH / 2, HEIGHT / 2, 'Vías');

		obstaculos = this.physics.add.staticGroup();
		obstaculos.create(WIDTH / 3.2, HEIGHT / 15, 'Tanque');
		obstaculos.create(WIDTH / 1.3, 100, 'Carreta1');
		obstaculos.create(WIDTH / 4.5, HEIGHT - 90, 'Carreta2');
		obstaculos.create(1.8 * WIDTH / 3, HEIGHT / 1.2, 'Mesa');

		//Asigno un id a cada uno de los obstáculos
		obstaculos.children.iterate(function (obstaculo, index) {
			//El index es el número de hijo, que comienza en 0
			//Le asigno al id index+1 para que sean todo números positivos
			var id_aux = "obstaculo_" + (index + 1);
			obstaculo.id=id_aux;
		});
		

		//Agregamos los vaqueros
		vaquero_1 = this.physics.add.sprite(100, HEIGHT / 4, 'vaquero_1').setScale(7 / 8);
		vaquero_1.setCollideWorldBounds(true);

		vaquero_2 = this.physics.add.sprite(WIDTH - 100, 3 * HEIGHT / 4, 'vaquero_2').setScale(7 / 8);
		vaquero_2.setCollideWorldBounds(true);

		//Asigno Id a los vaqueros, con el fin de poder establecer toda la lógica de websocket
		vaquero_1.id = "vaquero_1"; 
		vaquero_2.id = "vaquero_2";

		//Agregamos las animaciones de cada vaquero
		//Para el vaquero 1
		this.anims.create({
			key: 'andar_vaquero_1',
			frames: this.anims.generateFrameNumbers('vaquero_1', { start: 0, end: 6 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'idle_vaquero_1',
			frames: this.anims.generateFrameNumbers('vaquero_1', { start: 7, end: 23 }),
			frameRate: 10,
			repeat: -1
		});
		//Para el vaquero 1
		this.anims.create({
			key: 'idle_vaquero_2',
			frames: this.anims.generateFrameNumbers('vaquero_2', { start: 0, end: 16 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'andar_vaquero_2',
			frames: this.anims.generateFrameNumbers('vaquero_2', { start: 17, end: 23 }),
			frameRate: 10,
			repeat: -1
		});

		//Agregamos colsiones de los vaqueros con el escenario
		this.physics.add.collider(vaquero_1, vias);
		this.physics.add.collider(vaquero_2, vias);
		this.physics.add.collider(vaquero_1, obstaculos);
		this.physics.add.collider(vaquero_2, obstaculos);

		//Asignamos una vida al azar entre un rango de valores
		obstaculos.children.iterate(function(child) {
			child.vida =200;
		});

		// Agregamos las balas
		balas_vaquero_1 = this.physics.add.group();
		balas_vaquero_2 = this.physics.add.group();

		//Inicialización de variables
		life1 = 100;
		life2 = 100;

		num_balas_1 = 4;
		num_balas_2 = 4;

		posibilidad_1 = true;
		posibilidad_2 = true;

		damage_1 = 10;
		damage_2 = 10;

		bullet_speed = 500;

		vida_total_perdida = 0;
		vida_extra = 30;
		corazon_1_mostrado = false;
		corazon_2_mostrado = false;

		total_balas_empleadas = 0;

		speedup_1_mostrado = false;
		speedup_2_mostrado = false;
		velocidad_extra_1 = 0;
		velocidad_extra_2 = 0;
		speedup_1_conseguido = 0;
		speedup_2_conseguido = 0;

		damage_boost_mostrado = false;
		damage_boost_1_conseguido = false;
		damage_boost_2_conseguido = false;
		extra_damage_1 = 0;
		extra_damage_2 = 0;

		//Asignamos vidas a los vaqueros
		vaquero_1.life = life1;
		vaquero_2.life = life2;

		//Añadimos los corazones en los cuales se almacenará la vida de los personajes
		this.add.image(50, 50, 'corazon').setScale(1.25);
		this.add.image(WIDTH - 50, 50, 'corazon').setScale(1.25);

		//Textos
		texto1 = this.add.text(17, 30, vaquero_1.life, {
			fontSize: '200px',
			fill: '#fff'
		}).setScale(1 / 5.8);

		//Textos
		texto2 = this.add.text(WIDTH - 82, 30, vaquero_2.life, {
			fontSize: '200px',
			fill: '#fff'
		}).setScale(1 / 5.8);
		

		// Función para colocar correctamente el texto 1
		function colocar_texto_1() {
			if (vaquero_1.life < 100 && vaquero_1.life >= 10) {
				texto1.setX(28)
			}
			else if (vaquero_1.life < 10 && vaquero_1.life >= 0) {
				texto1.setX(38)
			}
			else {
				texto1.setX(17)
			}
		}

		//Función para colocar correctamente el texto 2
		function colocar_texto_2() {
			if (vaquero_2.life < 100 && vaquero_2.life >= 10) {
				texto2.setX(WIDTH - 71)
			}
			else if (vaquero_2.life < 10 && vaquero_2.life >= 0) {
				texto2.setX(WIDTH - 61)
			}
			else {
				texto2.setX(WIDTH - 82)
			}
		}

		//Efecto sombra
		//vaquero_1.setInteractive();
		//const fxShadow = phaserVia.preFX.addShadow(80, -90, 0.006, 2, 0x333333, 10);

		//Teclas
		var cursors = this.input.keyboard.createCursorKeys();
		const keyCodes = Phaser.Input.Keyboard.KeyCodes;
		//VAQUERO 1
		this.teclaA = this.input.keyboard.addKey(keyCodes.A);
		this.teclaD = this.input.keyboard.addKey(keyCodes.D);
		this.teclaW = this.input.keyboard.addKey(keyCodes.W);
		this.teclaS = this.input.keyboard.addKey(keyCodes.S);
		this.teclaF = this.input.keyboard.addKey(keyCodes.F);

		//VAQUERO 2
		this.teclaJ = this.input.keyboard.addKey(keyCodes.J);
		this.teclaL = this.input.keyboard.addKey(keyCodes.L);
		this.teclaI = this.input.keyboard.addKey(keyCodes.I);
		this.teclaK = this.input.keyboard.addKey(keyCodes.K);
		this.teclaH = this.input.keyboard.addKey(keyCodes.H);

		this.teclaG = this.input.keyboard.addKey(keyCodes.G);


		//Sonidos
		sonidoFondo = this.sound.add('sonidoFondo');
		sonidoDisparo = this.sound.add('sonidoDisparo');
		sonidoFondo.loop = true;

		sonidoFondo.play();

		// Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
		function herido_vaquero_1(vaquero_1, bala) {
			bala.destroy();
			num_balas_2++;
			total_balas_empleadas++;
			vaquero_1.life -= bala.damage;
			vida_total_perdida += bala.damage;
			texto1.setText(vaquero_1.life);
			colocar_texto_1();
			// Se procede ahora a mandar la información por websocket
			// En caso de que la conexión esté activa 
			if (this.webSocketManager) {
				//Se manda el mensaje, pasándole el tipo, que en este caso será "vida_vaquero"
				//También mandamos el id del obstáculo y la vida actual
				this.webSocketManager.sendMessage({
					tipo: 'vida_vaquero',
					id: vaquero_1.id,
					vida:vaquero_1.life
				});
			}
			//Realizamos la comprobación ya una vez se ha acabado de mandar la información
			if (vaquero_1.life <= 0) {
				this.scene.transition({
				target: 'winJ2',
				duration:0,
				data: { UserName: userNameFromPreviousScene, origen:'online' }
				});
				sonidoFondo.stop();
				this.webSocketManager.cerrarConexion();
			}
		}
		// Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
		function herido_vaquero_2(vaquero_2, bala) {
			bala.destroy();
			num_balas_1++;
			total_balas_empleadas++;
			vaquero_2.life -= bala.damage;
			vida_total_perdida += bala.damage;
			texto2.setText(vaquero_2.life);
			// Se procede ahora a mandar la información por websocket
			// En caso de que la conexión esté activa 
			if (this.webSocketManager) {
				//Se manda el mensaje, pasándole el tipo, que en este caso será "vida_vaquero"
				//También mandamos el id del obstáculo y la vida actual
				this.webSocketManager.sendMessage({
					tipo: 'vida_vaquero',
					id: vaquero_2.id,
					vida:vaquero_2.life
				});
			}
			//Realizamos la comprobación ya una vez se ha acabado de mandar la información
			colocar_texto_2();
			if (vaquero_2.life <= 0) {
				this.scene.transition({
				target: 'winJ1',
				duration:0,
				data: { UserName: userNameFromPreviousScene, origen:'online' }
				});
				sonidoFondo.stop();
				this.webSocketManager.cerrarConexion();
			}
		}
		//Colisiones de los personajes y las balas
		this.physics.add.overlap(vaquero_1, balas_vaquero_2, herido_vaquero_1, null, this);
		this.physics.add.collider(vaquero_2, balas_vaquero_1, herido_vaquero_2, null, this);

		// Función que se encarga de restar vida a los obstáculos si son golpeados por una bala del primer vaquero
		function damage_obstaculos_1(obstaculo, bala) {
			bala.destroy();
			num_balas_1++;
			total_balas_empleadas++;
			obstaculo.vida -= bala.damage;
			//Finalmente, se destruye el obstáculo en caso de que no le quede vida
			//Solo lo podemos llevar a cabo después de mandar la información, pues sino no habría que mandar
			if (obstaculo.vida <= 0) {
				obstaculo.destroy();
			}
		}

		// Función que se encarga de restar vida a los obstáculos si son golpeados por una bala del segundo vaquero
		function damage_obstaculos_2(obstaculo, bala) {
			bala.destroy();
			num_balas_2++;
			total_balas_empleadas++;
			obstaculo.vida -= bala.damage;
			//Finalmente, se destruye el obstáculo en caso de que no le quede vida
			//Solo lo podemos llevar a cabo después de mandar la información, pues sino no habría que mandar
			if (obstaculo.vida <= 0) {
				obstaculo.destroy();
			}
		}

		//Colisiones entre las balas y los obstáculos
		this.physics.add.collider(obstaculos, balas_vaquero_1, damage_obstaculos_1, null, this);
		this.physics.add.collider(obstaculos, balas_vaquero_2, damage_obstaculos_2, null, this);

		//POWER UPS

		//CORAZONES
		corazones = this.physics.add.staticGroup();

		// Funciones que se encarga de sumarle vida a los vaqueros si obtienen un power up de corazoón
		function obtener_corazon_1(corazon, bala) {
			bala.destroy();
			num_balas_1++;
			total_balas_empleadas++;
			vaquero_1.life += vida_extra;
			texto1.setText(vaquero_1.life);
			colocar_texto_1();
			corazon.destroy();
		}
		function obtener_corazon_2(corazon, bala) {
			bala.destroy();
			num_balas_2++;
			total_balas_empleadas++;
			vaquero_2.life += vida_extra;
			texto2.setText(vaquero_2.life);
			colocar_texto_2();
			corazon.destroy();
		}

		//Colisiones entre las balas y los corazones
		this.physics.add.collider(corazones, balas_vaquero_1, obtener_corazon_1, null, this);
		this.physics.add.collider(corazones, balas_vaquero_2, obtener_corazon_2, null, this);

		//SPEEDUP
		speedup = this.physics.add.staticGroup();

		//Función que se encarga de aumentar la velocidad de los personajes si cogen el power up correspondiente
		function obtener_speedup_1(speedup, bala) {
			bala.destroy();
			num_balas_1++;
			total_balas_empleadas++;
			velocidad_extra_1 += 50;
			speedup.destroy();
			vaquero_1.setTint(0xffff00);
			if (speedup_1_conseguido === 0) {
				this.add.image(50, 130, 'gato').setScale(2 / 7);
			}
			else {
				this.add.image(50, 190, 'gato').setScale(2 / 7);
			}
			speedup_1_conseguido++;
		}
		function obtener_speedup_2(speedup, bala) {
			bala.destroy();
			num_balas_2++;
			total_balas_empleadas++;
			velocidad_extra_2 += 50;
			speedup.destroy();
			vaquero_2.setTint(0xffff00);
			if (speedup_2_conseguido === 0) {
				this.add.image(WIDTH - 50, 130, 'gato').setScale(2 / 7);
			}
			else {
				this.add.image(WIDTH - 50, 190, 'gato').setScale(2 / 7);
			}
			speedup_2_conseguido++;
		}

		//Colisiones entre los objetos de speedup y las balas
		this.physics.add.collider(speedup, balas_vaquero_1, obtener_speedup_1, null, this);
		this.physics.add.collider(speedup, balas_vaquero_2, obtener_speedup_2, null, this);

		//DAMAGE_BOOST
		damage_boost = this.physics.add.staticGroup();

		//Función que se encarga de aumentar el daño de los personajes si cogen el power up correspondiente
		function obtener_damage_boost_1(damage_boost, bala) {
			bala.destroy();
			num_balas_1++;
			total_balas_empleadas++;
			extra_damage_1 += 5;
			damage_boost.destroy();
			this.add.image(130, 50, 'damage').setScale(2 / 7);
			damage_boost_1_conseguido = true;
		}

		function obtener_damage_boost_2(damage_boost, bala) {
			bala.destroy();
			num_balas_2++;
			total_balas_empleadas++;
			extra_damage_2 += 5;
			damage_boost.destroy();
			this.add.image(WIDTH - 162, 50, 'damage').setScale(2 / 7);
			damage_boost_2_conseguido = true;
		}

		//Colisiones entre los objetos de damage_boost y las balas
		this.physics.add.collider(damage_boost, balas_vaquero_1, obtener_damage_boost_1, null, this);
		this.physics.add.collider(damage_boost, balas_vaquero_2, obtener_damage_boost_2, null, this);
	}

	update() {

		//Continuamos el sonido si se pauso al entrar en la pausa
		sonidoFondo.resume();
		//Movimiento del vaquero 1
		if (this.teclaD.isDown && soy_1 && juego_inciado) {
			vaquero_1.setVelocityX(BASE_SPEED + velocidad_extra_1);
			vaquero_1.setVelocityY(0);
			vaquero_1.x++;
			vaquero_1.anims.play('andar_vaquero_1', true);
			// Se procede ahora a mandar la información por websocket
			// En caso de que la conexión esté activa 
			if (this.webSocketManager) {
				//Se manda el mensaje, pasándole el tipo, que en este caso será "movimiento_vaquero"
				//También mandamos la x y la y actual del vaquero
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_1.id,
					x: vaquero_1.x,
					y: vaquero_1.y,
					vel_x:BASE_SPEED + velocidad_extra_1,
					vel_y:0
				});
			}
		}
		else if (this.teclaA.isDown && soy_1 && juego_inciado) {
			vaquero_1.setVelocityX(-BASE_SPEED - velocidad_extra_1);
			vaquero_1.setVelocityY(0);
			vaquero_1.x--;
			vaquero_1.anims.play('andar_vaquero_1', true);
			//Mismo proceso que en anteriores casos
			if (this.webSocketManager) {
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_1.id,
					x: vaquero_1.x,
					y: vaquero_1.y,
					vel_x:-BASE_SPEED - velocidad_extra_1,
					vel_y:0
				});
			}
		}
		else if (this.teclaW.isDown && soy_1 && juego_inciado) {
			vaquero_1.setVelocityX(0);
			vaquero_1.setVelocityY(-BASE_SPEED - velocidad_extra_1);
			vaquero_1.y--;
			vaquero_1.anims.play('andar_vaquero_1', true);
			//Mismo proceso que en anteriores casos
			if (this.webSocketManager) {
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_1.id,
					x: vaquero_1.x,
					y: vaquero_1.y,
					vel_x:0,
					vel_y:-BASE_SPEED - velocidad_extra_1
				});
			}
		}
		else if (this.teclaS.isDown && soy_1 && juego_inciado) {
			vaquero_1.setVelocityX(0);
			vaquero_1.setVelocityY(BASE_SPEED + velocidad_extra_1);
			vaquero_1.y++;
			vaquero_1.anims.play('andar_vaquero_1', true);
			//Mismo proceso que en anteriores casos
			if (this.webSocketManager) {
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_1.id,
					x: vaquero_1.x,
					y: vaquero_1.y,
					vel_x:0,
					vel_y:BASE_SPEED + velocidad_extra_1
				});
			}
		}
		else {
			vaquero_1.setVelocityX(0);
			vaquero_1.setVelocityY(0);
			vaquero_1.anims.play('andar_vaquero_1', true);
		}
		//Gestión del disparo para el jugador 1
		if (this.teclaF.isDown && soy_1 && juego_inciado) {
			if (num_balas_1 > 0 && posibilidad_1 === true) {
				var imagen_1 = 'bala_vaquero_1';
				var escala_1 = 1 / 2;
				if (damage_boost_1_conseguido) {
					imagen_1 = 'damage_bullet_1';
					escala_1 = 1 / 4;
				}
				var bala = balas_vaquero_1.create(vaquero_1.x + 100, vaquero_1.y, imagen_1).setScale(escala_1);
				bala.damage = damage_1 + extra_damage_1;
				bala.setVelocity(bullet_speed, 0);
				posibilidad_1 = false;
				num_balas_1--;
				sonidoDisparo.play();
				if (this.webSocketManager) {
					this.webSocketManager.sendMessage({
						tipo: 'disparo_vaquero',
						id: vaquero_1.id,
						x: vaquero_1.x,
						y: vaquero_1.y,
						damage: bala.damage,
						imagen: imagen_1,
						escala: escala_1
					});
				}
			}
		}
		// Vuelve a darse la posibilidad de disparar una vez se deja de pulsar la F
		if (this.teclaF.isUp) {
			posibilidad_1 = true;
		}
		//MOVIMIENTO VAQUERO 2

		if (this.teclaL.isDown && soy_2 && juego_inciado) {
			vaquero_2.setVelocityX(BASE_SPEED + velocidad_extra_2);
			vaquero_2.setVelocityY(0);
			vaquero_2.x++;
			vaquero_2.anims.play('andar_vaquero_2', true);
			//Mismo proceso que en anteriores casos
			if (this.webSocketManager) {
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_2.id,
					x: vaquero_2.x,
					y: vaquero_2.y,
					vel_x:BASE_SPEED + velocidad_extra_2,
					vel_y:0
				});
			}
		}
		else if (this.teclaJ.isDown && soy_2 && juego_inciado) {
			vaquero_2.setVelocityX(-BASE_SPEED - velocidad_extra_2);
			vaquero_2.setVelocityY(0);
			vaquero_2.x--;
			vaquero_2.anims.play('andar_vaquero_2', true);
			//Mismo proceso que en anteriores casos
			if (this.webSocketManager) {
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_2.id,
					x: vaquero_2.x,
					y: vaquero_2.y,
					vel_x:-BASE_SPEED - velocidad_extra_2,
					vel_y:0
				});
			}
		}
		else if (this.teclaI.isDown && soy_2 && juego_inciado) {
			vaquero_2.setVelocityX(0);
			vaquero_2.setVelocityY(-BASE_SPEED - velocidad_extra_2);
			vaquero_2.y--;
			vaquero_2.anims.play('andar_vaquero_2', true);
			//Mismo proceso que en anteriores casos
			if (this.webSocketManager) {
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_2.id,
					x: vaquero_2.x,
					y: vaquero_2.y,
					vel_x:0,
					vel_y:-BASE_SPEED - velocidad_extra_2
				});
			}
		}
		else if (this.teclaK.isDown && soy_2 && juego_inciado) {
			vaquero_2.setVelocityX(0);
			vaquero_2.setVelocityY(BASE_SPEED + velocidad_extra_2);
			vaquero_2.y++;
			vaquero_2.anims.play('andar_vaquero_2', true);
			//Mismo proceso que en anteriores casos
			if (this.webSocketManager) {
				this.webSocketManager.sendMessage({
					tipo: 'movimiento_vaquero',
					id: vaquero_2.id,
					x: vaquero_2.x,
					y: vaquero_2.y,
					vel_x:0,
					vel_y:BASE_SPEED + velocidad_extra_2
				});
			}
		}
		else {
			vaquero_2.setVelocityX(0);
			vaquero_2.setVelocityY(0);
			vaquero_2.anims.play('andar_vaquero_2', true);
		}
		//Gestión del disparo para el jugador 2
		if (this.teclaH.isDown && soy_2 && juego_inciado) {
			if (num_balas_2 > 0 && posibilidad_2 === true) {
				var imagen_2 = 'bala_vaquero_2';
				var escala_2 = 1 / 2;
				if (damage_boost_2_conseguido) {
					imagen_2 = 'damage_bullet_2';
					escala_2 = 1 / 4;
				}
				var bala = balas_vaquero_2.create(vaquero_2.x - 100, vaquero_2.y, imagen_2).setScale(escala_2);
				bala.damage = damage_2 + extra_damage_2;
				bala.setVelocity(-bullet_speed, 0);
				posibilidad_2 = false;
				num_balas_2--;
				sonidoDisparo.play();
				if (this.webSocketManager) {
					this.webSocketManager.sendMessage({
						tipo: 'disparo_vaquero',
						id: vaquero_2.id,
						x: vaquero_2.x,
						y: vaquero_2.y,
						damage: bala.damage,
						imagen: imagen_2,
						escala: escala_2
					});
				}
			}
		}
		// Vuelve a darse la posibilidad de disparar una vez se deja de pulsar la H
		if (this.teclaH.isUp) {
			posibilidad_2 = true;
		}
		//Se comprueba si las balas del primer vaquero salen del mundo, porque no han impactado con ningún objeto ni jugador
		balas_vaquero_1.children.iterate(function(child) {
			if (child != null) {
				if (child.x >= WIDTH) {
					child.destroy();
					num_balas_1++;
					total_balas_empleadas++;
				}
			}
		});
		//Se comprueba si las balas del segundo vaquero salen del mundo, porque no han impactado con ningún objeto ni jugador
		balas_vaquero_2.children.iterate(function(child) {
			if (child != null) {
				if (child.x <= 0) {
					child.destroy();
					num_balas_2++;
					total_balas_empleadas++;
				}
			}
		});

		//Comprobaremos la cantidad total de vida perdida para crear los objetos corazón en función de la misma
		if (vida_total_perdida >= 70 && corazon_1_mostrado === false) {
			corazones.create(WIDTH / 2, 2 * HEIGHT / 6, 'corazon');
			corazon_1_mostrado = true;
		}

		if (vida_total_perdida >= 110 && corazon_2_mostrado === false) {
			corazones.create(WIDTH / 2, 5 * HEIGHT / 8, 'corazon');
			corazon_2_mostrado = true;
		}
		//Comprobaremos la cantidad de balas totales empleadas para crear los objetos speedup en función de la misma
		if (total_balas_empleadas >= 25 && speedup_1_mostrado === false) {
			speedup.create(WIDTH / 2, 1 * HEIGHT / 6 + 20, 'gato').setScale(1 / 2);
			speedup_1_mostrado = true;
		}

		if (total_balas_empleadas >= 57 && speedup_2_mostrado === false) {
			speedup.create(WIDTH / 2, 6 * HEIGHT / 8, 'gato').setScale(1 / 2);
			speedup_2_mostrado = true;
		}

		//Comprobaremos la cantidad de balas totales empleadas para crear los objetos damage_boost en función de la misma
		if (total_balas_empleadas >= 47 && damage_boost_mostrado === false) {
			damage_boost.create(WIDTH / 2, HEIGHT / 2, 'damage').setScale(1 / 2);
			damage_boost_mostrado = true;
		}
	}

	// Método que se encarga de manejar los mensajes que le lleguen al websocket
	handleWebSocketMessage(data)
	{
		console.log('Manejando mensaje:', data);
		//En función de los datos recibidos
		switch (data.tipo) {
			case 'movimiento_vaquero':
			{
				this.gestionMovimientoVaquero(data);
				break;
			}

			case 'parada_vaquero':
			{
				this.gestionParadaVaquero(data);
				break;
			}

			case 'disparo_vaquero':
			{
				this.gestionDisparoVaquero(data);
				break;
			}
			
			case 'vida_vaquero':
			{
				this.gestionVidaVaquero(data);
				break;
			}
			
			case 'numero_usuarios':
			{
				this.gestionNumeroUsuarios(data);
				break;
			}
			
			case 'juego_iniciado':
			{
				this.gestionJuegoIniciado(data);
			}

			default:
				console.warn('Se ha recibido un mensaje desconodido: ' +data.data);
		}
	}


	gestionMovimientoVaquero(datos_movimiento) {
    // Seleccionamos el vaquero según el id recibido
    const vaquero = (datos_movimiento.id === vaquero_1.id) ? vaquero_1 : (datos_movimiento.id === vaquero_2.id) ? vaquero_2 : null;

    if (!vaquero) {
        console.warn("El id no corresponde con ningún vaquero", datos_movimiento);
        return;
    }

    // Actualizamos la posición del vaquero
    vaquero.setVelocityX(datos_movimiento.vel_x);
    vaquero.setVelocityY(datos_movimiento.vel_y);
    vaquero.x = datos_movimiento.x;
    vaquero.y = datos_movimiento.y;

    // Reproducir animación solo si no está en reproducción actualmente y no hay otra animación en curso
    const animacion = (datos_movimiento.vel_x !== 0 || datos_movimiento.vel_y !== 0) ? 'andar' : 'idle';

    if (!vaquero.anims.isPlaying && vaquero.anims.currentAnim.key !== `${animacion}_vaquero_${vaquero.id}`) {
        vaquero.anims.play(`${animacion}_vaquero_${vaquero.id}`, true);
    }
}
	//Método que se encargará de gestionar las paradas de los vaqueros
	gestionParadaVaquero(datos_parada)
	{
		//Primero comprobaremos si el id pertenece al primer vaquero
		if (vaquero_1.id === datos_parada.id)
		{
			vaquero_1.setVelocityX(0);
			vaquero_1.setVelocityY(0);
			vaquero_1.anims.play('idle_vaquero_1', true);
		}

		//Ahora comprobaremos si el id pertenece al segundo vaquero
		else if (vaquero_2.id === datos_parada.id)
		{
			vaquero_2.setVelocityX(0);
			vaquero_2.setVelocityY(0);
			vaquero_2.anims.play('idle_vaquero_2', true);
		}
		else
		{
			console.warn("El id no corresponde con ningún vaquero");
		}
	}

	//Metodo para crear y dirigir las balas	
	gestionDisparoVaquero(datos_disparo)
	{
		//Se comprueba el id del vaquero que dispara
		if (vaquero_1.id === datos_disparo.id)
		{
			//Y luego se crea la bala en la posicion relativa al vaquero que ha disparado
			var bala = balas_vaquero_1.create(datos_disparo.x + 100, datos_disparo.y, datos_disparo.imagen).setScale(datos_disparo.escala);
			bala.damage = datos_disparo.damage;
			bala.setVelocity(bullet_speed, 0);
			sonidoDisparo.play();
		}
		else if (vaquero_2.id === datos_disparo.id) 
		{
			console.log('Se va a disparar una bala del vaquero 2');
			var bala = balas_vaquero_2.create(datos_disparo.x -100, datos_disparo.y, datos_disparo.imagen).setScale(datos_disparo.escala);
			bala.damage = datos_disparo.damage;
			bala.setVelocity(-bullet_speed, 0);
			sonidoDisparo.play();
		} 
		else 
		{
			console.warn("El ID no corresponde con ningún vaquero");
			return;
		}
	}
	
	//Método que se encargará de gestionar la vida de los vaqueros
	gestionVidaVaquero(datos_vida)
	{
		// Función para colocar correctamente el texto 1
		function colocar_texto_1() {
			if (vaquero_1.life < 100 && vaquero_1.life >= 10) {
				texto1.setX(28)
			}
			else if (vaquero_1.life < 10 && vaquero_1.life >= 0) {
				texto1.setX(38)
			}
			else {
				texto1.setX(17)
			}
		}

		//Función para colocar correctamente el texto 2
		function colocar_texto_2() {
			if (vaquero_2.life < 100 && vaquero_2.life >= 10) {
				texto2.setX(WIDTH - 71)
			}
			else if (vaquero_2.life < 10 && vaquero_2.life >= 0) {
				texto2.setX(WIDTH - 61)
			}
			else {
				texto2.setX(WIDTH - 82)
			}
		}
		//Llevaremos a cabo primero unas acciones en caso de que el vaquero sea el primero
		if (vaquero_1.id === datos_vida.id) 
		{
			vaquero_1.life=datos_vida.vida;
			texto1.setText(vaquero_1.life);
			colocar_texto_1();
			if (vaquero_1.life <= 0) {
				this.scene.transition({
				target: 'winJ2',
				duration:0,
				data: { UserName: userNameFromPreviousScene, origen:'online' }
			});
				sonidoFondo.stop();
				this.webSocketManager.cerrarConexion();
			}
			total_balas_empleadas++
		} 
		else if (vaquero_2.id === datos_vida.id) 
		{
			vaquero_2.life=datos_vida.vida;
			texto2.setText(vaquero_2.life);
			colocar_texto_2();
			if (vaquero_2.life <= 0) {
				this.scene.transition({
				target: 'winJ1',
				duration:0,
				data: { UserName: userNameFromPreviousScene, origen:'online' }
			});
				sonidoFondo.stop();
				this.webSocketManager.cerrarConexion();
			}
			total_balas_empleadas++
		} 
		else 
		{
			console.warn("El ID no corresponde con ningún vaquero");
			return;
		}
	}
	gestionNumeroUsuarios(datos_usuarios)
	{
		if (datos_usuarios.numUsuariosConectados === 1)
		{
			soy_1=true;
			console.log('Eres el jugador 1');
			texto3=this.add.text(WIDTH/2-43,30,'JUGADOR 1');
		}
		else if (datos_usuarios.numUsuariosConectados === 2)
		{
			soy_2=true;
			console.log('Eres el jugador 2');
			texto3=this.add.text(WIDTH/2-43,30,'JUGADOR 2');
		}
		else
		{
			this.scene.transition({
				target: 'lleno',
				duration:0,
			});
				sonidoFondo.stop();
				this.webSocketManager.cerrarConexion();
		}
	}
	gestionJuegoIniciado(datos_juego)
	{
		if(datos_juego.juego_iniciado===true)
		{
			juego_inciado=true;
			console.log('El juego ha iniciado')
			if(texto4)
			{
				texto4.setText('');
			}
		}
		else
		{
			console.log('Espera un rato');
			texto4=this.add.text(WIDTH/2-43,60,'CONECTANDO', {
			fill: '#000',
			backgroundColor: '#ff0'
		}).setScale(7/8);
		}
	}
}
