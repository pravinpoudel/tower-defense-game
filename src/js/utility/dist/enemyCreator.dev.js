"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function makeCreateCreep1(x, y) {
  var spriteSheet = ["assets/creeps1/1.png", "assets/creeps1/2.png", "assets/creeps1/3.png", "assets/creeps1/4.png", "assets/creeps1/5.png", "assets/creeps1/6.png"];
  return this.createEnemy(x, y, spriteSheet, 4);
}

function makeCreateCreep2(x, y) {
  var spriteSheet = ["assets/creeps2/1.png", "assets/creeps2/2.png", "assets/creeps2/3.png", "assets/creeps2/4.png"];
  return this.createEnemy(x, y, spriteSheet, 2);
}

function makeCreateCreep3(x, y) {
  var spriteSheet = ["assets/creeps3/1.png", "assets/creeps3/2.png", "assets/creeps3/3.png", "assets/creeps3/4.png"];
  return this.createEnemy(x, y, spriteSheet, 6, true);
}

function createEnemy(x, y, spriteSheet, health, flying) {
  //all the event to handle movement
  var playerEvent = new MovingEvents({
    size: {
      x: 50,
      y: 50
    },
    // Size in pixels
    center: {
      x: x,
      y: y
    },
    rotation: 0,
    moveRate: 125 / 1000,
    // Pixels per second
    rotateRate: Math.PI / 1000,
    // Radians per second
    continousSpeed: 50,
    yDirection: 0,
    xDirection: 1
  });
  var timeArray = new Array(spriteSheet.length).fill(25);
  var playerSpecs = {
    spriteSheet: spriteSheet,
    spriteCount: spriteSheet.length,
    spriteTime: timeArray,
    health: health,
    flying: flying
  }; //make a playerModel

  var playerModel = new gameModel(playerSpecs, playerEvent, true);
  return playerModel;
}

var EnemyCreator =
/*#__PURE__*/
function () {
  function EnemyCreator(enemyCount) {
    _classCallCheck(this, EnemyCreator);

    this.animationTime = 0;
    this.totalEnemy = enemyCount;
  }

  _createClass(EnemyCreator, [{
    key: "createEnemy",
    value: function createEnemy(elapsedTime) {
      this.animationTime += elapsedTime;

      if (this.animationTime >= 500) {
        if (this.totalEnemy-- > 0) {
          this.animationTime -= 500;
          var yPosition = generateRandom();
          var kind = Math.floor(Math.random() * 2);

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
  }]);

  return EnemyCreator;
}();
//# sourceMappingURL=enemyCreator.dev.js.map
