var menuState = {
    create: function() {
           // Add a background image
        game.add.image(0, 0, 'background');
        // Display the name of the game
        var nameLabel = game.add.text(game.world.centerX, -50, 'Super Coin Box',
                {font: '50px Arial', fill: '#ffffff'});
        nameLabel.anchor.setTo(0.5, 0.5);

        // Create a tween on the label
        var tween = game.add.tween(nameLabel);
        // Change the y position of the label to 80, in 1000 ms
        tween.to({y: 80}, 1000);
        tween.easing(Phaser.Easing.Bounce.Out);
           // Start the tween
        tween.start();

// Store the relevant text based on the device used
if (game.device.desktop) {
var text = 'press the up arrow key to start';
}
else {
var text = 'touch the screen to start';
}


// Explain how to start the gam
        var startLabel = game.add.text(game.world.centerX, game.world.height - 80,
                text,
                {font: '25px Arial', fill: '#ffffff'});
        startLabel.anchor.setTo(0.5, 0.5);
// Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
// When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);

game.input.onDown.addOnce(this.start, this);
        // Create the tween
        var tween = game.add.tween(startLabel);
// Rotate the label to -2 degrees in 500ms
        tween.to({angle: -2}, 500);
// Then rotate the label to +2 degrees in 500ms
        tween.to({angle: 2}, 500);
// Loop indefinitely the tween
        tween.loop();
// Start the tween
        tween.start();

        // If 'bestScore' is not defined
        // It means that this is the first time the game is played
        if (!localStorage.getItem('bestScore')) {
            // Then set the best score to 0
            localStorage.setItem('bestScore', 0);
        }
        // If the score is higher than the best score
        if (game.global.score > localStorage.getItem('bestScore')) {
            // Then update the best score
            localStorage.setItem('bestScore', game.global.score);
        }
        // Show the score at the center of the screen
        var text = 'score: ' + game.global.score + '\nbest score: ' +
                localStorage.getItem('bestScore');
        var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, text,
                {font: '25px Arial', fill: '#ffffff', align: 'center'});
        scoreLabel.anchor.setTo(0.5, 0.5);


// Add the mute button that calls the 'toggleSound' function when pressed
        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
// If the mouse is over the button, it becomes a hand cursor
        this.muteButton.input.useHandCursor = true;
// If the game is already muted
        if (game.sound.mute) {
// Change the frame to display the speaker with no sound
            this.muteButton.frame = 1;
        }
        
        this.theme = game.add.audio('theme');
        this.theme.loop = true;
         this.theme.play();
         this.theme.volume=0.5;

    },
    start: function() {
// Start the actual game
    this.theme.stop();
        game.state.start('play');
        
    },
    // Function called when the 'muteButton' is pressed
    toggleSound: function() {
// Switch the Phaser sound variable from true to false, or false to true
// When 'game.sound.mute = true', Phaser will mute the game
        game.sound.mute = !game.sound.mute;
// Change the frame of the button
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    },
};