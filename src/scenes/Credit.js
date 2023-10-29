class Credit extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
        let creditConfig = {
            fontFamily: 'Georgia',
            fontSize: '36px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixWidth: 0
        }
        let creditConfig2 = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 -100, 'Credit', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -50, 'Design: Ruby Tseng', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 -10, 'Code: Ruby Tseng', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +30, 'Art: Ruby Tseng', creditConfig2).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +120, 'Press R to play again', creditConfig).setOrigin(0.5);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("townScene");
        }
    }
}