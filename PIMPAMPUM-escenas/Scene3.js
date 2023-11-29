class Scene3 extends Phaser.Scene {
    constructor() {
        super("playGame");
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

    //PLAYERS
    this.load.image('vaquero', 'resources/Vaquero derecha.png');
    this.load.image('vaquero_2', 'resources/Vaquero2 izquierda.png');


}
    create ()
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
    
        vaquero_1.setBounce(0.1);
        vaquero_1.setCollideWorldBounds(false);
        vaquero_1.body.setGravityY(0);


        vaquero_2.setBounce(0.1);
        vaquero_2.setCollideWorldBounds(true);
        vaquero_2.body.setGravityY(0);

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

        //Efecto sombra
        //vaquero_1.setInteractive();
        //const fxShadow = phaserVia.preFX.addShadow(80, -90, 0.006, 2, 0x333333, 10);

        cursors = this.input.keyboard.createCursorKeys();
            const keyCodes= Phaser.Input.Keyboard.KeyCodes;
            this.teclaA= this.input.keyboard.addKey(keyCodes.A);
            this.teclaD= this.input.keyboard.addKey(keyCodes.D);
            this.teclaW= this.input.keyboard.addKey(keyCodes.W);
            this.teclaJ= this.input.keyboard.addKey(keyCodes.S);


    }
}