var vias;
var tanque;
var carreta1;
var carreta2;
var mesa;

var player;


var texto;
var vida = 3;

const WIDTH = 1280;
const HEIGHT = 720;

var life1=100;
var life2=100;

var config = {
    type: Phaser.AUTO,
    width:WIDTH,
    height:HEIGHT,
    
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);

function preload ()
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


}

function create ()
{
    
//FONDO
    this.add.image(WIDTH/2, HEIGHT/2, 'Desierto');   
    
    //ELEMENTOS DEL MUNDO
    vias = this.physics.add.staticGroup();
    this.add.image(WIDTH/2, HEIGHT/2, 'Vías').setScale(1/2);
    
    tanque = this.physics.add.staticGroup();
    this.add.image(WIDTH/2, HEIGHT/2, 'Tanque').setScale(1/2);

    carreta1 = this.physics.add.staticGroup();
    this.add.image(WIDTH/2, HEIGHT/2, 'Carreta1').setScale(1/2);

    carreta2 = this.physics.add.staticGroup();
    this.add.image(WIDTH/2, HEIGHT/2, 'Carreta2').setScale(1/2);

    mesa = this.physics.add.staticGroup();
    this.add.image(WIDTH/2, HEIGHT/2, 'Mesa').setScale(1/2);


    //Agregamos los vaqueros
    vaquero_1 = this.physics.add.sprite(WIDTH/4, HEIGHT/4,'vaquero');
    vaquero_2 = this.physics.add.sprite(3*WIDTH/4,3*HEIGHT/4,'vaquero_2');
    player.setCollideWorldBounds(true);

    //Textos
    texto1 = this.add.text(16, 16, 'Vida P1:'+life1, {
        fontSize: '200px',
        fill: '#fff'
    }).setScale(1/5.8);
    //Textos
    texto1 = this.add.text(WIDTH-250, 16, 'Vida P2:'+life2, {
        fontSize: '200px',
        fill: '#000'
    }).setScale(1/5.8);
    

}

function update ()
{
    //Movimiento del vaquero 1
    if (cursors.left.isDown)
    {
    player.setVelocityX(-160);

    player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
    player.setVelocityX(160);

    player.anims.play('right', true);
    }
    if (cursors.down.isDown)
    {
    player.setVelocityY(-160);

    player.anims.play('down', true);
    }
    else if (cursors.up.isDown)
    {
    player.setVelocityY(160);

    player.anims.play('up', true);
    }
}
