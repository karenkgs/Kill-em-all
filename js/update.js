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
		if (cursors.left.isDown)
		{
			//  Move to the left
			player.body.velocity.x = -150;

			player.animations.play('left');
		}
		else if (cursors.right.isDown)
		{
			//  Move to the right
			player.body.velocity.x = 150;

			player.animations.play('right');
		}
		else
		{
			//  Stand still
			player.animations.stop();

			player.frame = 4;
		}
		
		//  Allow the player to jump if they are touching the ground.
		if (cursors.up.isDown && player.body.touching.down)
		{
			player.body.velocity.y = -240;
		}
		if (cursors.up.isDown)
		{
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
		
}