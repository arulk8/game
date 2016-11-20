// Enemies our player must avoid
var count = 0;
var Gem = function () {
        this.x = 200;
        this.y = 300;
        this.sprite = 'images/Gem-Green_60.png';
};
//creating gem 
var gem = new Gem();
Gem.prototype.gemrandomizer = function () {
        if (player.x < this.x + 30 && player.x + 45 > this.x && player.y < this.y + 35 && 40 + player.y > this.y) {
                count = count + 1;
                this.x = Math.random() * (400 - 50) + 50;
                this.y = Math.random() * (360 - 40) + 40;
                var showgem = function () {
                        document.getElementById("counts").innerHTML = count;
                };
                showgem();
        }
};
var Enemy = function (x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.startx = x;
        this.starty = y;
        this.speed = speed;
};
Gem.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + (this.speed * dt);
        if (this.x > 500) {
                this.updatepos();
        }
        //collision detection
        if (player.x < this.x + 30 && player.x + 30 > this.x && player.y < this.y + 50 && 50 + player.y > this.y) {
                player.reset();
                window.alert("Game \ over!");
                count = 0;
                gem.x = 200;
                gem.y = 300;
        }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.updatepos = function () {
        this.x = this.startx;
        this.y = this.starty;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function (dt) {
        if (this.y == -10) {
                window.alert("Thats\ it\ Try\ To\ get\ more\ GEM ");
                player.reset();
        }
};
Player.prototype.reset = function () {
        player.x = 205;
        player.y = 380;
};
Player.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//handling keyboard input
Player.prototype.handleInput = function (e) {
        if (e == 'left' && this.x > 10) {
                this.x -= 50;
        } else if (e == 'right' && this.x < 400) {
                this.x += 50;
        } else if (e == 'up' && this.y > 0) {
                this.y -= 15;
        } else if (e == 'down' && this.y < 400) {
                this.y += 15;
        }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 230, 180);
var enemy2 = new Enemy(-300, 140, 180);
var enemy3 = new Enemy(-200, 60, 180);
var enemy4 = new Enemy(-400, 230, 220);
var enemy5 = new Enemy(-600, 140, 220);
var enemy6 = new Enemy(-500, 60, 220);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
var player = new Player(205, 380);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
        var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
});