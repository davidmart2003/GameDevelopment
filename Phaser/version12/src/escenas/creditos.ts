import Constantes from "../constantes";

export default class Creditos extends Phaser.Scene {  
    private imagenFondo: Phaser.GameObjects.TileSprite;
    private width: number;
    private height: number;    

    constructor () {
        super(Constantes.ESCENAS.CREDITOS);        
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create (): void {        

        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);

        const volverTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(this.width - 100, 40 , Constantes.FUENTES.BITMAP, Constantes.CREDITOS.VOLVER, 16).setInteractive();

        volverTxt.on('pointerdown', () => {                      
            this.scene.start(Constantes.ESCENAS.MENU);            
        });

        const realizadoTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, 250 , Constantes.FUENTES.BITMAP, Constantes.CREDITOS.CREADOPOR, 16).setInteractive();     

        const assetsTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(70, 350 , Constantes.FUENTES.BITMAP, Constantes.CREDITOS.ASSETS, 16).setInteractive();
        

 
    }

    update(): void{
        //movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

    }

}