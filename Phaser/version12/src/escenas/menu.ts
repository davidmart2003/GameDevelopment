import Constantes from '../constantes';

export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;
    

    constructor(){
        super(Constantes.ESCENAS.MENU);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(){
        const logo = this.add.image(this.width /2, 70, 'logo1');

        const jugarTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(50, this.height/2, Constantes.FUENTES.BITMAP, Constantes.MENU.JUGAR, 25)
        .setInteractive();

        this.cambiarEscena(jugarTxt, Constantes.ESCENAS.NIVEL1);

    }
    
    /**
     * Cuando se pulse sobre el texto nos va a lleva a la escena indicada
     * @param jugarTxt 
     * @param escena 
     */
    cambiarEscena(jugarTxt: Phaser.GameObjects.BitmapText, escena: string) {
        jugarTxt.on('pointerdown', ()=>{
            this.scene.start(escena);
            this.scene.start(Constantes.ESCENAS.HUD);
            this.scene.bringToTop(Constantes.ESCENAS.HUD);
        });
    }

    

}
