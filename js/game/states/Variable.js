

  // Stage size.
  var gameWidth = 400;
  var gameHeight = 400;
  
  // List of enemies.
  var enemies = [];
  
  // Enemylocations.
  var enemyLocations = [[9,73],[39,58],[70,67],[60,46],[12,40],[31,29],[74,26],[59,9],[25,0],[12,15]];
  
  // Currently visible enemy.
  var currentEnemy = -1;

  // Score
  var score = 0;
  
  // Lifes.
  var lifes = 3;
  
  // Initial enemy on screen time.
  var enemyDelayStart = 2000;
  
  // Enemy delay factor. After each hit delay is multiplied by this value.
  var enemyDelayFactor = 0.95;
  
  // Calculated on screen time.
  var enemyDelay = 0;
  
  // Min delay.
  var enemyDelayMin = 500;
  
  // Is enemy killed?
  var enemyKilled = true;
  
  // Label for score.
  var scoreLabel = {};
  
  // Array of health sprites.
  var hearts = [];
  
  // Gameover label.
  var gameOverLabel = {};
  
  // New game button.
  var newGameButton = {};
  
  // Particle emitter.
  var emitter = {};