/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {


        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/Pachimari.png', 140, 140);


    },


    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);


        game.add.sprite(0, 0, 'star');
        game.add.sprite(0, 0, 'sky');


        this.platforms = game.add.group();
        this.platforms.enableBody = true;


        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;


        var ledge = this.platforms.create(500, 450, 'ground');
        ledge.body.immovable = true;

        var ledge = this.platforms.create(-250, 450, 'ground');
        ledge.body.immovable = true;
        
        var ledge = this.platforms.create(130, 350, 'ground');
        ledge.body.immovable = true;
        
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');

        game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [12, 13, 14, 15, 16, 17], 5, true);
        this.player.animations.add('right', [5, 6, 7, 8, 9, 10], 5, true);
        this.player.animations.add('still', [0, 1, 2, 3], 5, true);
        this.player.scale.setTo(0.4, 0.4)
        this.player.body.setSize(75, 72, 14, 15)
        


        this.cursors = game.input.keyboard.createCursorKeys();



        this.stars = game.add.group();
        this.stars.enableBody = true;

        for (var i = 0; i < 60; i++) {
            var star = this.stars.create(i * 70, 0, 'star');

            star.body.gravity.y = 300;

            star.body.bounce.y = 0.8 + Math.random() * 0.1;


        }


this.scoreText = game.add.text(16, 16, 'score: 0', {
    fontSize: '32pix',
    fill: '#000'
});

this.score = 0



    },


    update: function() {


        game.physics.arcade.collide(this.player, this.platforms);


        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150

            this.player.animations.play('left')
        }

        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;

            this.player.animations.play('right')
        }

        else {
            this.player.animations.play('still');

           
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350
        }



        game.physics.arcade.collide(this.stars, this.platforms);


        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
        
        
      



    },

 collectStar: function(player, star) {
        star.kill();
        this.score = this.score + 5;
        this.scoreText.text = this.score;
}

}

game.state.start('main');
