class Enemy {
    constructor(scene, skin, x, y, scale){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.enemy = scene.physics.add.sprite(x, y, skin).setScale(scale);
        this.health = new HealthBar(scene, x-50, y - 110);
        this.skin = skin;
        this.dead = false;

        if(this.skin == 'angel'){
            this.enemy.body.allowGravity = false;
            this.enemy.body.setCollideWorldBounds(true);
            this.holy = scene.physics.add.sprite(this.enemy.x-150, this.enemy.y, 'light').setScale(0.05);
            this.launch = false;
            this.holy.body.allowGravity = false;
            this.holy.visible = false;

        }else if(this.skin == 'knight'){
            this.enemy.body.setCollideWorldBounds(true);
            this.enemy.flipX = true;
            this.health.y = this.enemy.y - 70;
            this.health.draw();
            scene.physics.add.collider(this.enemy, scene.ground);
    
        }else if (this.skin == 'hero'){
            this.enemy.body.setCollideWorldBounds(true);
            scene.physics.add.collider(this.enemy, scene.ground);
            this.holy = scene.physics.add.sprite(this.enemy.x-150, this.enemy.y, 'light').setScale(0.05);
            this.holy.body.allowGravity = false;
            this.holy.visible = false;
            this.launch = false;
        }

    }
    fire(){
        this.launch = true;
        this.holy.x = this.enemy.x-150;
        this.holy.y = this.enemy.y;
        this.holy.visible = true;
        this.holy.body.setVelocityX(-300);
    }
    move(){
        if(this.skin == 'angel'){
            if(this.enemy.y >= 650){
                this.enemy.body.setVelocityY(-this.scene.VELOCITY/1.5);
            }else if (this.enemy.y <= 470){
                this.enemy.body.setVelocityY(this.scene.VELOCITY/1.5);
            }
            this.health.y = this.enemy.y - 110;
            this.health.draw();

        }else if(this.skin == 'knight'){
            this.enemy.body.setVelocityX(-this.scene.VELOCITY);
            this.health.x = this.enemy.x - 50;
            this.health.draw();
        }else if(this.skin == 'hero'){
            this.enemy.body.setVelocityX(-this.scene.VELOCITY);
            this.health.x = this.enemy.x - 50;
            this.health.draw();
        }
    }
    checkDead(){
        if(this.health.value <= 0){
            this.dead = true;
            enemyCount +=1;
            return true;
        }
        return false;
    }
    reset(){
        this.enemy.x = this.x;
        this.enemy.y = this.y; 
        this.health.value = 100;
        this.dead = false;
    }
}