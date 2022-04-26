function makeCreateCreep1(x, y, xDirection, yDirection) {
  let spriteSheet = [
    "creep10",
    "creep11",
    "creep12",
    "creep13",
    "creep14",
    "creep15",
  ];
  return this.createEnemy(x, y, xDirection, yDirection, spriteSheet, 4);
}

function makeCreateCreep2(x, y, xDirection, yDirection) {
  let spriteSheet = ["creep20", "creep21", "creep22", "creep23"];
  return this.createEnemy(x, y, xDirection, yDirection, spriteSheet, 2);
}

function makeCreateCreep3(x, y, xDirection, yDirection) {
  let spriteSheet = ["creep30", "creep31", "creep32", "creep33"];
  return this.createEnemy(x, y, xDirection, yDirection, spriteSheet, 6, true);
}

function createEnemy(
  x,
  y,
  xDirection,
  yDirection,
  spriteSheet,
  health,
  flying
) {
  //all the event to handle movement
  let playerEvent = new MovingEvents({
    size: { x: 50, y: 50 }, // Size in pixels
    center: { x: x, y: y },
    rotation: yDirection == 1 ? Math.PI / 2 : 0,
    moveRate: 125 / 1000, // Pixels per second
    rotateRate: Math.PI / 1000, // Radians per second
    continousSpeed: 50,
    yDirection: yDirection,
    xDirection: xDirection,
  });

  let timeArray = new Array(spriteSheet.length).fill(25);
  let playerSpecs = {
    spriteSheet: spriteSheet,
    spriteCount: spriteSheet.length,
    spriteTime: timeArray,
    health: health,
    flying: flying,
  };
  //make a playerModel
  let playerModel = new gameModel(playerSpecs, playerEvent, true);
  return playerModel;
}

class EnemyCreator {
  constructor(enemyCount, position, kind) {
    this.animationTime = 0;
    this.totalEnemy = enemyCount;
    this.position = position;
    this.kind = kind;
  }
  createEnemy(elapsedTime) {
    this.animationTime += elapsedTime;
    if (this.animationTime >= 500) {
      if (this.totalEnemy-- > 0) {
        this.animationTime -= 500;
        let xPosition = 25,
          xDirection = 0;
        let yPosition = 225,
          yDirection = 0;

        if (this.position == "left") {
          yPosition = generateRandom() * 50 + 225;
          xDirection = 1;
        }
        if (this.position == "top") {
          xPosition = generateRandom() * 50;
          yDirection = 1;
        }

        let kind = Math.floor(Math.random() * (this.kind - 1)) + 1;
        if (kind == 0) {
          return makeCreateCreep1(xPosition, yPosition, xDirection, yDirection);
        }

        if (kind == 1) {
          return makeCreateCreep2(xPosition, yPosition, xDirection, yDirection);
        }

        if (kind == 2) {
          return makeCreateCreep3(xPosition, yPosition, xDirection, yDirection);
        }
      }
    }
  }
}
