import{Game}from './game.js';
import{gameWinJ1}from './gameWinJ1.js';
import{gameWinJ2}from './gameWinJ2.js';
import{Creditos}from './creditos.js';
import {Ajustes} from './ajustes.js';
import{Minicio}from './menuInicio.js';
import{Simulador}from './simulador.js';
import{Seleccion}from './seleccion.js';
import{Pausa}from './pause.js';
import{Mapas}from './mapa.js';

 
const WIDTH = 1280;
const HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    width:WIDTH,
    height:HEIGHT,
    
    scene:[Minicio,Mapas,Seleccion,Simulador,Ajustes,Creditos,Game,Pausa,gameWinJ1,gameWinJ2],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }

}

var game = new Phaser.Game(config);
