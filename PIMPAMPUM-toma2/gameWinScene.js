var texto;
var gameWin1 = true;
var gameWin2 = true;


export class Win extends Phaser.Scene{

    constructor(){
        super({key:'win'});
    }

    preload(){

        this.load.image('GameWin', 'resources/FondoWin.png');    

    }

    create(){

        this.add.image(1280/2, 720/2, 'GameWin');   

        if (gameWin1 = true){
        texto1 = this.add.text(460, 720/2, 'WINNER JUGADOR 1',{
            fontSize: '200px',
            fill: '#fff'
        }).setScale(1/5.8);
        }

        if (gameWin2 = true){
            texto2 = this.add.text(460, 720/2, 'WINNER JUGADOR 2', {
                fontSize: '200px',
                fill: '#fff'
            }).setScale(1/5.8);
            }

            var cursors = this.input.keyboard.createCursorKeys();
            const keyCodes= Phaser.Input.Keyboard.KeyCodes;
            this.teclaZ= this.input.keyboard.addKey(keyCodes.Z);
    

    }

    update(){
        
    }
 }
