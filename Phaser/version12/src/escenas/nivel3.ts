import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';

export default class Nivel3 extends ManejadorNivel
{
    constructor () {
        super(Constantes.ESCENAS.NIVEL3);              
    }

    create (): void {               
        this.creaEscenarioNivel(Constantes.MAPAS.NIVEL3.TILEMAPJSON, Constantes.FONDOS.NIVEL3,Constantes.PLATAFORMAMOVIL.NIVEL3.ID, Constantes.PLATAFORMAMOVIL.NIVEL3.VELOCIDAD);

        this.creaEnemigos([Constantes.ENEMIGOS.BUNNY, Constantes.ENEMIGOS.MUSHROOM]);

        this.creaRecolectables([Constantes.RECOLECTABLES.CEREZA]);

    }


}