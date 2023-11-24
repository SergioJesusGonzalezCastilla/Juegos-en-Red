var vias;

var config = {
    type: Phaser.AUTO,
    width:2048,
    height:1152,

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
    
    this.load.image('Vías','resources/Vias de Tren-png');
}

function create ()
{
    this.add.image(1023, 576, 'Desierto').SetOrigin(0, 0)
    
    this.add.image(400, 300, 'Vías');
    

}

function update ()
{
    
}