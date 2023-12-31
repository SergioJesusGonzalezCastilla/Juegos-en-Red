
// Elementos del mundo
var vias;

//Jugador
var vaquero_1;
var vaquero_2;

// Balas
var balas_vaquero_1;
var balas_vaquero_2;

//Tamaño de la pantalla
var WIDTH = 1280;
var HEIGHT = 720;


//Vida de cada Jugador
var life1;
var life2;

//Contador de balas por lanzar simultáneamente para cada jugador
var num_balas_1;
var num_balas_2;

//Booleano para comprobar que se pueda disparar
var posibilidad_1;
var posibilidad_2;

//Daño por disparo
var damage_1;
var damage_2;

//Velocidad balas
var bullet_speed;

//Variables para los sonidos
var sonidoDisparo;
var sonidoSimulador;


export class Simulador extends Phaser.Scene{

    constructor(){
        super({key:'simulador'});
    }

    preload ()
    {
        //FONDO
        this.load.image('Simulador', 'resources/simulador/SimuladorFondo.png'); 
        
        //ELEMENTOS DEL MUNDO
        this.load.image('Brecha','resources/simulador/FranjaSimulador.png');
        
        //PLAYERS
        //PLAYERS SPRITES
        this.load.spritesheet('vaquero_1S', 'resources/Juego/Vaquero dch spritesheet.png',{ frameWidth: 203, frameHeight: 72 });
        this.load.spritesheet('vaquero_2S', 'resources/Juego/Vaquero izq spritesheet.png',{ frameWidth: 204, frameHeight: 70 });

        //BALAS
        this.load.image('bala_vaquero_1','resources/Juego/Bala_Derecha.png');
        this.load.image('bala_vaquero_2','resources/Juego/Bala_Izquierda.png');
        
        //AUDIO
        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3');
        this.load.audio('sonidoSimulador','resources/simulador/simulador.mp3');


        //BOTON
        this.load.spritesheet('botonVolverS','resources/simulador/VolverSimulador.png',{ frameWidth: 263, frameHeight: 73 });   


    }
    
    
    create ()
    {
        
        //FONDO
        //this.physics.world.setCollideWorldBounds(true,true,true,false);
        this.add.image(1280/2, 720/2, 'Simulador');   

        
        //ELEMENTOS DEL MUNDO    
        vias = this.physics.add.staticGroup();
        vias.create(1249/2, 720/2, 'Brecha');

        const volver = this.add.sprite(620, 640, 'botonVolverS').setInteractive();

        //Agregamos los vaqueros
        vaquero_1 = this.physics.add.sprite(100, HEIGHT/4,'vaquero_1S').setScale(7/8);
        vaquero_1.setCollideWorldBounds(true);

        vaquero_2 = this.physics.add.sprite(WIDTH-100,3*HEIGHT/4,'vaquero_2S').setScale(7/8);
        vaquero_2.setCollideWorldBounds(true);

        //Agregamos las animaciones de cada vaquero
        //Para el vaquero 1
        this.anims.create({
            key: 'andar_vaquero_1S',
            frames: this.anims.generateFrameNumbers('vaquero_1S', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_vaquero_1S',
            frames: this.anims.generateFrameNumbers('vaquero_1S', { start: 7, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        //Para el vaquero 1
        this.anims.create({
            key: 'idle_vaquero_2S',
            frames: this.anims.generateFrameNumbers('vaquero_2S', { start: 0, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'andar_vaquero_2S',
            frames: this.anims.generateFrameNumbers('vaquero_2S', { start: 17, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        //Agregamos colsiones de los vaqueros con el escenario
        this.physics.add.collider(vaquero_1,vias);
        this.physics.add.collider(vaquero_2,vias);

        
        // Agregamos las balas
        balas_vaquero_1 = this.physics.add.group();
        balas_vaquero_2 = this.physics.add.group();

        //Inicialización de variables
        life1=100;
        life2=100;

        num_balas_1=3;
        num_balas_2=3;

        posibilidad_1=true;
        posibilidad_2=true;

        damage_1=10;
        damage_2=10;

        bullet_speed=400;
        
        //Asignamos vidas a los vaqueros
        vaquero_1.life=life1;
        vaquero_2.life=life2;

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

        //Sonidos
        sonidoDisparo = this.sound.add('sonidoDisparo');
        sonidoSimulador = this.sound.add('sonidoSimulador');
        sonidoSimulador.play();

        
        // Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
        function herido_vaquero_1(vaquero_1,bala)
        {
            bala.destroy();
            num_balas_2++;
            vaquero_1.life-=bala.damage;
            
        }
        // Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
        function herido_vaquero_2(vaquero_2,bala)
        {
            bala.destroy();
            num_balas_1++;
            vaquero_2.life-=bala.damage;
           
        }
        //Colisiones de los personajes y las balas
        this.physics.add.overlap(vaquero_1, balas_vaquero_2, herido_vaquero_1, null, this);
        this.physics.add.collider(vaquero_2, balas_vaquero_1, herido_vaquero_2, null, this);

        // Botón VOLVER
        // Define las animaciones del botón
        this.anims.create({
            key: 'buttonNormal41',
            frames: this.anims.generateFrameNumbers('botonVolverS', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'buttonHover41',
            frames: this.anims.generateFrameNumbers('botonVolverS', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'buttonClick41',
            frames: this.anims.generateFrameNumbers('botonVolverS', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: 0
        });

        // Configura la interactividad del botón
        volver.on('pointerover', () => {
          volver.play('buttonHover41');
        });

        volver.on('pointerout', () => {
          volver.play('buttonNormal41');
        });

        volver.on('pointerdown', () => {
          volver.play('buttonClick41');
            //meter tiempo espera
            this.scene.transition({
                target: 'menu-inicio',
                duration:1000,
            });
            sonidoSimulador.stop();

            

        });

        volver.on('pointerup', () => {
          volver.play('buttonHover4');
        });

}

    

    update ()
    {
        //Movimiento del vaquero 1
        if (this.teclaD.isDown)
        {
            vaquero_1.setVelocityX(80);
            vaquero_1.setVelocityY(0);
            vaquero_1.x++;
            vaquero_1.anims.play('andar_vaquero_1S', true);
        }
        else if (this.teclaA.isDown)
        {
            vaquero_1.setVelocityX(-80);
            vaquero_1.setVelocityY(0);
            vaquero_1.x--;
            vaquero_1.anims.play('andar_vaquero_1S', true);
        }
        else if (this.teclaW.isDown)
        {
            vaquero_1.setVelocityX(0);
            vaquero_1.setVelocityY(-80);
            vaquero_1.y--;
            vaquero_1.anims.play('andar_vaquero_1S', true);
        }
        else if (this.teclaS.isDown)
        {
            vaquero_1.setVelocityX(0);
            vaquero_1.setVelocityY(80);
            vaquero_1.y++;
            vaquero_1.anims.play('andar_vaquero_1S', true);
        }
        else
        {
            vaquero_1.setVelocityX(0);
            vaquero_1.setVelocityY(0);
            vaquero_1.anims.play('idle_vaquero_1S', true);
        }
        //Gestión del disparo para el jugador 1
        if (this.teclaF.isDown)
        {
            if(num_balas_1>0 && posibilidad_1===true)
            {
                var bala=balas_vaquero_1.create(vaquero_1.x+100,vaquero_1.y,'bala_vaquero_1').setScale(1/2);
                bala.damage=damage_1;
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
            vaquero_2.setVelocityX(80);
            vaquero_2.setVelocityY(0);
            vaquero_2.x++;
            vaquero_2.anims.play('andar_vaquero_2S', true);
        }
        else if (this.teclaJ.isDown)
        {
            vaquero_2.setVelocityX(-80);
            vaquero_2.setVelocityY(0);
            vaquero_2.x--;
            vaquero_2.anims.play('andar_vaquero_2S', true);
        }
        else if (this.teclaI.isDown)
        {
            vaquero_2.setVelocityX(0);
            vaquero_2.setVelocityY(-80);
            vaquero_2.y--;
            vaquero_2.anims.play('andar_vaquero_2S', true);
        }
        else if (this.teclaK.isDown)
        {
            vaquero_2.setVelocityX(0);
            vaquero_2.setVelocityY(80);
            vaquero_2.y++;
            vaquero_2.anims.play('andar_vaquero_2S', true);
        }
        else
        {
            vaquero_2.setVelocityX(0);
            vaquero_2.setVelocityY(0);
            vaquero_2.anims.play('idle_vaquero_2S', true);
        }
        //Gestión del disparo para el jugador 2
        if (this.teclaH.isDown)
        {
            if(num_balas_2>0 && posibilidad_2===true)
            {
                var bala=balas_vaquero_2.create(vaquero_2.x-100,vaquero_2.y,'bala_vaquero_2').setScale(1/2);
                bala.damage=damage_2;
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
        balas_vaquero_1.children.iterate(function (child) {
            if(child!=null)
            {
                if(child.x>=WIDTH)
                {
                    child.destroy();
                    num_balas_1++;
                }
            }
        });
        //Se comprueba si las balas del segundo vaquero salen del mundo, porque no han impactado con ningún objeto ni jugador
        balas_vaquero_2.children.iterate(function (child) {
            if(child!=null)
            {
                if(child.x<=0)
                {
                    child.destroy();
                    num_balas_2++;
                }
            }
        });
    }

}
