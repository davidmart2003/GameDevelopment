import Constantes from '../constantes';

export default class Nivel1 extends Phaser.Scene
{
    private width: number;
    private height: number;

    private vidas: number;
    private puntuacion: number;

    private mapaNivel : Phaser.Tilemaps.Tilemap;
    private conjuntoPatrones: Phaser.Tilemaps.Tileset;
    private capaMapaNivel: Phaser.Tilemaps.TilemapLayer;  

    private imagenFondo: Phaser.GameObjects.TileSprite;

    private jugador: Phaser.Physics.Arcade.Sprite;

    //Control de entrada
    private cursores: Phaser.Types.Input.Keyboard.CursorKeys;
    private teclasWASD: any;
    private teclaEspacio: Phaser.Input.Keyboard.Key;



    constructor ()
    {
        super(Constantes.ESCENAS.NIVEL1);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.vidas = 3;
        this.puntuacion = 0;
        //Con el sistema de registro global de variables
        //inicializamos las del juego                
        this.registry.set(Constantes.REGISTRO.VIDAS, this.vidas);        
        this.registry.set(Constantes.REGISTRO.PUNTUACION, this.puntuacion);        

    }


    preload ()
    {
        
    }

    create ()
    {        
        const logo = this.add.image(400, 70, 'logo1');
        
        const jugarTxt: Phaser.GameObjects.Text = this.add.text(50, this.height/2, 'NIVEL 1', {fontSize:'32px', color:'#FFFFFF'});
        
        const vidasTxt: Phaser.GameObjects.Text = this.add.text(this.width/2, this.height/2, 'VIDAS -', {fontSize:'32px', color:'#FFFFFF'}).setInteractive();

        vidasTxt.on('pointerdown', ()=>{
            this.vidas --;
            this.registry.set(Constantes.REGISTRO.VIDAS, this.vidas);
            this.events.emit(Constantes.EVENTOS.VIDAS);
        });

        const puntuacionTxt: Phaser.GameObjects.Text  = this.add.text(this.width/2  , this.height/2 + 100 , 'Puntuacion',  { fontSize: '32px', color: '#FFFFFF' })
                                                .setInteractive();         
                                                        
        puntuacionTxt.on('pointerdown', () => {                                                                    
            this.puntuacion++;
            this.registry.set(Constantes.REGISTRO.PUNTUACION, this.puntuacion);
            this.events.emit(Constantes.EVENTOS.PUNTUACION);
        });


        /*Cargar Tilemap*/
        this.mapaNivel = this.make.tilemap({ key: Constantes.MAPAS.NIVEL1.TILEMAPJSON , tileWidth: 16, tileHeight: 16 });
        
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(Constantes.MAPAS.TILESET);
        
        this.capaMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.NIVEL1.CAPAPLATAFORMAS, this.conjuntoPatrones);
        this.capaMapaNivel.setCollisionByExclusion([-1]);
        
        //Fondo
        this.imagenFondo = this.add.tileSprite(0,0,this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels, Constantes.FONDOS.NIVEL1).setOrigin(0,0).setDepth(-1);

        //Animaciones
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERA,
            frames:this.anims.generateFrameNames (Constantes.JUGADOR.ID,{prefix: Constantes.JUGADOR.ANIMACION.ESPERA + '-',
            end:11}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.CORRER, 
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID,{
                prefix:Constantes.JUGADOR.ANIMACION.CORRER + '-',
                end:11 
            }), 
            frameRate:20, 
            repeat: -1
        });

        //Crear Jugador
        this.jugador = this.physics.add.sprite(80,80, Constantes.JUGADOR.ID).play(Constantes.JUGADOR.ANIMACION.ESPERA,true);

        this.jugador.body.setSize(20,30);

        this.physics.add.collider(this.jugador, this.capaMapaNivel); 

        //Control entrada
        this.cursores = this.input.keyboard.createCursorKeys();
        this.teclasWASD = this.input.keyboard.addKeys('W,A,S,D');
        this.teclaEspacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }

    update(): void{
        //mover el fondo
        this.imagenFondo.tilePositionY -= 0.4;

        if (parseInt(this.registry.get(Constantes.REGISTRO.VIDAS)) === 0){
            this.scene.stop(Constantes.ESCENAS.NIVEL1);
            this.scene.stop(Constantes.ESCENAS.HUD);
            this.scene.start(Constantes.ESCENAS.MENU);
        }

        //Control de Movimiento
        if (this.teclasWASD.A.isDown || this.cursores.left.isDown){
            this.jugador.setVelocityX(-200);
            if(this.jugador.body.blocked.down) this.jugador.anims.play(Constantes.JUGADOR.ANIMACION.CORRER, true);
            this.jugador.flipX = true; 
        }else if (this.teclasWASD.D.isDown || this.cursores.right.isDown){
            this.jugador.setVelocityX(200);
            if(this.jugador.body.blocked.down) this.jugador.anims.play(Constantes.JUGADOR.ANIMACION.CORRER, true);
            this.jugador.flipX = false; 

        }else {
            this.jugador.setVelocityX(0);
            this.jugador.anims.play(Constantes.JUGADOR.ANIMACION.ESPERA,true);
        }

        if ((this.teclaEspacio.isDown || this.teclasWASD.W.isDown || this.cursores.up.isDown) && this.jugador.body.blocked.down){
            this.jugador.setVelocityY(-300);
            this.jugador.anims.stop();
            this.jugador.setTexture(Constantes.JUGADOR.ID, Constantes.JUGADOR.ANIMACION.SALTO);
        }

    }
}
