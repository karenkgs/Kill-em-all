// New name for the state
var playState = {

	function preload() {

	    game.load.image('sky', 'assets/skyBG.png');
	    game.load.image('ground', 'assets/platformStone.png');
	    game.load.image('grassPlatform', 'assets/platform-grass.png');
	    game.load.image('icePlatform', 'assets/ice-platform.png');
	    game.load.image('star', 'assets/star.png');
	    game.load.spritesheet('dude', 'assets/player.png', 56, 64);
	    game.load.spritesheet('door', 'assets/portalDoor.png', 152, 140, 3);
		
		//The needed graphics for the bad guys and the lifebar
		game.load.spritesheet('badguy','assets/baddie.png', 32, 32);

		game.load.spritesheet('wolverine', 'assets/enemyOne.png', 64, 66);

		game.load.spritesheet('king', 'assets/king.png', 58, 67);

		//game.load.spritesheet('goblin', 'assets/goblinExu.png', 58, 66);

		game.load.image('life', 'assets/firstaid.png');
		
	},

	function create() {

	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //Background
	    game.add.sprite(0, 0, 'sky');


	    //Platforms

	    platforms = game.add.group();

	    platforms.enableBody = true;

	    //Ground

	    var ground = platforms.create(0, game.world.height - 64, 'ground');

	    ground.scale.setTo(1, 1);

	    ground.body.immovable = true;


	    //Ledges
	    var ledge = platforms.create(810, 390, 'icePlatform');
	    ledge.body.immovable = true;

	    
		ledge = platforms.create(600, 150, 'grassPlatform');
	    ledge.body.immovable = true;
		
		ledge = platforms.create(20, 400, 'grassPlatform');
	    ledge.body.immovable = true;

	    ledge = platforms.create(350, 290, 'icePlatform');
	    ledge.body.immovable = true;


	     
	     // Door

	    door = game.add.sprite(1020, 400, 'door');

	    door.animations.add('shine', [0, 1], 4, true);
	    door.animations.play('shine');

	    game.physics.arcade.enable(door);
	    door.body.collideWorldBounds = true;
	    door.body.immovable = true;




	    //Player
	    player = game.add.sprite(32, game.world.height - 150, 'dude');
		
	    game.physics.arcade.enable(player);
		
	    //  Player physics properties.
	    player.body.bounce.y = .2;
	    player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;

	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);
		player.animations.add('hit', [2, 4, 5], 20, true);

	 
		//Bad guys
		bad_guys = game.add.group();
		bad_guys.enableBody = true;
		game.physics.arcade.enable(bad_guys);


		var bad_guy= bad_guys.create(40, 200, 'wolverine');

		bad_guy.body.bounce.y =  0.7 + 0.2;
		bad_guy.body.gravity.y = 300;
		bad_guy.body.collideWorldBounds = true;
		
		bad_guy.animations.add('left',[0,1, 2],10,true);
		bad_guy.animations.add('right',[4,5, 6],10,true);
		bad_guy.frame = 4;


		var bad_guy= bad_guys.create(440, 200, 'wolverine');

		bad_guy.body.bounce.y =  0.7 + 0.2;
		bad_guy.body.gravity.y = 300;
		bad_guy.body.collideWorldBounds = true;
		
		bad_guy.animations.add('left',[0, 1, 2],10,true);
		bad_guy.animations.add('right',[4, 5, 6],10,true);

		bad_guy.frame = 3;


		var bad_guy= bad_guys.create(640, 80, 'wolverine');

		bad_guy.body.bounce.y =  0.7 + 0.2;
		bad_guy.body.gravity.y = 300;
		bad_guy.body.collideWorldBounds = true;
		
		bad_guy.animations.add('left',[0, 1, 2],10,true);
		bad_guy.animations.add('right',[4, 5, 6],10,true);
		bad_guy.frame = 3;

		var bad_guy= bad_guys.create(840, 80, 'king');

		bad_guy.body.bounce.y =  0.7 + 0.2;
		bad_guy.body.gravity.y = 300;
		bad_guy.body.collideWorldBounds = true;
		
		bad_guy.animations.add('left',[0, 1, 2],10,true);
		bad_guy.animations.add('right',[4, 5, 6],10,true);
		bad_guy.frame = 3;


		
	    //Stars
	    stars = game.add.group();

	    stars.enableBody = true;

	    //  Here we'll create NR_OF_STARS of them evenly spaced apart
	    for (var i = 0; i < NR_OF_STARS; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = stars.create(100+i * (game.world.width-100)/NR_OF_STARS,  Math.random()*(game.world.height-150), 'star');

	        //  Let gravity do its thing
	        star.body.gravity.y = 300;

	        //  This just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }


		//life bar
		lifes = game.add.group();
		for (var i=0;i<3;i++)
		{	lifes.create(16+i*32,50,'life');
		}
		
	    //  The score
	    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });


	    //Controls.
	    cursors = game.input.keyboard.createCursorKeys();
	    
		
		
		for (var i=0;i<bad_guys.countLiving();i++)
		{	
		}
		
	},

	function update() {

	    //  Collide the player and the stars with the platforms
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);
		game.physics.arcade.collide(bad_guys, platforms);


	    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	    game.physics.arcade.overlap(player, stars, collectStar, null, this);
		game.physics.arcade.collide(player, bad_guys, hit, null, this);

		game.physics.arcade.collide(player, door, passDoor, null, this);
	   
	    
		
		if (hitTimer<=0){
			 //  Reset the players velocity (movement)
			player.body.velocity.x = 0;
			if (cursors.left.isDown){
				//  Move to the left
				player.body.velocity.x = -150;

				player.animations.play('left');
			} else if (cursors.right.isDown){
				//  Move to the right
				player.body.velocity.x = 150;

				player.animations.play('right');
			} else {
				//  Stand still
				player.animations.stop();

				player.frame = 4;
			}
			
			//  Allow the player to jump if they are touching the ground.
			if (cursors.up.isDown && player.body.touching.down) {
				player.body.velocity.y = -240;
			}
			
			if (cursors.up.isDown){
				player.body.y -= 1.5;
			}

		} else
			hitTimer--;


		//control bad guys
		for (var i=0;i<bad_guys.countLiving();i++){
			var bad_guy=bad_guys.getAt(i);
			var speed=20+5*i;

			if (player.body.y<bad_guy.body.y && player.body.y+20>bad_guy.body.y){
				if (player.body.x+1 < bad_guy.body.x){

				 	bad_guy.body.velocity.x=-speed;
					bad_guy.animations.play('left');

				} else	if (player.body.x-1 > bad_guy.body.x){

				 	bad_guy.body.velocity.x=speed;
					bad_guy.animations.play('right');

				} else if (bad_guy.body.touching.down){

					bad_guy.body.velocity.x=0;
					bad_guy.body.velocity.y=-speed*3;
					bad_guy.animations.stop();
				}

			} else 
				bad_guy.body.velocity.x=0;
		}
			
	},

	function collectStar (player, star) {
    
	    // Removes the star from the screen
	    star.kill();

	    //  Add and update the score
	    score += 1;
	    scoreText.text = 'Score: ' + score; 
		
		//for (var i=0;i<bad_guys.countLiving();i++){	}
		
		
		if (score==NR_OF_STARS){
			door.animations.stop();
			door.frame = 2;
			//game.paused=true;
			game.add.text(510, 300, 'The door is OPENED!', { fontSize: '32px', fill: '#fff' });

		}
	},


	function hit (player, bad_guy) {
	    
	    //if (hitTimer<=0 && bad_guy.emotionAgent.getRelation('player').like<0){

		if (hitTimer<=0){
			//  Add and update lives
			
			lifes.getFirstAlive().kill();
			scoreText.text = 'Score: ' + score;
			player.body.velocity.y = -150;
			if (player.body.x < bad_guy.body.x)
				player.body.velocity.x = -200;
			else
				player.body.velocity.x = 200;
				player.animations.play('hit');
				hitTimer=50;
			
			
			if (lifes.countLiving()==0){
				game.paused=true;
				game.add.text(510, 300, 'You shall NOT PASS!', { fontSize: '32px', fill: '#fff' });
			}
		} 
	},



	function passDoor (player, door) {

		if (score===NR_OF_STARS){
			score = 0;
			//game.paused=true;
			this.game.state.start(game.state.current);

		}
	},

};