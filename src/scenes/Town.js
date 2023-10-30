class Battle extends Phaser.Scene{
    constructor(){
        super("battleScene");
    }
    create(){
        this.width = 960;
        this.height = 960;
        this.VELOCITY = 300;
        this.cameras.main.setBackgroundColor('#4E0707');
        this.cameras.main.setBounds(0, 0, 0, this.height);
        this.cameras.main.setZoom(1);
        this.cameras.main.setScroll(0, this.height);

        this.add.image(0, 0, 'background').setOrigin(0);

        //add ground
        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(480, this.height-120, 'ground').setScale(1);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);

        //cursor
        cursors = this.input.keyboard.createCursorKeys();
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        // keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //create animation
        // this.createAnimation();

        this.player = this.physics.add.sprite(0, this.height-320, 'player').setScale(0.3);
        this.physics.world.setBounds( 0, 0, 960, 960);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;   
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.ground);
        this.vignette = this.add.image(480, 480, 'vignette');
        this.vignette.visible = false;
        this.hp = new playerHealthBar(this, 0, 0);
        this.fire = this.physics.add.sprite(this.player.x+50, this.player.y, 'fireball').setScale(0.05);
        this.fire.body.allowGravity = false;
        this.fire.visible = false;

        this.angel = new Enemy(this, 'angel', 900, 470, 0.2);
        this.knight = new Enemy(this, 'knight', 900, this.height-350, 0.3);

        this.time = 0;

        this.fruit = this.physics.add.sprite(500, 300, 'fruit').setScale(0.05);
        this.fruit.body.allowGravity = false;
        // this.fruit.visible = false;
        
    }

    update(){
        if(enemyCount >= 100){
            this.scene.start('endScene');
        }
        if(berserkCount >= 10){
            this.scene.start('berserkScene');
        }
        this.angel.move();
        this.angelAttack(this.angel, this.player);

        this.knight.move();
        this.knightAttack(this.knight, this.player);
        
        if(cursors.left.isDown) {
            random = Math.floor(Math.random() * 10) + 1;
            if(random > berserkCount){
                this.player.body.setVelocityX(-this.VELOCITY);
            }else{
                this.player.body.setVelocityX(this.VELOCITY);
            }
            

        } else if(cursors.right.isDown) {
            random = Math.floor(Math.random() * 10) + 1;
            if(random > berserkCount){
                this.player.body.setVelocityX(this.VELOCITY);
            }else{
                this.player.body.setVelocityX(-this.VELOCITY);
            }

        }else if(cursors.up.isDown){
            if(this.player.y > 470){
                this.player.body.setVelocityY(-this.VELOCITY/1.5);
            }    
        }
        else if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown) {
            this.player.body.setVelocityX(0);
   
        }
        if(this.hp.value <= 1){
            this.vignette.visible = true;
            this.time +=100;
            console.log(this.time, berserkCount)
            if(this.time %100000 == 0){
                berserkCount += 1;
            }
            this.fruit.y = this.height/2;
            this.fruit.visible = true;
        }
        if(this.hp.value > 1){
            this.vignette.visible = false;
            this.fruit.visible = false;
            this.fruit.y = 0;
        }

        if(Phaser.Input.Keyboard.JustDown(keyE)){
            //cast skills
            this.fire.x = this.player.x+150;
            this.fire.y = this.player.y;
            this.fire.visible = true;
            this.fire.body.setVelocityX(300);
        }
            
        if(this.checkOverlap(this.fruit, this.player)){
            this.hp.decrease(-150);
        }
    }

    checkOverlap(A,  B){
        var boundA = A.getBounds();
        var boundB = B.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundA, boundB);
    }
    angelAttack(x, y){
        if(x.launch == false){
            x.fire();
        }
        if(x.holy.x < 0 || this.checkOverlap(x.holy, y)){
            x.launch = false; 
        }

        if(this.checkOverlap(x.holy, y)){
            this.hp.decrease(10);
        }
        if(this.checkOverlap(this.fire, x.enemy)){
            x.health.decrease(10);
        }
        if(x.checkDead()){
            x.reset();
            console.log(enemyCount);
        }
        if(this.fire.x > 960 || this.checkOverlap(this.fire, x.enemy)){
            this.fire.x = y.x+50;
            this.fire.visible = false;
        }
    }
    knightAttack(x, y){
        if(this.checkOverlap(x.enemy, y)){
            x.health.decrease(10);
            this.hp.decrease(10);
        }
        if(this.checkOverlap(this.fire, x.enemy)){
            x.health.decrease(10);
        }
        if(x.checkDead()){
            x.reset();
            console.log(enemyCount);
        }
        if(this.fire.x > 960 || this.checkOverlap(this.fire, x.enemy)){
            this.fire.x = y.x+50;
            this.fire.visible = false;
        }
    }
}
