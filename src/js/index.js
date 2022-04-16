const game = new Manager();

// make screen

screens = {
  about: new About(),
  help: new Help(),
  highscores: new HighScoreMenu(),
  mainmenu: new MainMenu(),
  gameplay: new Game(),
};

game.initialize();
