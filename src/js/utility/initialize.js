let canvas = document.getElementById("canvas-main");
let context;
let manager = new Manager();
let activeButton = null;
var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf("/")) + "/";

renderCircle = false;
firstTime = true;
selectedTower = null;
mouseCapture = false;
towerClicked = null;
moneyRequired = 0;
towerTypeSelected = 1;
bombAffectRadius = 150;
gameSound = null;
creepGoing = "top";
totalCreepKilled = 0;
wave = 10;
maxWave = 3;
nextWave = false;
towerRadius = 100;

const cellWidth = 50;
const rows = 10;
const cols = 10;
let topOffset = 250;
let leftOffset = 50;

const mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
  isActive: false,
};

const cellSet = [];
const canvasPosition = canvas.getBoundingClientRect();

var towerElements2;
var towerElements;
var startButton;

// canvas.addEventListener("mousedown", function (e) {
//   mouse.isActive = true;
// });

// canvas.addEventListener("mousemove", function (e) {
//   mouse.x = e.x - canvasPosition.left;
//   mouse.y = e.y - canvasPosition.top;
// });

// canvas.addEventListener("click", handleClick);

// function handleClick(event) {
//   mouse.x = event.offsetX;
//   mouse.y = event.offsetY;
//   console.log(mouse.x, mouse.y);
// }

// canvas.addEventListener("mouseleave", function () {
//   mouse.x = undefined;
//   mouse.y = undefined;
// });

if (localStorage["upgrade"] == "null") {
  localStorage.setItem("upgrade", "u");
}
if (!localStorage.getItem("sell")) {
  localStorage.setItem("sell", "s");
}
if (!localStorage.getItem("start")) {
  localStorage.setItem("start", "s");
}

// console.log(
//   localStorage["upgrade"],
//   localStorage["shell"],
//   localStorage["start"]
// );

// window.addEventListener("resize", resizeCanvas, false);

GameState.menu = manager;

let screens = {
  help: new Help(manager),
  highscores: new HighScoreMenu(manager),
  control: new Control(manager),
  mainmenu: new MainMenu(manager),
  about: new About(manager),
};

GameState.input = new Keyboard();
screens.gameplay = new GamePlay(manager, GameState.input);
GameState.screens = screens;

// function resizeCanvas() {
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

function isColliding2(x1, y1, width1, x2, y2, width2) {
  return !(
    x1 + width1 <= x2 ||
    x1 >= x2 + width2 ||
    y1 + width1 <= y2 ||
    y1 >= width2 + y2
  );
}

function isColliding(r1, r2, radius) {
  let r1X = r1.player.specs.center.x - Math.floor(r1.player.specs.size.x / 2);
  let r1Y = r1.player.specs.center.y - Math.floor(r1.player.specs.size.y / 2);
  let r1Width = r1.player.specs.size.x;

  // let r2X = r2.player.specs.center.x - Math.floor(r2.player.specs.size.x / 2);
  // let r2Y = r2.player.specs.center.y - Math.floor(r2.player.specs.size.y / 2);
  // let r2Width = r2.player.specs.size.x;
  let r2Width = r2.baseSprite.image.width;
  let r2X = r2.specs.center.x - r2Width;
  let r2Y = r2.specs.center.y - r2Width;
  return !(
    r1X + r1Width <= r2X - radius ||
    r1X >= r2X + r2Width + radius ||
    r1Y + r1Width <= r2Y - radius ||
    r1Y >= r2Width + r2Y + radius
  );
}
function drawRectangle(spec) {
  context.fillStyle = spec.fill;
  context.fillRect(spec.x, spec.y, spec.width, spec.height);

  context.strokeStyle = spec.stroke;
  context.strokeRect(spec.x, spec.y, spec.width, spec.height);
}

function drawTower(radius) {
  let image = GameState.assets[selectedTower];
  context.drawImage(
    image,
    mouse.x - image.width / 2, // Where to draw the sub-texture
    mouse.y - image.height / 2,
    image.width,
    image.height
  );
  context.beginPath();
  context.arc(mouse.x, mouse.y, radius, 0, 2 * Math.PI, false);
  context.stroke();
}

function generateRandom(min = 4, max = 8) {
  let difference = max - min;
  let random = Math.random();
  random = Math.floor(random * difference) + min;
  return random;
}

function crossProduct2d(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

function normalize(direction) {
  let distance = Math.sqrt(
    direction.x * direction.x + direction.y * direction.y
  );
  direction.x = direction.x / distance;
  direction.y = direction.y / distance;
  return direction;
}

function testTolerance(value, test, tolerance) {
  if (Math.abs(value - test) < tolerance) {
    return true;
  } else {
    return false;
  }
}

function computeAngle(rotation, ptCenter, ptTarget) {
  let v1 = {
    x: Math.cos(rotation),
    y: Math.sin(rotation),
  };
  let v2 = {
    x: ptTarget.x - ptCenter.x,
    y: ptTarget.y - ptCenter.y,
  };

  v2.len = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  v2.x /= v2.len;
  v2.y /= v2.len;

  let dp = v1.x * v2.x + v1.y * v2.y;
  let angle = Math.acos(dp);

  let cp = crossProduct2d(v1, v2);

  return {
    angle: angle,
    crossProduct: cp,
  };
}
let mouseOverTower = null;

function canCreated(towers) {
  let towersLength = towers.length;
  for (let i = 0; i < towersLength; i++) {
    if (
      isColliding2(
        mouse.x,
        mouse.y,
        mouse.width,
        towers[i].specs.center.x - 25,
        towers[i].specs.center.y - 25,
        50
      )
    ) {
      mouseOverTower = towers[i];
      return false;
    }
  }
  return true;
}

function findSelectedTower(towers) {
  if (!mouse.isActive) {
    if (!canCreated(towers)) {
      towerClicked = mouseOverTower;
    }
  }
}

