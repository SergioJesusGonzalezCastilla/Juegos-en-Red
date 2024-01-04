import{Game}from './game.js';
import{gamePiratas}from './gamePiratas.js'
import{gameWinJ1}from './gameWinJ1.js';
import{gameWinJ2}from './gameWinJ2.js';
import{gameWinJ1Piratas}from './gameWinJ1Piratas.js';
import{gameWinJ2Piratas}from './gameWinJ2Piratas.js';
import{Creditos}from './creditos.js';
import {Ajustes} from './ajustes.js';
import{Minicio}from './menuInicio.js';
import{Simulador}from './simulador.js';
import{Seleccion}from './seleccion.js';
import{Pausa}from './pause.js';
import{PausaPirata}from './pausePirata.js';

import{Mapas}from './mapa.js';
import {ModoCliente }from './modoCliente.js';
import {Registro }from './registroUsuario.js';
import {Opciones }from './opciones_online.js';
import {Modificar }from './modificar.js';
import {Game_Online }from './game_online.js';
import {Meme }from './meme.js';
 
const WIDTH = 1280;
const HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    width:WIDTH,
    height:HEIGHT,
    
    scene:[Minicio,Meme,Modificar,ModoCliente,Registro,Ajustes,Opciones,Mapas,Seleccion,Simulador,Creditos,Game,gamePiratas,Game_Online,Pausa,PausaPirata,gameWinJ1,gameWinJ2,gameWinJ1Piratas,gameWinJ2Piratas],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }

}

var game = new Phaser.Game(config);
