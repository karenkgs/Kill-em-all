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

	game.load.image('life', 'assets/firstaid.png')
}