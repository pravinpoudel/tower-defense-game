"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EnemyController =
/*#__PURE__*/
function () {
  function EnemyController(player) {
    _classCallCheck(this, EnemyController);

    this.enemies = [];
    this.player = player;
    this.render = this.render.bind(this);
    this.createEnemy = this.createEnemy.bind(this);
  }

  _createClass(EnemyController, [{
    key: "createEnemy",
    value: function createEnemy(positionX, positionY, score) {
      var enemy = new Enemy(positionX, positionY, score);
      this.enemies.push(enemy);
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      var _this = this;

      if (this.enemies.length == 0) {
        // GameState.cancelNextRequest = true;
        // add(score);
        return;
      }

      this.enemies.forEach(function (enemy, index) {
        if (enemy.y > canvas.height - enemy.height || enemy.x > canvas.width - enemy.width || enemy.x < enemy.width || enemy.y < enemy.height) {
          _this.enemies.splice(index, 1);

          return;
        }

        if (isColliding(_this.enemies[i], _this.player)) {
          score += _this.enemies[i].score; //play sound

          console.log("collieded with game object");
          GameState.cancelNextRequest = true;

          _this.enemies.splice(index, 1);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      for (var _i = 0; _i < this.enemies.length; _i += 1) {
        this.enemies[_i].render();
      }
    }
  }]);

  return EnemyController;
}();
//# sourceMappingURL=enemyController.dev.js.map
