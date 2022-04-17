"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EnemyController =
/*#__PURE__*/
function () {
  function EnemyController(spec) {
    _classCallCheck(this, EnemyController);

    this.enemies = [];
    this.top = 50 + 8 * 15;
    this.createRow = this.createRow.bind(this);
    this.thoseHit = [];
    this.doesIntersectintersect = this.doesIntersectintersect.bind(this);
    this.render = this.render.bind(this);
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
      var length = this.enemies.length;

      for (var i = 0; i < length; i++) {
        if (doesIntersectintersect(this.enemies[i], gameObject)) ;

        for (brick = 0; brick < bricksHit.length; brick += 1) {
          score += this.bricksHit[brick].score;
        }
      }

      if (this.thoseHit.length > 0) {}
    }
  }, {
    key: "render",
    value: function render() {
      var row, brick;

      for (row = 0; row < bricks.length; row += 1) {
        for (brick = 0; brick < bricks[row].length; brick += 1) {
          bricks[row][brick].render();
        }
      }
    }
  }]);

  return EnemyController;
}(); //code to make this row


createRow(top, 1, "rgba(255, 255, 0, 1)");
createRow(bricks[0][0].top - Constants.BrickHeight, 1, "rgba(255, 255, 0, 1)");
createRow(bricks[1][0].top - Constants.BrickHeight, 2, "rgba(255, 165, 0, 1)");
createRow(bricks[2][0].top - Constants.BrickHeight, 2, "rgba(255, 165, 0, 1)");
createRow(bricks[3][0].top - Constants.BrickHeight, 3, "rgba(0, 0, 255, 1)");
createRow(bricks[4][0].top - Constants.BrickHeight, 3, "rgba(0, 0, 255, 1)");
createRow(bricks[5][0].top - Constants.BrickHeight, 5, "rgba(0, 255, 0, 1)");
createRow(bricks[6][0].top - Constants.BrickHeight, 5, "rgba(0, 255, 0, 1)");
//# sourceMappingURL=enemyController.dev.js.map
