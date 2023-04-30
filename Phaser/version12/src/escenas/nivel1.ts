import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';

export default class Nivel1 extends ManejadorNivel
{
    constructor () {
        super(Constantes.ESCENAS.NIVEL1);              
    }

    create (): void {               
        this.creaEscenarioNivel(Constantes.MAPAS.NIVEL1.TILEMAPJSON, Constantes.FONDOS.NIVEL1, Constantes.PLATAFORMAMOVIL.NIVEL1.ID, Constantes.PLATAFORMAMOVIL.NIVEL1.VELOCIDAD);

        this.creaEnemigos([Constantes.ENEMIGOS.BUNNY, Constantes.ENEMIGOS.CHICKEN]);

        this.creaRecolectables([Constantes.RECOLECTABLES.PLATANO, Constantes.RECOLECTABLES.PINA, Constantes.RECOLECTABLES.CEREZA]);

    }


}