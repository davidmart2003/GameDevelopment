import Constantes from "../constantes";
import GestorBD from "../basedatos/gestorbd";

export default class Ajustes extends Phaser.Scene {  
    private imagenFondo: Phaser.GameObjects.TileSprite;
    private width: number;
    private height: number;    

    constructor () {
        super(Constantes.ESCENAS.AJUSTES);        
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create (): void {  
        let mibd: GestorBD = new GestorBD();      

        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);

        const volverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(80, this.height -100 , Constantes.FUENTES.BITMAP, Constantes.AJUSTES.VOLVER, 16).setInteractive();

        volverTxt.on('pointerdown', () => {                      
            this.scene.start(Constantes.ESCENAS.MENU);            
        });

        //Sonidos y Efectos
        const musicatxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, 80 , Constantes.FUENTES.BITMAP, Constantes.AJUSTES.MUSICA, 16).setInteractive();
        const efectostxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(200, 80 , Constantes.FUENTES.BITMAP, Constantes.AJUSTES.EFECTOS, 16).setInteractive();
        

        let musicaOnOff: Phaser.GameObjects.Image = this.add.image(130, 250, this.getImagenSonido(mibd.datos.musica)).setScale(0.5).setInteractive();

        let efectosOnOff: Phaser.GameObjects.Image = this.add.image(300, 250, this.getImagenSonido(mibd.datos.efectos)).setScale(0.5).setInteractive();


        musicaOnOff.on('pointerdown', () => { 
            mibd.datos.musica = !mibd.datos.musica;
            mibd.grabarBD(); 
            musicaOnOff.setTexture(this.getImagenSonido(mibd.datos.musica));
        });

        efectosOnOff.on('pointerdown', () => { 
            mibd.datos.efectos = !mibd.datos.efectos;
            mibd.grabarBD();                        
            efectosOnOff.setTexture(this.getImagenSonido(mibd.datos.efectos));
        });        



    }

    update(): void{
        //movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

    }

    getImagenSonido(encendido: boolean): string{
        return (encendido)?Constantes.AJUSTES.SONIDOON : Constantes.AJUSTES.SONIDOOFF;
    }

}