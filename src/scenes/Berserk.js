class BerserkScene extends Phaser.Scene{
    constructor(){
        super("berserkScene");
    }

    create(){
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfig2 = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2, 'You lost control over your mental', menuConfig).setOrigin(0.5);
        this.time.delayedCall(6000, ()=>{
            this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press R to play again', menuConfig2).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 130, 'Press C for credit', menuConfig2).setOrigin(0.5);
        });

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.reset();
            this.scene.start("townScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.reset();
            this.scene.start("creditScene");
        }
    }

    reset(){
        enemyCount = 0;
        berserkCount = 0;
    }
}