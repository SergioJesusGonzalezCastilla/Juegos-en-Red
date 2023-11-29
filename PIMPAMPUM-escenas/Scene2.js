class Scene2 extends Phaser.Scene {
    constructor() {
        super("controlGame");
    }
    preload() {
        this.load.image("controls", "resources/Controles.png");
    }
    create() {
        this.background = this.add.image(0,0,"controls");
        this.background.setOrigin(0,0);
        
        this.createKeyboardInput();
    }
    createKeyboardInput () {
        function handleKeyUp (e) {
            switch(e.code) {
                case 'Enter':
                    this.bootMenu();
                    break;
            }
        }
        this.input.keyboard.on('keyup', handleKeyUp, this);
    }
    bootMenu () {
        this.scene.start("bootGame");
    }
}