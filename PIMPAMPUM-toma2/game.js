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
            gravity: { y: 300 },
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
}

function create ()
{
     this.add.image(WIDTH/2, HEIGHT/2, 'Desierto');
    
    //this.add.image(0, 0, 'Vías').SetOrigin(0, 0);
    vias = this.physics.add.staticGroup();
    vias.create(WIDTH/2, HEIGHT/2, "Vias");
    

}

function update ()
{
    
}
