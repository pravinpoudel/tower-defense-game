"use strict";

var canvas = document.getElementById("canvas-main");
var context;
var manager = new Manager();
var activeButton = null;
var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf("/")) + "/";
var mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
  isActive: false
};
var canvasPosition = canvas.getBoundingClientRect(); // canvas.addEventListener("mousedown", function (e) {
//   mouse.isActive = true;
// });
// canvas.addEventListener("mousemove", function (e) {
//   mouse.x = e.x - canvasPosition.left;
//   mouse.y = e.y - canvasPosition.top;
// });

canvas.addEventListener("click", handleClick);

function handleClick(event) {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
  console.log(mouse.x, mouse.y);
}

canvas.addEventListener("mouseleave", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

if (!localStorage.getItem("upgrade")) {
  localStorage.setItem("upgrade", "u");
}

if (!localStorage.getItem("sell")) {
  localStorage.setItem("sell", "s");
}

if (!localStorage.getItem("start")) {
  localStorage.setItem("start", "g");
}

console.log(localStorage["upgrade"], localStorage["shell"], localStorage["start"]); // window.addEventListener("resize", resizeCanvas, false);

GameState.menu = manager;
var screens = {
  help: new Help(manager),
  highscores: new HighScoreMenu(manager),
  control: new Control(manager),
  mainmenu: new MainMenu(manager),
  about: new About(manager)
};
GameState.input = new Keyboard();
console.log(GameState.input);
screens.gameplay = new GamePlay(manager, GameState.input);
GameState.screens = screens; // function resizeCanvas() {
//   if (canvas) {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     context = canvas.getContext("2d");
//     console.log(canvas);
//   }
// }
// resizeCanvas();
//------------------------------------------------------
// r2.specs.center.y > r1.specs.y + r1.specs.size.y ||
// r2.specs.center.y + r2.specs.size.y < r1.specs.center.y

function isColliding2(r1, r2, radius) {
  var r1X = r1.player.specs.center.x - Math.floor(r1.player.specs.size.x / 2);
  var r1Y = r1.player.specs.center.y - Math.floor(r1.player.specs.size.y / 2);
  var r1Width = r1.player.specs.size.x; // let r2X = r2.player.specs.center.x - Math.floor(r2.player.specs.size.x / 2);
  // let r2Y = r2.player.specs.center.y - Math.floor(r2.player.specs.size.y / 2);
  // let r2Width = r2.player.specs.size.x;

  var r2Width = r2.baseSprite.image.width;
  var r2X = r2.specs.center.x - r2Width;
  var r2Y = r2.specs.center.y - r2Width;
  return !(r1X + r1Width <= r2X - radius || r1X >= r2X + r2Width + radius || r1Y + r1Width <= r2Y - radius || r1Y >= r2Width + r2Y + radius);
}

function isColliding(r1, r2, radius) {
  var r1X = r1.player.specs.center.x - Math.floor(r1.player.specs.size.x / 2);
  var r1Y = r1.player.specs.center.y - Math.floor(r1.player.specs.size.y / 2);
  var r1Width = r1.player.specs.size.x; // let r2X = r2.player.specs.center.x - Math.floor(r2.player.specs.size.x / 2);
  // let r2Y = r2.player.specs.center.y - Math.floor(r2.player.specs.size.y / 2);
  // let r2Width = r2.player.specs.size.x;

  var r2Width = r2.baseSprite.image.width;
  var r2X = r2.specs.center.x - r2Width;
  var r2Y = r2.specs.center.y - r2Width;
  return !(r1X + r1Width <= r2X - radius || r1X >= r2X + r2Width + radius || r1Y + r1Width <= r2Y - radius || r1Y >= r2Width + r2Y + radius);
}

function drawRectangle(spec) {
  context.fillStyle = spec.fill;
  context.fillRect(spec.x, spec.y, spec.width, spec.height);
  context.strokeStyle = spec.stroke;
  context.strokeRect(spec.x, spec.y, spec.width, spec.height);
}

function crossProduct2d(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

function testTolerance(value, test, tolerance) {
  if (Math.abs(value - test) < tolerance) {
    return true;
  } else {
    return false;
  }
}

function computeAngle(rotation, ptCenter, ptTarget) {
  var v1 = {
    x: Math.cos(rotation),
    y: Math.sin(rotation)
  };
  var v2 = {
    x: ptTarget.x - ptCenter.x,
    y: ptTarget.y - ptCenter.y
  };
  v2.len = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  v2.x /= v2.len;
  v2.y /= v2.len;
  var dp = v1.x * v2.x + v1.y * v2.y;
  var angle = Math.acos(dp);
  var cp = crossProduct2d(v1, v2);
  return {
    angle: angle,
    crossProduct: cp
  };
}
//# sourceMappingURL=initialize.dev.js.map
