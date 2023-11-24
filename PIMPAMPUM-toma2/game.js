var vias;

var config = {
    type: Phaser.AUTO,
    width:2048,
    height:1152,
    
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
    
    this.load.image('Vías', 'resources/tren.png');
}

function create ()
{
    this.add.image(1023, 576, 'Desierto').SetOrigin(0, 0)
    
    this.add.image(800, 400, 'Vías').SetOrigin(0, 0);
    vias = this.physics.add.staticGroup();

    platforms.create(300,300, 'vias');
    

}

function update ()
{
    
}
