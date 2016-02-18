// Enemies our player must avoid

var Enemy = function(x, y, speed) {

    //set the image for enemy
    //set the location and speed parameters for the enemy
    //set the width and height for collision purpose
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 30;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
        if (this.x > 505) {
        this.x = 0;
        };
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create our Player
var Player = function() {

    //set the image for the player
    //set the initial location for the player
    //set the width and height for collision purposes
    this.x = 204;
    this.y = 320;
    this.width = 50;
    this.height = 30;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player's position when it gets to water
// "You Won!" text when player gets to water
Player.prototype.win = function() {
    this.x = 204;
    this.y = 320;
    ctx.font = "30px Arial";
    ctx.fillText("You Won!", 150, 150);
};

// Player's position when a collision occurs
// "Try Again!" text when collision occurs
Player.prototype.lose = function() {
    this.x = 204;
    this.y = 320;
    ctx.font = "30px Arial";
    ctx.fillText("Try Again!", 150, 150);
};



// Controls how far and where player will move when direction keys are pressed
// Keep player within the playing field
// If player gets to water, player.win() is called and game is paused for 3 seconds
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 100) {
        this.x -= 100;
    } else {
        this.x = this.x;
    };
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    } else {
        this.x = this.x;
    };
    if (direction === 'up' && this.y > 50) {
        this.y -= 82.5;
    } else {
        this.y = this.y;
    };
    if (direction === 'up' && this.y < 51) {
        setTimeout(player.win(), 3000);
    };
    if (direction === 'down' && this.y < 400) {
        this.y += 82.5;
    } else {
        this.y = this.y;
    };
};

// Creates border rectangles for player and enemies to detect collisions
// If collision occurs, player.lose() is called for three seconds
checkCollisions = function() {

    player.rect = [player.x, player.y, player.width, player.height];

    for (i = 0; i < allEnemies.length; i++) {
        allEnemies[i].rect = [allEnemies[i].x, allEnemies[i].y, allEnemies[i].width, allEnemies[i].height];

        if (player.rect[0] < allEnemies[i].rect[0] + allEnemies[i].rect[2] &&
            player.rect[0] + player.rect[2] > allEnemies[i].rect[0] &&
            player.rect[1] < allEnemies[i].rect[1] + allEnemies[i].rect[3] &&
            player.rect[3] + player.rect[1] > allEnemies[i].rect[1]) {

            setTimeout(player.lose(), 3000);
        };
    };
};




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Instantiate and establish parameters (initial location and speed) for enemies
var Enemy1 = new Enemy(0, 55, 100);
var Enemy2 = new Enemy(0, 140, 150);
var Enemy3 = new Enemy(0, 225, 200);

// Place enemies into an arrary which will be called by engine.js
var allEnemies = [
    Enemy1, Enemy2, Enemy3
];

// Instantiate player
var player = new Player();

