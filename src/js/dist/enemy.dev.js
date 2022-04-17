"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(spec) {
    _classCallCheck(this, Enemy);

    this.alive = true;
    this.width = Math.trunc(7 / 100 * canvas.width);
    this.left = spec.position.left;
    this.right = spec.position.left + this.width;
    this.top = spec.position.top;
    this.bottom = spec.position.top + Constants.BrickHeight;
    this.score = spec.score;
  }

  _createClass(Enemy, [{
    key: "doesIntersect",
    value: function doesIntersect(gameObject) {
      var intersect = false;

      if (this.alive) {
        // if there is another enemy as well and is collided with other
        //we dont care
        if (!gameObject.collided && isColliding(this, gameObject)) {
          this.alive = false;
          intersect = true;
        }
      }

      gameObject.collided = intersect;
      return intersect;
    }
  }, {
    key: "update",
    value: function update() {//if anything is needed to be updated
    }
  }, {
    key: "render",
    value: function render() {
      if (this.alive) {
        drawRectangle({
          x: that.left,
          y: that.top,
          width: brickWidth,
          height: Constants.BrickHeight,
          fill: spec.color,
          stroke: "rgba(0, 0, 0, 1)"
        });
      }
    }
  }]);

  return Enemy;
}();
//# sourceMappingURL=enemy.dev.js.map
