/**
   * Update score and lifes label.
   */
  function updateLabels() {
    scoreLabel.text = score;  
    
    if (lifes == 3) {
      for (var i = 0; i < hearts.length; i++) {
        hearts[i].visible = true;
        hearts[i].scale.x = 1;
        hearts[i].scale.y = 1;
        hearts[i].alpha = 1;
      }
    } else {
      game.add.tween(hearts[lifes].scale).to( { x: 0, y: 0 }, 200, Phaser.Easing.Bounce.In, true);   
    }
    
  };
  