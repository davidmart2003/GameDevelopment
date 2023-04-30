import Constantes from '../constantes';
import ManejadorNivel from '../escenas/manejadornivel';

export default class PlataformasMoviles extends Phaser.Physics.Arcade.Group {

    private escena: ManejadorNivel ;
    private velocidad: number;

    private horizontal: boolean; 

    constructor(escena: ManejadorNivel, nombreObjeto: string, idObjeto: string, velocidad: number, horizontal: boolean) {
        super(escena.physics.world, escena);

        this.escena = escena;
        this.velocidad = velocidad; 

        this.horizontal = horizontal;

        let nombreObjetoPlataforma: string = (this.horizontal)? Constantes.MAPAS.PLATAFORMAHORIZONTAL : Constantes.MAPAS.PLATAFORMAVERTICAL;

        // añade los objetos de los enemigos desde el array de sprites obtenidos del mapa al grupo        
        this.addMultiple(this.escena.mapaNivel.createFromObjects(nombreObjeto, {name: nombreObjetoPlataforma, key:idObjeto}));

        this.children.entries.map((plataforma: any) => {            
            plataforma.setTexture(idObjeto);
            plataforma.body.setCollideWorldBounds(true);  
            plataforma.body.setAllowGravity(false);            
            plataforma.body.setImmovable(true);            
            if (this.horizontal){
                plataforma.body.setFrictionX(1);
                plataforma.body.setVelocityX(this.velocidad);                         
                this.muevePlataformaHorizontal((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), plataforma);
            }else{
                plataforma.body.setFrictionY(1);
                plataforma.body.setVelocityY(this.velocidad);                         
                this.muevePlataformaVertical((Phaser.Math.Between(0, 1) ? 'arriba' : 'abajo'), plataforma);                
            }
            
            
        })        

    }

    muevePlataformaHorizontal(direccion: string, enemigo: any): void {        
        (direccion === 'izda')? enemigo.body.setVelocityX(this.velocidad*-1):enemigo.body.setVelocityX(this.velocidad);                    
    }

    muevePlataformaVertical(direccion: string, enemigo: any): void{        
        (direccion === 'arriba')? enemigo.body.setVelocityY(this.velocidad*-1):enemigo.body.setVelocityY(this.velocidad);            
    }

    public update(): void{
        this.children.entries.map((enemigo: any) => {
            if (this.horizontal){
                if(enemigo.body.velocity.x === 0) {
                    this.muevePlataformaHorizontal((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
                }
                if (enemigo.body.blocked.right) {
                    this.muevePlataformaHorizontal('izda', enemigo);                              
                } else if (enemigo.body.blocked.left) {
                    this.muevePlataformaHorizontal('dcha', enemigo);                
                }
            }else{
                if(enemigo.body.velocity.y === 0) {
                    this.muevePlataformaVertical((Phaser.Math.Between(0, 1) ? 'arriba' : 'abajo'), enemigo);
                }
                if (enemigo.body.blocked.top) {
                    this.muevePlataformaVertical('arriba', enemigo);                              
                } else if (enemigo.body.blocked.bottom) {
                    this.muevePlataformaVertical('abajo', enemigo);                
                }
            }
        });
        




    }

}
