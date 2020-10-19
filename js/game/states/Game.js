WebFont.load({
    google: {
        families: ['VT323']
    }
});
function create() {

    // Create world.
    var world = game.add.sprite(0, 0, 'world');
    world.width = gameWidth;
    world.height = gameHeight;
    
    // Create enemies.
    for (var i = 0; i < enemyLocations.length; i++) {

      var enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy');
      enemy.inputEnabled = true;
      enemy.events.onInputDown.add(clickTarget, enemy);
      enemy.enemyId = i;
      enemy.x = enemy.originalX = enemyLocations[i][0] * 4;
      enemy.y = enemy.originalY = enemyLocations[i][1] * 4;

      // Animation.
      var walk = enemy.animations.add('walk');
      enemy.animations.play('walk', 6, true);
      
      //  A mask is a Graphics object
      mask = game.add.graphics(0, 0);
      mask.beginFill(0xffffff);
      mask.drawRect(enemy.x, enemy.y, enemy.width, enemy.height);
      enemy.mask = mask;
      
      // Move mole out of sight.
      enemy.y = enemy.originalY + enemy.height;
      
      // Create bubble.
      enemy.bubble = game.add.sprite(game.world.centerX, game.world.centerY, 'bubble');
      enemy.bubble.x = enemy.originalX - 28;
      enemy.bubble.y = enemy.originalY + 20;
      enemy.bubble.visible = false;
      
      enemies.push(enemy);
      
    }
    
    // Render score label.
    var style = { font: " 25px VT323", fill: "#fff", boundsAlignH: "right", boundsAlignV: "middle" };
    var textstyle = { font: " 25px VT323", fill: "#fff", boundsAlignH: "right", boundsAlignV: "middle" };
    scoreLabel = game.add.text(5, 3, 'SCORE:  ', textstyle);
    scoreLabel = game.add.text(100, 3, '' + score, style);
    scoreLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    
    // Add hearts for life.
    for (var i = 0; i < 3; i++) {
      var heart = game.add.sprite(game.world.centerX, game.world.centerY, 'heart');
      heart.anchor.x = .3;
      heart.anchor.y = 0.10;
      heart.y = 10;
      heart.x = 290 + i * (heart.width + 4)
      hearts.push(heart);
    }
    
    updateLabels();
    
    // Create game over label.
    var style = { font: "50px VT323", fill: "#fff"/*, boundsAlignH: "center", boundsAlignV: "middle" */};
    gameOverLabel = game.add.text(0, 0, 'Game Over!', style);
    //gameOverLabel.setTextBounds(0, 0, gameWidth, gameHeight);
    gameOverLabel.anchor.x = 0.5;
    gameOverLabel.anchor.y = 0.5;
    gameOverLabel.x = gameWidth / 2;
    gameOverLabel.y = gameHeight / 2;
    gameOverLabel.alpha = 0;
    gameOverLabel.angle = 45;
    gameOverLabel.scale.x = 4;
    gameOverLabel.scale.y = 4;
    gameOverLabel.visible = false;

    // Particle emitter.
    emitter = game.add.emitter(game.world.centerX, 200, 200);
    emitter.makeParticles('star');
    emitter.gravity = 50;
   
    // Play again button.
    newGameButton = game.add.sprite(game.world.centerX, game.world.centerY * 0.75, 'playagain');
    newGameButton.inputEnabled = true;
    newGameButton.events.onInputDown.add(newGame, newGameButton);
    newGameButton.anchor.x = 0.5;
    newGameButton.anchor.y = 0.5;
    newGameButton.x = gameWidth / 2;
    newGameButton.y = gameHeight * 0.8;
    newGameButton.visible = true;

  }
 
  /**
   * Start new game!
   */
  function newGame() {
    
    score = 0;
    lifes = 3;
    updateLabels();
    
    gameOverLabel.visible = false;
    newGameButton.visible = false;

    // Hide all enemies.
    for (var i in enemies) {
      enemies[i].y = enemies[i].originalY + enemies[i].height;
    }

    // Start time.
    enemyDelay = enemyDelayStart;
    
    // Start showing enemies!
    game.time.events.add(enemyDelay, showEnemy, this);
    
  }
  function gameOver() {

    gameOverLabel.alpha = 0;
    gameOverLabel.angle = 60;
    gameOverLabel.scale.x = 4;
    gameOverLabel.scale.y = 4;
    gameOverLabel.visible = true;    
    game.add.tween(gameOverLabel).to({angle: 0}, 1000, Phaser.Easing.Exponential.In, true);
    game.add.tween(gameOverLabel).to({alpha: 1}, 1000, Phaser.Easing.Exponential.In, true);
    game.add.tween(gameOverLabel.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Exponential.In, true);

    game.time.events.add(1000, function() {
      emitter.start(true, 5000, 200, 200);
    }, this);

    game.time.events.add(2000, function() {
      newGameButton.scale.x = 0.5;
      newGameButton.scale.y = 0.5;
      newGameButton.alpha = 0;
      newGameButton.visible = true;
      game.add.tween(newGameButton).to({alpha: 1}, 500, Phaser.Easing.Exponential.Out, true);
      game.add.tween(newGameButton.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Elastic.Out, true);

    }, this);

  }
  
  /**
   * Render loop.
   */
  function update() {
    //logo.angle += 1;
  };