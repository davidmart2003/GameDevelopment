import ManejadorNivel from '../escenas/manejadornivel';

export default class Recolectables extends Phaser.Physics.Arcade.Group {
    private escena: ManejadorNivel ;
    
    constructor(escena: ManejadorNivel, nombreObjeto: string, idObjeto: string, animObjeto: string) {
        super(escena.physics.world, escena);        

        this.escena = escena;        
                
        // añade los objetos de los recolectables desde el array de sprites obtenidos del mapa al grupo        
        this.addMultiple(this.escena.mapaNivel.createFromObjects(nombreObjeto, {name: idObjeto, key:idObjeto}));
        
        //añade física a todos los objetos del grupo
        this.escena.physics.world.enable(this.children.entries);
        
        //Crea animaciones Enemigos
        this.escena.anims.create({
            key: animObjeto,
            frames: idObjeto,
            frameRate: 20,
            repeat: -1
        });

        this.children.entries.map((recolectable: any) => {            
            recolectable.body.setAllowGravity(false);
            recolectable.body.setImmovable(true); 
            recolectable.play(animObjeto);            
        });

        this.escena.numObjetosRecolectar += this.children.entries.length;
    }

}
