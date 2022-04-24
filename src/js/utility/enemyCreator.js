function makeCreateCreep1(x, y) {
  let spriteSheet = [
    "assets/creeps1/1.png",
    "assets/creeps1/2.png",
    "assets/creeps1/3.png",
    "assets/creeps1/4.png",
    "assets/creeps1/5.png",
    "assets/creeps1/6.png",
  ];
  return this.createEnemy(x, y, spriteSheet, 4);
}

function makeCreateCreep2(x, y) {
  let spriteSheet = [
    "assets/creeps2/1.png",
    "assets/creeps2/2.png",
    "assets/creeps2/3.png",
    "assets/creeps2/4.png",
  ];
  return this.createEnemy(x, y, spriteSheet, 2);
}

function makeCreateCreep3(x, y) {
  let spriteSheet = [
    "assets/creeps3/1.png",
    "assets/creeps3/2.png",
    "assets/creeps3/3.png",
    "assets/creeps3/4.png",
  ];
  return this.createEnemy(x, y, spriteSheet, 6);
}

function createEnemy(x, y, spriteSheet, health) {
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
        return makeCreateCreep2(0, yPosition * 50 + 225);
      }
    }
  }
}