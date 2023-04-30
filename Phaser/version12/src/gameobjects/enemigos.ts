import ManejadorNivel from '../escenas/manejadornivel';

export default class Enemigos extends Phaser.Physics.Arcade.Group {
    private escena: ManejadorNivel;
    private velocidad: number;


    constructor(escena: ManejadorNivel, nombreObjeto: string, idObjeto: string, animObjeto: string, velocidad: number) {
        super(escena.physics.world, escena);        

        this.escena = escena;
        this.velocidad=velocidad;
                
        // añade los objetos de los enemigos desde el array de sprites obtenidos del mapa al grupo        
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

        this.children.entries.map((enemigo: any) => {
            enemigo.body.setCollideWorldBounds(true);              
            enemigo.play(animObjeto);
            this.mueveEnemigo((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
        });

        
        
    }

    mueveEnemigo(direccion: string, enemigo: any) {        
        if (direccion === 'izda') {
            enemigo.body.setVelocityX(this.velocidad*-1);
            enemigo.flipX=false; 
        } else if (direccion === 'dcha') {
            enemigo.body.setVelocityX(this.velocidad);
            enemigo.flipX=true;
        }
    }


    public update(): void {
        this.children.entries.map((enemigo: any) => {
            if(enemigo.body.velocity.x === 0) {
                this.mueveEnemigo((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
            }
            if (enemigo.body.blocked.right) {
                this.mueveEnemigo('izda', enemigo);                              
            } else if (enemigo.body.blocked.left) {
                this.mueveEnemigo('dcha', enemigo);                
            }
        });
        
    }

}
