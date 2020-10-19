function preload() {
    console.clear();
    game.load.crossOrigin = 'Anonymous';
    this.load.spritesheet('enemy', 'assets/images/mole.png', 64, 72);
    this.load.image('bubble', 'assets/images/bubble.png');
    this.load.image('playagain', 'assets/images/play-again.png');
    this.load.image('world', 'assets/images/world.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('heart', 'assets/images/hp.png');
    
    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
  };

