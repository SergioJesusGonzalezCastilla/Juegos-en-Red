 
var texto1;
var texto2;

var gameOverP1 = true;
var gameOverP2 = true;



 export class GameOver extends Phaser.Scene{

    constructor(){
        super({key:'gameover'});
    }

    preload(){

        //FONDO
        this.load.image('GameOver', 'resources/GameOverFondo.png');    
    
    }

    create(){

        this.add.image(1280/2, 720/2, 'GameOver');   

        if (gameOverP1 = true){
        texto1 = this.add.text(460, 720/2, 'GAME OVER JUGADOR 1',{
            fontSize: '200px',
            fill: '#fff'
        }).setScale(1/5.8);
        }

        if (gameOverP2 = true){
            texto2 = this.add.text(460, 720/2, 'GAME OVER JUGADOR 2', {
                fontSize: '200px',
                fill: '#fff'
            }).setScale(1/5.8);
            }

        var cursors = this.input.keyboard.createCursorKeys();
        const keyCodes= Phaser.Input.Keyboard.KeyCodes;
        this.teclaZ= this.input.keyboard.addKey(keyCodes.Z);

    }

    update(){

        if (this.teclaZ.isDown)
   {
        this.scene.start('win');

   }
    }
 }
