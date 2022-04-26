"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function makeCreateCreep1(x, y, xDirection, yDirection) {
  var spriteSheet = ["creep10", "creep11", "creep12", "creep13", "creep14", "creep15"];
  return this.createEnemy(x, y, xDirection, yDirection, spriteSheet, 4);
}

function makeCreateCreep2(x, y, xDirection, yDirection) {
  var spriteSheet = ["creep20", "creep21", "creep22", "creep23"];
  return this.createEnemy(x, y, xDirection, yDirection, spriteSheet, 2);
}

function makeCreateCreep3(x, y, xDirection, yDirection) {
  var spriteSheet = ["creep30", "creep31", "creep32", "creep33"];
  return this.createEnemy(x, y, xDirection, yDirection, spriteSheet, 6, true);
}

function createEnemy(x, y, xDirection, yDirection, spriteSheet, health, flying) {
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
    rotation: yDirection == 1 ? Math.PI / 2 : 0,
    moveRate: 125 / 1000,
    // Pixels per second
    rotateRate: Math.PI / 1000,
    // Radians per second
    continousSpeed: 50,
    yDirection: yDirection,
    xDirection: xDirection
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
  function EnemyCreator(enemyCount, position, kind) {
    _classCallCheck(this, EnemyCreator);

    this.animationTime = 0;
    this.totalEnemy = enemyCount;
    this.position = position;
    this.kind = kind;
  }

  _createClass(EnemyCreator, [{
    key: "createEnemy",
    value: function createEnemy(elapsedTime) {
      this.animationTime += elapsedTime;

      if (this.animationTime >= 500) {
        if (this.totalEnemy-- > 0) {
          this.animationTime -= 500;
          var xPosition = 25,
              xDirection = 0;
          var yPosition = 225,
              yDirection = 0;

          if (this.position == "left") {
            yPosition = generateRandom() * 50 + 225;
            xDirection = 1;
          }

          if (this.position == "top") {
            xPosition = generateRandom() * 50;
            yDirection = 1;
          }

          var kind = Math.floor(Math.random() * (this.kind - 1)) + 1;

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
  }]);

  return EnemyCreator;
}();
//# sourceMappingURL=enemyCreator.dev.js.map
