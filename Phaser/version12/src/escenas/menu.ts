import Constantes from '../constantes';

export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;

    private imagenFondo: Phaser.GameObjects.TileSprite;

    
    constructor(){
        super(Constantes.ESCENAS.MENU);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.sound.stopAll(); 
    }

    
    create(){

        this.imagenFondo = this.add.tileSprite(0,0, this.cameras.main.width, this.cameras.main.height,Constantes.FONDOS.MENU).setOrigin(0,0).setDepth(-1);


        const logo = this.add.image(this.width /2, this.height/2,Constantes.JUGADOR.ID, Constantes.JUGADOR.ANIMACION.SALTO).setScale(10);

        const tituloTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(250, 50 , Constantes.FUENTES.BITMAP, Constantes.MENU.TITULO, 20);             

        const jugarTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(50, this.height - 80, Constantes.FUENTES.BITMAP, Constantes.MENU.JUGAR, 20)
        .setInteractive();
        this.cambiarEscena(jugarTxt, Constantes.ESCENAS.SELECCIONNIVEL);


        const ajustesTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(300, this.height - 80 , Constantes.FUENTES.BITMAP, Constantes.MENU.AJUSTES, 20).setInteractive();
        this.cambiarEscena(ajustesTxt, Constantes.ESCENAS.AJUSTES, false);

        const creditosTxt: Phaser.GameObjects.BitmapText  = this.add.bitmapText(this.width -200, this.height - 80 , Constantes.FUENTES.BITMAP, Constantes.MENU.CREDITOS, 20).setInteractive();
        this.cambiarEscena(creditosTxt, Constantes.ESCENAS.CREDITOS, false);


    }
    
    /**
     * Cuando se pulse sobre el texto nos va a lleva a la escena indicada
     * @param jugarTxt 
     * @param escena 
     */
    cambiarEscena(texto: Phaser.GameObjects.BitmapText, escena: string, hud: boolean = true) {
        texto.on('pointerdown', () => { 
            this.scene.start(escena);
        });
    }


    update(): void{
         //movimiento scroll del fondo 
         this.imagenFondo.tilePositionY -= 0.4 ;
    }
    

}
