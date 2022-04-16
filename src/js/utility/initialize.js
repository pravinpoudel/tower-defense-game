let manager = new Manager();
GameState.menu = manager;
let screens = {
  help: new Help(manager),
  highscores: new HighScoreMenu(manager),
  mainmenu: new MainMenu(manager),
  about: new About(manager),
};

GameState.input = new Keyboard();
console.log(GameState.input);
screens.gameplay = new GamePlay(manager, GameState.input);
GameState.screens = screens;
