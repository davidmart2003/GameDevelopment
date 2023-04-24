import 'phaser';
import Configuracion from './configuracion';

export class Juego extends Phaser.Game{
    constructor(configuracion: Phaser.Types.Core.GameConfig){
        super(configuracion);
    }
}

window.addEventListener('load', ()=>{
    const juego = new Juego(Configuracion);
});
