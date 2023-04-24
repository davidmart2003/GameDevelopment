import Constantes from '../constantes';

export default class HUD extends Phaser.Scene {
    private vidasTxt : Phaser.GameObjects.Text;
    private puntuacionTxt : Phaser.GameObjects.Text;

    private width: number;
    private height: number;

    constructor(){
        super('HUD');
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void{
        const nivel1: Phaser.Scene = this.scene.get('Nivel1');
        nivel1.events.on(Constantes.EVENTOS.VIDAS, this.actualizaVidas, this);
        nivel1.events.on(Constantes.EVENTOS.PUNTUACION, this.actualizaPuntuacion, this);



        this.vidasTxt = this.add.text(20,20, Constantes.HUD.VIDAS + this.registry.get(Constantes.REGISTRO.VIDAS), {fontSize:'32px', color:'#FFFFFF'});
        
        this.puntuacionTxt = this.add.text(this.width - 50 ,20, '000', { fontSize: '20px', color: '#FFFFFF' })


    }

    private actualizaVidas(): void{
        this.vidasTxt.text = "Vidas:" + this.registry.get('vidas');
    }

    private actualizaPuntuacion(): void {
        this.puntuacionTxt.text = Phaser.Utils.String.Pad(this.registry.get("puntuacion"), 3, '0', 1);
    }



}