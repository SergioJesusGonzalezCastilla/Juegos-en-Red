//VARIABLE CONSTANTE DE LA VELOCIDAD DE LOS PERSONAJES FIJA
var BASE_SPEED=140;

// Elementos del mundo

var piedras;
var mundo;
var obstaculos;
var damage_boost;

//Jugador
var pirata_1;
var pirata_2;

// Balas
var balas_pirata_1;
var balas_pirata_2;

//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;

//Textos
var texto1;
var texto2;

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
var sonidoFondo ;
var sonidoDisparo;

export class gamePiratas extends Phaser.Scene{
    constructor(){
        super({key:'gamePiratas'});
    }
    
    preload ()
    {
        //FONDO
        this.load.image('Mar', 'resources/Piratas/Fondo piratas.png');    
        
        
        //ELEMENTOS DEL MUNDO
       
        this.load.image('Piedras','resources/Piratas/Piedras.png');
        this.load.image('Isla3','resources/Piratas/Isla pared arriba izq.png')
        this.load.image('Isla4','resources/Piratas/Isla pared abajo derecha.png')
        this.load.image('Isla1','resources/Piratas/Isla izq medio.png');
        this.load.image('BarcoIzq','resources/Piratas/barco izq.png');
        this.load.image('BarcoDcha','resources/Piratas/Barco derech.png');
        this.load.image('Isla2','resources/Piratas/Isla derecha medio.png');

        //ELEMENTOS DEL MUNDO DESTRUIDOS
        this.load.image('Isla1_Rota','resources/Piratas/Isla izquierda hundida.png');
        this.load.image('BarcoIzq_Roto','resources/Piratas/Barco izq hundido.png');
        this.load.image('BarcoDcha_Roto','resources/Piratas/barco derech hundido.png');
        this.load.image('Isla2_Rota','resources/Piratas/Isla derecha hundida.png');
        
        //PLAYERS SPRITES
        this.load.spritesheet('pirata_1', 'resources/Piratas/Spritesheetfinal barco1.png',{ frameWidth: 298, frameHeight: 116 });
        this.load.spritesheet('pirata_2', 'resources/Piratas/Spritesheet final2.png',{ frameWidth: 298, frameHeight: 116 });
        this.load.spritesheet('musicaBoton','resources/ajustes/musicaB.png',{ frameWidth: 370, frameHeight: 77 })   


        //BALAS
        this.load.image('bala_pirata','resources/Piratas/Bala de cañon.png');

        //CORAZÓN INTERFAZ
        this.load.image('corazon','resources/Juego/Corazon.png');

        //GATO
        this.load.image('gatoPirata','resources/Piratas/Gato pirata.png');

        //DAMAGE_BOOST
        this.load.image('damagePirata','resources/Piratas/Bala de cañon fuego.png');
        this.load.image('damage_bullet_1Pirata','resources/Piratas/Bala de cañon fuego izq.png');
        this.load.image('damage_bullet_2Pirata','resources/Piratas/Bala de cañon fuego dcha.png');

        //AUDIO
        this.load.audio('sonidoFondoPiratas','sounds/FightPiratas.mp3');
        this.load.audio('sonidoDisparo','sounds/DisparoPiratas.mp3');

        //BOTON PAUSA
        this.load.image('pausaPiratas','resources/BotonPausaP.png');
    }
    create ()
    {
        
        //FONDO
        this.add.image(1280/2, 720/2, 'Mar'); 
        
        //ELEMENTOS DESTRUIDOS
        this.add.image(WIDTH/2.6, HEIGHT/3.8, 'Isla1_Rota').setScale(0.75);
        this.add.image(WIDTH/1.3, 100, 'BarcoDcha_Roto').setScale(1.2);
        this.add.image(WIDTH/4.4, HEIGHT-90, 'BarcoIzq_Roto').setScale(1.2);
        this.add.image(1.8*WIDTH/3,HEIGHT/1.2, 'Isla2_Rota').setScale(0.75);

        //ELEMENTOS DEL MUNDO    
        piedras = this.physics.add.staticGroup();
        piedras.create(WIDTH/2, HEIGHT/2, 'Piedras');
        
        mundo=this.physics.add.staticGroup();
        mundo.create(50, 50, 'Isla3');
        mundo.create(WIDTH-30, HEIGHT-30, 'Isla4');

        obstaculos = this.physics.add.staticGroup();
        obstaculos.create(WIDTH/2.6, HEIGHT/3.8, 'Isla1').setScale(0.75);
        obstaculos.create(WIDTH/1.3, 100, 'BarcoDcha').setScale(1.2);
        obstaculos.create(WIDTH/4.4, HEIGHT-90, 'BarcoIzq').setScale(1.2);
        obstaculos.create(1.8*WIDTH/3, HEIGHT/1.2, 'Isla2').setScale(0.75);

        //BOTON PAUSA
        const pause_label=this.add.image(1280/2,50, 'pausaPiratas').setScale(0.25).setInteractive();
        pause_label.on('pointerdown', () => {
            sonidoFondo.pause();
            this.scene.switch('pausePiratas');
        });

        //Agregamos los vaqueros
        pirata_1 = this.physics.add.sprite(120, HEIGHT/4,'pirata_1').setScale(6/8);
        pirata_1.setCollideWorldBounds(true);

        pirata_2 = this.physics.add.sprite(WIDTH-100,3*HEIGHT/4,'pirata_2').setScale(6/8);
        pirata_2.setCollideWorldBounds(true);

        //Agregamos las animaciones de cada vaquero
        //Para el vaquero 1
        this.anims.create({
            key: 'andar_pirata_1',
            frames: this.anims.generateFrameNumbers('pirata_1', { start: 13, end: 34 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_pirata_1',
            frames: this.anims.generateFrameNumbers('pirata_1', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        //Para el vaquero 1
        this.anims.create({
            key: 'idle_pirata_2',
            frames: this.anims.generateFrameNumbers('pirata_2', { start: 22, end: 34}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'andar_pirata_2',
            frames: this.anims.generateFrameNumbers('pirata_2', { start: 0, end: 21 }),
            frameRate: 10,
            repeat: -1
        });

        //Agregamos colsiones de los vaqueros con el escenario
        this.physics.add.collider(pirata_1,piedras);
        this.physics.add.collider(pirata_2,piedras);
        this.physics.add.collider(pirata_1,mundo);
        this.physics.add.collider(pirata_2,mundo);
        this.physics.add.collider(pirata_1,obstaculos);
        this.physics.add.collider(pirata_2,obstaculos);

        //Asignamos una vida al azar entre un rango de valores
        obstaculos.children.iterate(function (child) {
            child.vida=Phaser.Math.Between(150, 250);
        });
        
        // Agregamos las balas
        balas_pirata_1 = this.physics.add.group();
        balas_pirata_2 = this.physics.add.group();

        //Inicialización de variables
        life1=100;
        life2=100;

        num_balas_1=4;
        num_balas_2=4;

        posibilidad_1=true;
        posibilidad_2=true;

        damage_1=10;
        damage_2=10;

        bullet_speed=500;

        vida_total_perdida=0;
        vida_extra=30;
        corazon_1_mostrado=false;
        corazon_2_mostrado=false;

        total_balas_empleadas=0;
        
        speedup_1_mostrado=false;
        speedup_2_mostrado=false;
        velocidad_extra_1=0;
        velocidad_extra_2=0;
        speedup_1_conseguido=0;
        speedup_2_conseguido=0;

        damage_boost_mostrado=false;
        damage_boost_1_conseguido=false;
        damage_boost_2_conseguido=false;
        extra_damage_1=0;
        extra_damage_2=0;

        //Asignamos vidas a los vaqueros
        pirata_1.life=life1;
        pirata_2.life=life2;
        
        //Añadimos los corazones en los cuales se almacenará la vida de los personajes
        this.add.image(50,50, 'corazon').setScale(1.25);
        this.add.image(WIDTH-50,50, 'corazon').setScale(1.25);

        //Textos
        texto1 = this.add.text(17, 30,pirata_1.life, {
            fontSize: '200px',
            fill: '#fff'
        }).setScale(1/5.8);

        //Textos
        texto2 = this.add.text(WIDTH-82, 30,pirata_2.life, {
            fontSize: '200px',
            fill: '#fff'
        }).setScale(1/5.8);
        
        // Función para colocar correctamente el texto 1
        function colocar_texto_1()
        {
            if(pirata_1.life<100 &&pirata_1.life>=10)
            {
                texto1.setX(28)
            }
            else if(pirata_1.life<10 && pirata_1.life>=0)
            {
                texto1.setX(38)
            }
            else
            {
                texto1.setX(17)
            }
        }

        //Función para colocar correctamente el texto 2
        function colocar_texto_2()
        {
            if(pirata_2.life<100 && pirata_2.life>=10)
            {
                texto2.setX(WIDTH-71)
            }
            else if(pirata_2.life<10 && pirata_2.life>=0)
            {
                texto2.setX(WIDTH-61)
            }
            else
            {
                texto2.setX(WIDTH-82)
            }
        }

       

        //Teclas
        var cursors = this.input.keyboard.createCursorKeys();
            const keyCodes= Phaser.Input.Keyboard.KeyCodes;
            //VAQUERO 1
            this.teclaA= this.input.keyboard.addKey(keyCodes.A);
            this.teclaD= this.input.keyboard.addKey(keyCodes.D);
            this.teclaW= this.input.keyboard.addKey(keyCodes.W);
            this.teclaS= this.input.keyboard.addKey(keyCodes.S);
            this.teclaF= this.input.keyboard.addKey(keyCodes.F);

            //VAQUERO 2
            this.teclaJ= this.input.keyboard.addKey(keyCodes.J);
            this.teclaL= this.input.keyboard.addKey(keyCodes.L);
            this.teclaI= this.input.keyboard.addKey(keyCodes.I);
            this.teclaK= this.input.keyboard.addKey(keyCodes.K);
            this.teclaH= this.input.keyboard.addKey(keyCodes.H);

            this.teclaG= this.input.keyboard.addKey(keyCodes.G);


        //Sonidos
        sonidoFondo = this.sound.add('sonidoFondoPiratas');
        sonidoDisparo = this.sound.add('sonidoDisparo');
        sonidoFondo.loop =true;
        
        sonidoFondo.play();
        
        // Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
        function herido_pirata_1(pirata_1,bala)
        {
            bala.destroy();
            num_balas_2++;
            total_balas_empleadas++;
            pirata_1.life-=bala.damage;
            vida_total_perdida+=bala.damage;
            texto1.setText(pirata_1.life);
            colocar_texto_1();
            if(pirata_1.life<=0)
            {
                this.scene.start('winJ2Piratas');
                sonidoFondo.stop();
            }
        }
        // Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
        function herido_pirata_2(pirata_2,bala)
        {
            bala.destroy();
            num_balas_1++;
            total_balas_empleadas++;
            pirata_2.life-=bala.damage;
            vida_total_perdida+=bala.damage;
            texto2.setText(pirata_2.life);
            colocar_texto_2();
            if (pirata_2.life<=0)
            {
                this.scene.start('winJ1Piratas');
                sonidoFondo.stop();
            }
        }
        //Colisiones de los personajes y las balas
        this.physics.add.overlap(pirata_1, balas_pirata_2, herido_pirata_1, null, this);
        this.physics.add.collider(pirata_2, balas_pirata_1, herido_pirata_2, null, this);
        
        // Función que se encarga de restar vida a los obstáculos si son golpeados por una bala del primer vaquero
        function damage_obstaculos_1(obstaculo,bala)
        {
            bala.destroy();
            num_balas_1++;
            total_balas_empleadas++;
            obstaculo.vida-=bala.damage;
            if(obstaculo.vida<=0)
            {
                obstaculo.destroy();
            }
        } 

        // Función que se encarga de restar vida a los obstáculos si son golpeados por una bala del segundo vaquero
        function damage_obstaculos_2(obstaculo,bala)
        {
            bala.destroy();
            num_balas_2++;
            total_balas_empleadas++;
            obstaculo.vida-=bala.damage;
            if(obstaculo.vida<=0)
            {
                obstaculo.destroy();
            }
        } 

        //Colisiones entre las balas y los obstáculos
        this.physics.add.collider(obstaculos, balas_pirata_1,damage_obstaculos_1, null, this);
        this.physics.add.collider(obstaculos, balas_pirata_2,damage_obstaculos_2, null, this);

        //POWER UPS

        //CORAZONES
        corazones = this.physics.add.staticGroup();

        // Funciones que se encarga de sumarle vida a los vaqueros si obtienen un power up de corazoón
        function obtener_corazon_1(corazon,bala)
        {
            bala.destroy();
            num_balas_1++;
            total_balas_empleadas++;
            pirata_1.life+=vida_extra;
            texto1.setText(pirata_1.life);
            colocar_texto_1();
            corazon.destroy();
        } 
        function obtener_corazon_2(corazon,bala)
        {
            bala.destroy();
            num_balas_2++;
            total_balas_empleadas++;
            pirata_2.life+=vida_extra;
            texto2.setText(pirata_2.life);
            colocar_texto_2();
            corazon.destroy();
        } 

        //Colisiones entre las balas y los corazones
        this.physics.add.collider(corazones, balas_pirata_1,obtener_corazon_1, null, this);
        this.physics.add.collider(corazones, balas_pirata_2,obtener_corazon_2, null, this);

        //SPEEDUP
        speedup=this.physics.add.staticGroup();

        //Función que se encarga de aumentar la velocidad de los personajes si cogen el power up correspondiente
        function obtener_speedup_1(speedup,bala)
        {
            bala.destroy();
            num_balas_1++;
            total_balas_empleadas++;
            velocidad_extra_1+=50;
            speedup.destroy();
            pirata_1.setTint(0xffff00);
            if(speedup_1_conseguido===0)
            {
                this.add.image(50,130, 'gatoPirata').setScale(2/7);
            }
            else
            {
                this.add.image(50,190, 'gatoPirata').setScale(2/7);
            }
            speedup_1_conseguido++;
        } 
        function obtener_speedup_2(speedup,bala)
        {
            bala.destroy();
            num_balas_2++;
            total_balas_empleadas++;
            velocidad_extra_2+=50;
            speedup.destroy();
            pirata_2.setTint(0xffff00);
            if(speedup_2_conseguido===0)
            {
                this.add.image(WIDTH-50,130, 'gatoPirata').setScale(2/7);
            }
            else
            {
                this.add.image(WIDTH-50,190, 'gatoPirata').setScale(2/7);
            }
            speedup_2_conseguido++;
        } 

        //Colisiones entre los objetos de speedup y las balas
        this.physics.add.collider(speedup, balas_pirata_1,obtener_speedup_1, null, this);
        this.physics.add.collider(speedup, balas_pirata_2,obtener_speedup_2, null, this);

        //DAMAGE_BOOST
        damage_boost=this.physics.add.staticGroup();

        //Función que se encarga de aumentar el daño de los personajes si cogen el power up correspondiente
        function obtener_damage_boost_1(damage_boost,bala)
        {
            bala.destroy();
            num_balas_1++;
            total_balas_empleadas++;
            extra_damage_1+=5;
            damage_boost.destroy();
            this.add.image(130,50, 'damagePirata').setScale(2/7);
            damage_boost_1_conseguido=true;
        } 

        function obtener_damage_boost_2(damage_boost,bala)
        {
            bala.destroy();
            num_balas_2++;
            total_balas_empleadas++;
            extra_damage_2+=5;
            damage_boost.destroy();
            this.add.image(WIDTH-162,50, 'damagePirata').setScale(2/7);
            damage_boost_2_conseguido=true;
        } 

        //Colisiones entre los objetos de damage_boost y las balas
        this.physics.add.collider(damage_boost, balas_pirata_1,obtener_damage_boost_1, null, this);
        this.physics.add.collider(damage_boost, balas_pirata_2,obtener_damage_boost_2, null, this);

        const mute = this.add.sprite(795, 50, 'musicaBoton').setInteractive().setScale(1/2);
        
        // Botón VOLVER
        // Define las animaciones del botón
        this.anims.create({
         key: 'buttonNormal599',
          frames: this.anims.generateFrameNumbers('musicaBoton', { start: 0, end: 0 }),
          frameRate: 1,
          repeat: 0
        });
    
        this.anims.create({
          key: 'buttonHover599',
          frames: this.anims.generateFrameNumbers('musicaBoton', { start: 1, end: 1 }),
          frameRate: 1,
            repeat: 0
        });
    
        this.anims.create({
          key: 'buttonClick599',
          frames: this.anims.generateFrameNumbers('musicaBoton', { start: 0, end: 0 }),
          frameRate: 1,
          repeat: 0
        });
    
        // Configura la interactividad del botón
        mute.on('pointerover', () => {
          mute.play('buttonHover599');
        });
    
        mute.on('pointerout', () => {
          mute.play('buttonNormal599');
        });
    
        mute.on('pointerdown', () => {
          mute.play('buttonClick599');
            //meter tiempo espera
            sonidoFondo.mute = !sonidoFondo.mute;
    
    
    
          });
    
          mute.on('pointerup', () => {
            mute.play('buttonHover599');
          });
    
    
    
    }

    update ()
    {
        
        //Continuamos el sonido si se pauso al entrar en la pausa
        sonidoFondo.resume();
        //Movimiento del vaquero 1
        if (this.teclaD.isDown)
        {
            pirata_1.setVelocityX(BASE_SPEED+velocidad_extra_1);
            pirata_1.setVelocityY(0);
            pirata_1.x++;
            pirata_1.anims.play('andar_pirata_1', true);
        }
        else if (this.teclaA.isDown)
        {
            pirata_1.setVelocityX(-BASE_SPEED-velocidad_extra_1);
            pirata_1.setVelocityY(0);
            pirata_1.x--;
            pirata_1.anims.play('andar_pirata_1', true);
        }
        else if (this.teclaW.isDown)
        {
            pirata_1.setVelocityX(0);
            pirata_1.setVelocityY(-BASE_SPEED-velocidad_extra_1);
            pirata_1.y--;
            pirata_1.anims.play('andar_pirata_1', true);
        }
        else if (this.teclaS.isDown)
        {
            pirata_1.setVelocityX(0);
            pirata_1.setVelocityY(BASE_SPEED+velocidad_extra_1);
            pirata_1.y++;
            pirata_1.anims.play('andar_pirata_1', true);
        }
        else
        {
            pirata_1.setVelocityX(0);
            pirata_1.setVelocityY(0);
            pirata_1.anims.play('idle_pirata_1', true);
        }
        //Gestión del disparo para el jugador 1
        if (this.teclaF.isDown)
        {
            if(num_balas_1>0 && posibilidad_1===true)
            {
                var imagen_1='bala_pirata';
                var escala_1=1/3;
                if(damage_boost_1_conseguido)
                {
                    imagen_1='damage_bullet_1Pirata';
                    escala_1=1/3;
                }
                var bala=balas_pirata_1.create(pirata_1.x+100,pirata_1.y,imagen_1).setScale(escala_1);
                bala.damage=damage_1+extra_damage_1;
                bala.setVelocity(bullet_speed, 0);
                posibilidad_1=false;
                num_balas_1--;
                sonidoDisparo.play();
            }
        }
        // Vuelve a darse la posibilidad de disparar una vez se deja de pulsar la F
        if (this.teclaF.isUp)
        {
            posibilidad_1=true;
        }
        //MOVIMIENTO VAQUERO 2

        if (this.teclaL.isDown)
        {
            pirata_2.setVelocityX(BASE_SPEED+velocidad_extra_2);
            pirata_2.setVelocityY(0);
            pirata_2.x++;
            pirata_2.anims.play('andar_pirata_2', true);
        }
        else if (this.teclaJ.isDown)
        {
            pirata_2.setVelocityX(-BASE_SPEED-velocidad_extra_2);
            pirata_2.setVelocityY(0);
            pirata_2.x--;
            pirata_2.anims.play('andar_pirata_2', true);
        }
        else if (this.teclaI.isDown)
        {
            pirata_2.setVelocityX(0);
            pirata_2.setVelocityY(-BASE_SPEED-velocidad_extra_2);
            pirata_2.y--;
            pirata_2.anims.play('andar_pirata_2', true);
        }
        else if (this.teclaK.isDown)
        {
            pirata_2.setVelocityX(0);
            pirata_2.setVelocityY(BASE_SPEED+velocidad_extra_2);
            pirata_2.y++;
            pirata_2.anims.play('andar_pirata_2', true);
        }
        else
        {
            pirata_2.setVelocityX(0);
            pirata_2.setVelocityY(0);
            pirata_2.anims.play('idle_pirata_2', true);
        }
        //Gestión del disparo para el jugador 2
        if (this.teclaH.isDown)
        {
            if(num_balas_2>0 && posibilidad_2===true)
            {
                var imagen_2='bala_pirata';
                var escala_2=1/3;
                if(damage_boost_2_conseguido)
                {
                    imagen_2='damage_bullet_2Pirata';
                    escala_2=1/3;
                }
                var bala=balas_pirata_2.create(pirata_2.x-100,pirata_2.y,imagen_2).setScale(escala_2);
                bala.damage=damage_2+extra_damage_2;
                bala.setVelocity(-bullet_speed, 0);
                posibilidad_2=false;
                num_balas_2--;
                sonidoDisparo.play();
            }
        }
        // Vuelve a darse la posibilidad de disparar una vez se deja de pulsar la H
        if (this.teclaH.isUp)
        {
            posibilidad_2=true;
        }
        //Se comprueba si las balas del primer vaquero salen del mundo, porque no han impactado con ningún objeto ni jugador
        balas_pirata_1.children.iterate(function (child) {
            if(child!=null)
            {
                if(child.x>=WIDTH)
                {
                    child.destroy();
                    num_balas_1++;
                    total_balas_empleadas++;
                }
            }
        });
        //Se comprueba si las balas del segundo vaquero salen del mundo, porque no han impactado con ningún objeto ni jugador
        balas_pirata_2.children.iterate(function (child) {
            if(child!=null)
            {
                if(child.x<=0)
                {
                    child.destroy();
                    num_balas_2++;
                    total_balas_empleadas++;
                }
            }
        });

        //Comprobaremos la cantidad total de vida perdida para crear los objetos corazón en función de la misma
        if(vida_total_perdida>=70 && corazon_1_mostrado===false)
        {
            corazones.create(WIDTH/2, 2*HEIGHT/6, 'corazon');
            corazon_1_mostrado=true;
        }

        if(vida_total_perdida>=110 && corazon_2_mostrado===false)
        {
            corazones.create(WIDTH/2, 5*HEIGHT/8, 'corazon');
            corazon_2_mostrado=true;
        }
        //Comprobaremos la cantidad de balas totales empleadas para crear los objetos speedup en función de la misma
        if(total_balas_empleadas>=(Phaser.Math.Between(20, 35)) && speedup_1_mostrado===false)
        {
            speedup.create(WIDTH/2, 1*HEIGHT/6+20, 'gatoPirata').setScale(1/2);
            speedup_1_mostrado=true;
        }

        if(total_balas_empleadas>=(Phaser.Math.Between(50, 65)) && speedup_2_mostrado===false)
        {
            speedup.create(WIDTH/2, 6*HEIGHT/8, 'gatoPirata').setScale(1/2);
            speedup_2_mostrado=true;
        }

        //Comprobaremos la cantidad de balas totales empleadas para crear los objetos damage_boost en función de la misma
        if(total_balas_empleadas>=(Phaser.Math.Between(40, 55)) && damage_boost_mostrado===false)
        {
            damage_boost.create(WIDTH/2, HEIGHT/2, 'damagePirata').setScale(1/2);
            damage_boost_mostrado=true;
        }
    }

}
