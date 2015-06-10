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
	
}