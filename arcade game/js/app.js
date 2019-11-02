//level 1 - the start 
var level = 1;

var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';

// enemy random position
    this.x = Math.floor((Math.random() * 504) + -90);

    this.yArray = [41.5, 124.5, 207.5];

// enemy random position
    this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];

//enemy velocity random between 10 and 30 multiply level to change difficulty
    this.veloc = Math.floor((Math.random() * 30) + 10) * level;
};

//change enemy position
Enemy.prototype.update = function(dt) { 

    this.x = this.x + (this.veloc * dt); 

//refresh the enemy when goes to far right
  if (this.x > 504) {

    //enemy position
    this.x = -90;

//enemy position random
    this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];

//enemy velocity random between 10 and 30 multiply level to change difficulty
    this.veloc = Math.floor((Math.random() * 30) + 10) * level;
  }

//check if enemy hit player
  if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y > player.y - 75 && this.y < player.y + 75)) {

//return player initial position
    player.x = 202;
    player.y = 373.5;

//enemies random positions
    allEnemies.forEach(function(enemy) {
      enemy.x = Math.floor((Math.random() * 504) + -90);
      enemy.y = enemy.yArray[Math.floor(Math.random() * enemy.yArray.length)];
    });

//return to level 1
    level = 1;
  }

//show level variable value to .level span when update
  document.querySelector('.level span').innerHTML = level;
};

//render enemy on the screen method
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
var Player = function() {

//initial player position
    this.x = 202;
    this.y = 373.5;

//player image
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(keyPress) {

//change position depending on input keyPress
//if the statments only allows movement inside the canvas bounderies
  switch (keyPress) {
    case 'up':
      this.y = this.y - 83;
      if(this.y < 0) {
        this.x = 202;
        this.y = 373.5;
        level++;
      }
    break;
    case 'down':
      if(this.y < 373.5) {
        this.y = this.y + 83;
      }
    break;
    case 'left':
      if(this.x > 0) {
        this.x = this.x - 101;
      }
    break;
    case 'right':
      if(this.x < 404) {
        this.x = this.x + 101;
      }
    break;
  }
};

Player.prototype.update = function(dt) {

};

//render player on the screen method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//instatiate enemies in allEnemie array
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

//instantiate player
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
