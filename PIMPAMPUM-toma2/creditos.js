
export class Creditos extends Phaser.Scene{

    constructor(){
        super({key:'creditos'});
    }

    preload(){

        this.load.image('Creditos', 'resources/Creditos.png');    

    }

    create(){

        this.add.image(1280/2, 720/2, 'Creditos');
           
        var cursors = this.input.keyboard.createCursorKeys();
        const keyCodes= Phaser.Input.Keyboard.KeyCodes;
        this.teclaZ= this.input.keyboard.addKey(keyCodes.Z);

    }

    update(){

        if (this.teclaZ.isDown)
        {
         this.scene.start('game');
     
        }
    }

}