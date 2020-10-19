 function hideEnemy() {
    
    
    // Hide enemy.
    var tween = game.add.tween(enemies[currentEnemy]).to( { y: enemies[currentEnemy].originalY + enemies[currentEnemy].height }, 200, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(function() {

          console.log('Hide enemy!');

      // Player didn't hit the enemy. Reduce one life.
      if (!enemyKilled) {

        lifes--;

        console.log('MISS! Lifes left: ' + lifes);

        // Refresh labels.
        updateLabels();

      } 

      if (lifes > 0) {

        // Show new enemy after delay.
        game.time.events.add(enemyDelay, showEnemy, this);

      } else {

        gameOver();

      }

      
    }, this);

    
  }
  
  
  
  /**
   * Show enemy.
   */
  function showEnemy() {
    
    console.log('Show enemy!');
    
    enemyKilled = false;
    
    // Randomize new enemy.
    currentEnemy = Math.floor(Math.random() * enemies.length);
    
    // Show it.
    //enemies[currentEnemy].visible = true;
    tween = game.add.tween(enemies[currentEnemy]).to( { y: enemies[currentEnemy].originalY }, 200, Phaser.Easing.Bounce.Out, true);

    // Hide after a while.
    game.time.events.add(enemyDelay, hideEnemy, this);
    
    // Shorten time.
    if (enemyDelay > enemyDelayMin) {
      enemyDelay *= enemyDelayFactor;    
    }
    
  }
 
  
  
  /**
   * Enemy click handler.
   */
  function clickTarget() {

    // Don't allow double kills.
    if (!enemyKilled) {

      console.log('You hit enemy: ' + this.enemyId);

      // Mark enemy as killed.
      enemyKilled = true;

      // Increase score.
      score++;
      
      // Hide enemy.
      // this.visible = false;
      game.add.tween(this).to( { y: this.originalY + this.height }, 200, Phaser.Easing.Bounce.In, true);
      
      // Show bubble.
      game.time.events.add(400, function() {
        this.bubble.visible = true;
        game.time.events.add(600, function() {
          this.bubble.visible = false;
        }, this);
      }, this);
      
      // Update labels.
      updateLabels();

    }

  };