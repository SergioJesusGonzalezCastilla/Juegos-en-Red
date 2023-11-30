// Elementos del mundo
var vias;
var tanque;
var carreta1;
var carreta2;
var mesa;

//Jugador
var vaquero_1;
var vaquero_2;

/ Balas
var balas_vaquero_1;
var balas_vaquero_2;

//Tamaño de la pantalla
    const WIDTH = 1280;
    const HEIGHT = 720;

//Textos
var texto1;
var texto2;

//Vida de cada Jugador
var life1;
var life2;

//Contador de balas por lanzar simultáneamente para cada jugador
var num_balas_1;
var num_balas_2;

//Booleano para comporbar que se pueda disparar
var posibilidad_1;
var posibilidad_2;

//Daño por disparo
var daño_1;
var daño_2;

//Variables para los sonidos
var sonidoFondo ;
var sonidoDisparo;

export class Game extends Phaser.Scene{

    constructor(){
        super({key:'game'});
    }
 

    
//PRELOAD
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

    //PLAYERS
    this.load.image('vaquero', 'resources/Vaquero derecha.png');
    this.load.image('vaquero_2', 'resources/Vaquero2 izquierda.png');

    /BALAS
    this.load.image('bala_vaquero_1','resources/Bala_Derecha.png')
    this.load.image('bala_vaquero_2','resources/Bala_Izquierda.png')
    
    //AUDIO
    this.load.audio('sonidoFondo','sounds/BackgroundFightSound.mp3')
    this.load.audio('sonidoDisparo','sounds/disparoSound.mp3')

}

//CREATE
create ()
{
    
//FONDO
    this.add.image(WIDTH/2, HEIGHT/2, 'Desierto');   
    
    //ELEMENTOS DEL MUNDO    
    vias = this.physics.add.staticGroup();
    vias.create(WIDTH/2, HEIGHT/2, 'Vías');
    
    tanque = this.physics.add.staticGroup();
    tanque.create(WIDTH/3.2, HEIGHT/15, 'Tanque');

    carreta1 = this.physics.add.staticGroup();
    carreta1.create(WIDTH/1.3, 100, 'Carreta1');

    carreta2 = this.physics.add.staticGroup();
    carreta2.create(WIDTH/4.5, HEIGHT-90, 'Carreta2');

    mesa = this.physics.add.staticGroup();
    mesa.create(1.8*WIDTH/3, HEIGHT/1.2, 'Mesa');

    //Agregamos los vaqueros
    vaquero_1 = this.physics.add.sprite(100, HEIGHT/4,'vaquero').setScale(7/8);
    vaquero_1.setCollideWorldBounds(true);

    vaquero_2 = this.physics.add.sprite(WIDTH-100,3*HEIGHT/4,'vaquero_2').setScale(7/8);
    vaquero_2.setCollideWorldBounds(true);

    //Agregamos colsiones de los vaqueros con el escenario
    this.physics.add.collider(vaquero_1,vias);
    this.physics.add.collider(vaquero_2,vias);
    this.physics.add.collider(vaquero_1,tanque);
    this.physics.add.collider(vaquero_2,carreta1);
    this.physics.add.collider(vaquero_1,carreta2);
    this.physics.add.collider(vaquero_2,mesa);

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

    //Texto vida jugador 1
    texto1 = this.add.text(16, 16, 'Vida P1:'+life1, {
        fontSize: '200px',
        fill: '#fff'
    }).setScale(1/5.8);
    
    //Texto vida jugador 2
    texto1 = this.add.text(WIDTH-250, 16, 'Vida P2:'+life2, {
        fontSize: '200px',
        fill: '#000'
    }).setScale(1/5.8);

    //Efecto sombra
    //vaquero_1.setInteractive();
    //const fxShadow = phaserVia.preFX.addShadow(80, -90, 0.006, 2, 0x333333, 10);

    cursors = this.input.keyboard.createCursorKeys();
        const keyCodes= Phaser.Input.Keyboard.KeyCodes;
        //VAQUERO 1
        this.teclaA= this.input.keyboard.addKey(keyCodes.A);
        this.teclaD= this.input.keyboard.addKey(keyCodes.D);
        this.teclaW= this.input.keyboard.addKey(keyCodes.W);
        this.teclaS= this.input.keyboard.addKey(keyCodes.S);
        this.teclaF= this.input.keyboard.addKey(keyCodes.H);
        this.teclaZ= this.input.keyboard.addKey(keyCodes.Z);


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
            life1-=daño_2;
            texto1.setText('Vida P1:'+life1);
            if(life1<=0)
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
            life2-=daño_1;
            texto2.setText('Vida P1:'+life2);
            if (life2<=0)
            {
                vaquero_2.setTint(0xff0000);
                //gameOver=true;
            }
        }
        //Colisiones de los personajes y las balas
        this.physics.add.overlap(vaquero_1, balas_vaquero_2, herido_vaquero_1, null, this);
        this.physics.add.collider(vaquero_2, balas_vaquero_1, herido_vaquero_2, null, this);

}

//UPDATE
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
    else if (this.teclaZ.isDown)
   {
    this.scene.start('gameover');

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
        var bala=balas_vaquero_1.create(vaquero_1.x,vaquero_1.y,'bala_vaquero_1').setScale(1/2);
        bala.setCollideWorldBounds(true);
        bala.setVelocity(300, 0);
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
        var bala=balas_vaquero_2.create(vaquero_2.x,vaquero_2.y,'bala_vaquero_2').setScale(1/2);
        bala.setCollideWorldBounds(true);
        bala.setVelocity(-300, 0);
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
}
}
