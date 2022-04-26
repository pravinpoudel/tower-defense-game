function makeCreateCreep1(x, y) {
  let spriteSheet = [
    "creep10",
    "creep11",
    "creep12",
    "creep13",
    "creep14",
    "creep15",
  ];
  return this.createEnemy(x, y, spriteSheet, 4);
}

function makeCreateCreep2(x, y) {
  let spriteSheet = ["creep20", "creep21", "creep22", "creep23"];
  return this.createEnemy(x, y, spriteSheet, 2);
}

function makeCreateCreep3(x, y) {
  let spriteSheet = ["creep30", "creep31", "creep32", "creep33"];
  return this.createEnemy(x, y, spriteSheet, 6, true);
}

function createEnemy(x, y, spriteSheet, health, flying) {
  //all the event to handle movement
  let playerEvent = new MovingEvents({
    size: { x: 50, y: 50 }, // Size in pixels
    center: { x: x, y: y },
    rotation: 0,
    moveRate: 125 / 1000, // Pixels per second
    rotateRate: Math.PI / 1000, // Radians per second
    continousSpeed: 50,
    yDirection: 0,
    xDirection: 1,
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
  constructor(enemyCount) {
    this.animationTime = 0;
    this.totalEnemy = enemyCount;
  }
  createEnemy(elapsedTime) {
    this.animationTime += elapsedTime;
    if (this.animationTime >= 500) {
      if (this.totalEnemy-- > 0) {
        this.animationTime -= 500;
        let yPosition = generateRandom();
        let kind = Math.floor(Math.random() * 2);
        if (kind == 0) {
          return makeCreateCreep1(0, yPosition * 50 + 225);
        }

        if (kind == 1) {
          return makeCreateCreep2(0, yPosition * 50 + 225);
        }

        if (kind == 2) {
          return makeCreateCreep3(0, yPosition * 50 + 225);
        }
      }
    }
  }
}