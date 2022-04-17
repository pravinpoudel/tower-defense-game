"use strict";

var canvas = document.getElementById("canvas-main");
var context;
var manager = new Manager();
var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf("/")) + "/";
window.addEventListener("resize", resizeCanvas, false);
GameState.menu = manager;
var screens = {
  help: new Help(manager),
  highscores: new HighScoreMenu(manager),
  mainmenu: new MainMenu(manager),
  about: new About(manager)
};
GameState.input = new Keyboard();
console.log(GameState.input);
screens.gameplay = new GamePlay(manager, GameState.input);
GameState.screens = screens;

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    console.log(canvas);
  }
}

resizeCanvas(); //------------------------------------------------------

function isColliding(r1, r2) {
  return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
}

function drawRectangle(spec) {
  context.fillStyle = spec.fill;
  context.fillRect(spec.x, spec.y, spec.width, spec.height);
  context.strokeStyle = spec.stroke;
  context.strokeRect(spec.x, spec.y, spec.width, spec.height);
}
//# sourceMappingURL=initialize.dev.js.map
