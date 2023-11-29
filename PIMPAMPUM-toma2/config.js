import{Game}from './game.js';
import{GameOver}from './gameOverScene.js';
import{Win}from './gameWinScene.js';

 
const WIDTH = 1280;
const HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    width:WIDTH,
    height:HEIGHT,
    
    scene:[Game, GameOver, Win],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }

}

var game = new Phaser.Game(config);