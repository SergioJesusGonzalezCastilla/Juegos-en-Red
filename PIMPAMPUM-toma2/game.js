
// Elementos del mundo
var vias;
var obstaculos;

//Jugador
var vaquero_1;
var vaquero_2;

// Balas
var balas_vaquero_1;
var balas_vaquero_2;

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
var posibilidad_2;

//Daño por disparo
var damage_1;
var damage_2;

//Velocidad balas
var bullet_speed;

//Variables para los sonidos
var sonidoFondo ;
var sonidoDisparo;

export class Game extends Phaser.Scene{
    constructor(){
        super({key:'game'});
    }
    
    preload ()
    {
        //FONDO
        this.load.image('Desierto', 'resources/FondoDesierto.png'); 
        
        //ELEMENTOS DEL MUNDO
        this.load.image('Vías','resources/ViasTren.png');
        this.load.image('Tanque','resources/Agua.png');
        this.load.image('Carreta1','resources/CarretaDerecha.png');
        this.load.image('Carreta2','resources/CarretaIzquierda.png');
        this.load.image('Mesa','resources/MesaDerecha.png');

        //ELEMENTOS DEL MUNDO DESTRUIDOS
        this.load.image('Carreta1_Rota','resources/Carreta derecha rota.png');
        this.load.image('Carreta2_Rota','resources/Carreta izq rota.png');
        this.load.image('Mesa_Rota','resources/Mesa Rota.png');
        
        //PLAYERS
        this.load.image('vaquero', 'resources/Vaquero derecha.png');
        this.load.image('vaquero_2', 'resources/Vaquero2 izquierda.png');

        //BALAS
        this.load.image('bala_vaquero_1','resources/Bala_Derecha.png')
        this.load.image('bala_vaquero_2','resources/Bala_Izquierda.png')
        
        //AUDIO
        this.load.audio('sonidoFondo','sounds/BackgroundFightSound.mp3')
        this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')
    }
    create ()
    {
        
        //FONDO
        //this.physics.world.setCollideWorldBounds(true,true,true,false);
        this.add.image(1280/2, 720/2, 'Desierto');   

        //ELEMENTOS DESTRUIDOS
        this.add.image(WIDTH/1.3, 100, 'Carreta1_Rota');
        this.add.image(WIDTH/4.4, HEIGHT-90, 'Carreta2_Rota');
        this.add.image(1.8*WIDTH/3,HEIGHT/1.2, 'Mesa_Rota');
        
        //ELEMENTOS DEL MUNDO    
        vias = this.physics.add.staticGroup();
        vias.create(WIDTH/2, HEIGHT/2, 'Vías');
        
        obstaculos = this.physics.add.staticGroup();
        obstaculos.create(WIDTH/3.2, HEIGHT/15, 'Tanque');
        obstaculos.create(WIDTH/1.3, 100, 'Carreta1');
        obstaculos.create(WIDTH/4.5, HEIGHT-90, 'Carreta2');
        obstaculos.create(1.8*WIDTH/3, HEIGHT/1.2, 'Mesa');

        //Agregamos los vaqueros
        vaquero_1 = this.physics.add.sprite(100, HEIGHT/4,'vaquero').setScale(7/8);
        vaquero_1.setCollideWorldBounds(true);

        vaquero_2 = this.physics.add.sprite(WIDTH-100,3*HEIGHT/4,'vaquero_2').setScale(7/8);
        vaquero_2.setCollideWorldBounds(true);

        //Agregamos colsiones de los vaqueros con el escenario
        this.physics.add.collider(vaquero_1,vias);
        this.physics.add.collider(vaquero_2,vias);
        this.physics.add.collider(vaquero_1,obstaculos);
        this.physics.add.collider(vaquero_2,obstaculos);

        //Asignamos una vida al azar entre un rango de valores
        obstaculos.children.iterate(function (child) {
            child.vida=Phaser.Math.Between(200, 300);
        });
        
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
        
        //Textos
        texto1 = this.add.text(16, 16, 'Vida P1:'+vaquero_1.life, {
            fontSize: '200px',
            fill: '#fff'
        }).setScale(1/5.8);

        //Textos
        texto2 = this.add.text(WIDTH-250, 16, 'Vida P2:'+vaquero_2.life, {
            fontSize: '200px',
            fill: '#000'
        }).setScale(1/5.8);
        
        //Efecto sombra
        //vaquero_1.setInteractive();
        //const fxShadow = phaserVia.preFX.addShadow(80, -90, 0.006, 2, 0x333333, 10);

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
        sonidoFondo = this.sound.add('sonidoFondo');
        sonidoDisparo = this.sound.add('sonidoDisparo');
        sonidoFondo.play();
        
        // Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
        function herido_vaquero_1(vaquero_1,bala)
        {
            bala.destroy();
            num_balas_2++;
            vaquero_1.life-=bala.damage;
            texto1.setText('Vida P1:'+vaquero_1.life);
            if(vaquero_1.life<=0)
            {
                vaquero_1.setTint(0xff0000);
                //gameOver=true;
            }
        }
        // Función con las acciones que se llevan a cabo en caso de que el jugador 1 sea golpeado
        function herido_vaquero_2(vaquero_2,bala)
        {
            bala.destroy();
            num_balas_1++;
            vaquero_2.life-=bala.damage;
            texto2.setText('Vida P1:'+vaquero_2.life);
            if (vaquero_2.life<=0)
            {
                vaquero_2.setTint(0xff0000);
                //gameOver=true;
            }
        }
        //Colisiones de los personajes y las balas
        this.physics.add.overlap(vaquero_1, balas_vaquero_2, herido_vaquero_1, null, this);
        this.physics.add.collider(vaquero_2, balas_vaquero_1, herido_vaquero_2, null, this);
        
        // Función que se encarga de restar vida a los obstáculos si son golpeados por una bala del primer vaquero
        function damage_obstaculos_1(obstaculo,bala)
        {
            bala.destroy();
            num_balas_1++;
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
            obstaculo.vida-=bala.damage;
            if(obstaculo.vida<=0)
            {
                obstaculo.destroy();
            }
        } 

        //Colisiones entre las balas y los obstáculos
        this.physics.add.collider(obstaculos, balas_vaquero_1,damage_obstaculos_1, null, this);
        this.physics.add.collider(obstaculos, balas_vaquero_2,damage_obstaculos_2, null, this);
    }

    update ()
    {
        //Movimiento del vaquero 1
        if (this.teclaD.isDown)
        {
            vaquero_1.setVelocityX(80);
            vaquero_1.setVelocityY(0);
            vaquero_1.x++;
        }
        else if (this.teclaA.isDown)
        {
            vaquero_1.setVelocityX(-80);
            vaquero_1.setVelocityY(0);
            vaquero_1.x--;
        }
        else if (this.teclaW.isDown)
        {
            vaquero_1.setVelocityX(0);
            vaquero_1.setVelocityY(-80);
            vaquero_1.y--;
        }
        else if (this.teclaS.isDown)
        {
            vaquero_1.setVelocityX(0);
            vaquero_1.setVelocityY(80);
            vaquero_1.y++;
        }
        else
        {
            vaquero_1.setVelocityX(0);
            vaquero_1.setVelocityY(0);
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
        }
        else if (this.teclaJ.isDown)
        {
            vaquero_2.setVelocityX(-80);
            vaquero_2.setVelocityY(0);
            vaquero_2.x--;
        }
        else if (this.teclaI.isDown)
        {
            vaquero_2.setVelocityX(0);
            vaquero_2.setVelocityY(-80);
            vaquero_2.y--;
        }
        else if (this.teclaK.isDown)
        {
            vaquero_2.setVelocityX(0);
            vaquero_2.setVelocityY(80);
            vaquero_2.y++;
        }
        else
        {
            vaquero_2.setVelocityX(0);
            vaquero_2.setVelocityY(0);
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
