/*
Collaborator: Patrick Queiroz, Emery Plyler, Ruby Tseng
Game title: Dahlia Town
*/
'use strict';
let config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    backgroundColor: '0x000000',
    scene: [Load, Town, EndScene, BerserkScene, Credit]
};

let game = new Phaser.Game(config);
let cursors;
let keyE;
let keyR;
let keyC;
let enemyCount = 0;
let berserkCount = 0;
let random = -1;
// let keyW, keyA, keyS, keyD;
