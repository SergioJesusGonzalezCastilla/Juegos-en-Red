
export class Minicio extends Phaser.Scene{

    constructor(){
        super({key:'menu-inicio'});
    }

    preload(){

        this.load.image('Desierto', 'resources/FondoDesierto.png')   
        this.load.audio('sonidoinico','sounds/BackgroundFightSound.mp3')

    }

    create(){

        this.add.image(1280/2, 720/2, 'Desierto');   

        var cursors = this.input.keyboard.createCursorKeys();
        const keyCodes= Phaser.Input.Keyboard.KeyCodes;
        this.teclaZ= this.input.keyboard.addKey(keyCodes.Z);

        //var s = this.sound.add('sonidoinicio');
        //s.play();
    }

    update(){
        
        if (this.teclaZ.isDown)
        {
         this.scene.start('creditos');
     
        }
    }
    
}