class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {
        this.load.image("background", "resources/Menu inicio.png");
    }
    create() {
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        
        this.createKeyboardInput();
    }
    createKeyboardInput () {
        function handleKeyUp (e) {
            switch(e.code) {
                case 'Enter':
                    this.checkControls();
                    break;
                case 'Space':
                    this.goPlay();
                    break;
            }
        }
        this.input.keyboard.on('keyup', handleKeyUp, this);
    }
    goPlay () {
        this.scene.start("playGame");
    }
    checkControls () {
        this.scene.start("controlGame");
    }
}