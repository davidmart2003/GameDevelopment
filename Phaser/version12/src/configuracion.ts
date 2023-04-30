import Nivel1 from './escenas/nivel1';
import Nivel2 from './escenas/nivel2';
import Nivel3 from './escenas/nivel3';
import Carga from './escenas/carga';
import Menu from './escenas/menu';
import HUD from './escenas/hud';
import Ajustes from './escenas/ajustes';
import Creditos from './escenas/creditos';
import SeleccionNivel from './escenas/seleccionnivel';
import FinNivel from './escenas/finnivel';


const Configuracion = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 854,
        height: 480
    }, 
    scene: [Carga, Menu, Nivel1, Nivel2, Nivel3, HUD, Ajustes, Creditos, SeleccionNivel, FinNivel],
    pixelArt: true,   
    audio:{
        disableWebAudio: true
    }, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    }
};

export default Configuracion;