"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlyingScore =
/*#__PURE__*/
function () {
  function FlyingScore(score, playerEvent, continousMotion) {
    _classCallCheck(this, FlyingScore);

    this.player = playerEvent;
    this.score = score;
    this.continousMotion = continousMotion;
    this.animationTime = 0;
    this.isVisible = true;
  }

  _createClass(FlyingScore, [{
    key: "update",
    value: function update(elapsedTime) {
      this.animationTime += elapsedTime;

      if (this.animationTime >= 1000) {
        this.animationTime -= 1000;
        this.isVisible = false;
      }

      if (this.continousMotion) {
        this.player.update(elapsedTime);
      }
    }
  }, {
    key: "render",
    value: function render() {
      context.font = "32px Arial";
      context.fillStyle = "#000000";
      context.fillText(this.score, this.player.specs.center.x, this.player.specs.center.y);
    }
  }]);

  return FlyingScore;
}();
//# sourceMappingURL=text.dev.js.map
