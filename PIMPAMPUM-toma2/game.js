// Elementos del mundo
    var vias;
    var tanque;
    var carreta1;
    var carreta2;
    var mesa;

//Jugador
var vaquero_1;
var vaquero_2;

//Vida del jugador
   var texto1;
    var vida = 3;

//Tamaño de la pantalla
    const WIDTH = 1280;
    const HEIGHT = 720;

//Vida de cada Jugador
    var life1=100;
    var life2=100;

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
    tanque.create(WIDTH/2, HEIGHT/2, 'Tanque');

    carreta1 = this.physics.add.staticGroup();
    carreta1.create(WIDTH/2, HEIGHT/2, 'Carreta1');

    carreta2 = this.physics.add.staticGroup();
    carreta2.create(WIDTH/2, HEIGHT/2, 'Carreta2');

    mesa = this.physics.add.staticGroup();
    mesa.create(WIDTH/2, HEIGHT/2, 'Mesa');

    //Agregamos los vaqueros
    vaquero_1 = this.physics.add.sprite(WIDTH/4, HEIGHT/4,'vaquero');
    vaquero_1.setCollideWorldBounds(true);

    vaquero_2 = this.physics.add.sprite(3*WIDTH/4,3*HEIGHT/4,'vaquero_2');
    vaquero_2.setCollideWorldBounds(true);

    //Agregamos colsiones de los vaqueros
    this.physics.add.collider(vaquero_1,vias);
    this.physics.add.collider(vaquero_2,vias);

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


    
//Sonido Fondo
var sonidoFondo = this.sound.add('sonidoFondo');
var sonidoDisparo = this.sound.add('sonidoDisparo');
sonidoFondo.play();
    
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
    //Sonido disparo
    if (this.teclaF.isDown)
    {
        sonidoDisparo.play();
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
}
}
