import{Game}from './game.js';
import{GameOver}from './gameOverScene.js';
import{Win}from './gameWinScene.js';
import{Creditos}from './creditos.js';
import{Minicio}from './menuInicio.js';
 
const WIDTH = 1280;
const HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    width:WIDTH,
    height:HEIGHT,
    
    scene:[Minicio,Creditos,Game,GameOver,Win],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }

}

var game = new Phaser.Game(config);
