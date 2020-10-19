function hideEnemy() {
    
   
    var tween = game.add.tween(enemies[currentEnemy]).to( { y: enemies[currentEnemy].originalY + enemies[currentEnemy].height }, 200, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(function() {

          console.log('Hide enemy!');

     
      if (!enemyKilled) {

        lifes--;

        console.log('MISS! Lifes left: ' + lifes);

       
        updateLabels();

      } 

      if (lifes > 0) {

       
        game.time.events.add(enemyDelay, showEnemy, this);

      } else {

        gameOver();

      }

      
    }, this);

    
  }
  
  
  function showEnemy() {
    
    console.log('Show enemy!');
    
    enemyKilled = false;
    
    
    currentEnemy = Math.floor(Math.random() * enemies.length);
    
    
    tween = game.add.tween(enemies[currentEnemy]).to( { y: enemies[currentEnemy].originalY }, 500, Phaser.Easing.Bounce.Out, true);

    
    game.time.events.add(enemyDelay, hideEnemy, this);
    
   
    if (enemyDelay > enemyDelayMin) {
      enemyDelay *= enemyDelayFactor;    
    }
    
  }
 
  function clickTarget() {

    if (!enemyKilled) {

      console.log('You hit enemy: ' + this.enemyId);


      enemyKilled = true;


      score++;
      

      game.add.tween(this).to( { y: this.originalY + this.height }, 200, Phaser.Easing.Bounce.In, true);
      

      game.time.events.add(400, function() {
        this.bubble.visible = true;
        game.time.events.add(600, function() {
          this.bubble.visible = false;
        }, this);
      }, this);
      
      updateLabels();

    }

  }
  
