class Load extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){
        // set load path
        this.load.path = 'assets/'

        // load background
        this.load.image('background', 'background.png');

        //load floor
        this.load.image('ground', 'ground.png');

        //load other
        this.load.image('vignette', 'vignette.png');
        this.load.image('fireball', 'fireball.png');
        this.load.image('light', 'lightspell.png');
        this.load.image('fruit', 'demonfruit.png');
        
        // load character
        this.load.image('player', 'MC.png');
        this.load.image('angel', 'angel.png');
        this.load.image('knight', 'knight.png');
    }

    create() {
        // after load complete -> move to menu scene
        this.scene.start('battleScene');
    }
}