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
    this.load.image('Desierto', 'resources/Fondo Desierto.png');    
    
    //ELEMENTOS DEL MUNDO
    this.load.image('Vías','resources/Vias de Tren.png');
    this.load.image('Tanque','resources/Agüita.png');
    this.load.image('Carreta1','resources/Carreta derecha.png');
    this.load.image('Carreta2','resources/Carreta izquierda.png');
    this.load.image('Mesa','resources/Mesa.png');

    //PLAYERS
    this.load.image('vaquero', 'resources/vaquero.png');
    this.load.image('vaquero_2', 'resources/vaquero_2.png');


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

    //Texto
    texto = this.add.text(16, 16, 'vida:', {
        fontSize: '200px',
        fill: '#000'
    })
    

}

function update ()
{
    
}
