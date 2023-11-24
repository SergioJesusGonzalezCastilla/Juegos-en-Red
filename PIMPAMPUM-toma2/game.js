var vias;

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
    this.load.image('Desierto', 'resources/Fondo1.png');
    
    this.load.image('Vias', 'resources/tren.png');

    this.load.image('vaquero', 'resources/vaquero.png');
    this.load.image('vaquero_2', 'resources/vaquero_2.png');
}

function create ()
{
     this.add.image(WIDTH/2, HEIGHT/2, 'Desierto');
    
    // Agregamos las vías al escenario
    vias = this.physics.add.staticGroup();
    vias.create(WIDTH/2, HEIGHT/2, "Vias");

    /Agregamos los vaqueros
    vaquero_1 = this.physics.add.sprite(WIDTH/4, HEIGHT/4,'vaquero');
    vaquero_2 = this.physics.add.sprite(3*WIDTH/4,3*HEIGHT/4,'vaquero_2');
    player.setCollideWorldBounds(true);

}

function update ()
{
    
}
