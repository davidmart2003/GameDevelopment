import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';

export default class Nivel2 extends ManejadorNivel
{
    constructor () {
        super(Constantes.ESCENAS.NIVEL2);              
    }

    create (): void {               
        this.creaEscenarioNivel(Constantes.MAPAS.NIVEL2.TILEMAPJSON, Constantes.FONDOS.NIVEL2,Constantes.PLATAFORMAMOVIL.NIVEL2.ID, Constantes.PLATAFORMAMOVIL.NIVEL2.VELOCIDAD);

        this.creaEnemigos([Constantes.ENEMIGOS.RADISH, Constantes.ENEMIGOS.MUSHROOM]);

        this.creaRecolectables([Constantes.RECOLECTABLES.PLATANO, Constantes.RECOLECTABLES.PINA, Constantes.RECOLECTABLES.CEREZA]);

    }


}