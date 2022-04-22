let canvas = document.getElementById("canvas-main");
let context;
let manager = new Manager();
let activeButton = null;
var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf("/")) + "/";

if (!localStorage.getItem("upgrade")) {
  localStorage.setItem("upgrade", "u");
}
if (!localStorage.getItem("shell")) {
  localStorage.setItem("shell", "s");
}
if (!localStorage.getItem("start")) {
  localStorage.setItem("start", "g");
}

console.log(
  localStorage["upgrade"],
  localStorage["shell"],
  localStorage["start"]
);

window.addEventListener("resize", resizeCanvas, false);

GameState.menu = manager;

let screens = {
  help: new Help(manager),
  highscores: new HighScoreMenu(manager),
  control: new Control(manager),
  mainmenu: new MainMenu(manager),
  about: new About(manager),
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
resizeCanvas();

//------------------------------------------------------
function isColliding(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}
function drawRectangle(spec) {
  context.fillStyle = spec.fill;
  context.fillRect(spec.x, spec.y, spec.width, spec.height);

  context.strokeStyle = spec.stroke;
  context.strokeRect(spec.x, spec.y, spec.width, spec.height);
}
