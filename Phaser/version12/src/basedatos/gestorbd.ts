import Constantes from "../constantes";

export default class GestorBD {
    public datos: any ;

    constructor(){
        if (JSON.parse(localStorage.getItem(Constantes.BASEDATOS.NOMBRE))){
            this.datos = JSON.parse(localStorage.getItem(Constantes.BASEDATOS.NOMBRE));
        }else{
            this.creaBD();
        }
           
    }    
    creaBD() {
        let bdinicial = {
            musica: true,
            efectos: true,
            puntuaciones: {
                nivel1: 0,
                nivel2: 0,
                nivel3: 0
            }
        }
        this.datos = bdinicial;
        localStorage.setItem(Constantes.BASEDATOS.NOMBRE, JSON.stringify(this.datos));        
       
    }

    public grabarBD(){
        localStorage.setItem(Constantes.BASEDATOS.NOMBRE, JSON.stringify(this.datos));
    }


}