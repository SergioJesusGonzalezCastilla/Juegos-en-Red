export class Lleno extends Phaser.Scene{

    constructor(){
        super({key:'lleno'});
    }

    preload(){

        //FONDO
        this.load.image('Lleno', 'resources/partidaFull.png')
  
    }

    create(){

        this.add.image(1280/2, 720/2, 'Lleno');  


    }
    

    

    update(){

    }
 }
    
