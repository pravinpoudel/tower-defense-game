"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tower =
/*#__PURE__*/
function () {
  function Tower(spec) {
    _classCallCheck(this, Tower);

    this.specs = spec;
    this.baseSprite = new Sprite({
      sprite: spec.baseSprite,
      center: spec.center,
      rotation: 0
    });
    this.weaponSprite = new Sprite({
      sprite: spec.weaponSprite,
      center: spec.center,
      rotation: 0
    });
    this.specs.rotation = 0;
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.setTarget = this.setTarget.bind(this);
  }

  _createClass(Tower, [{
    key: "setTarget",
    value: function setTarget(x, y) {
      this.spec.target = {
        x: x,
        y: y
      };
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      var result = computeAngle(this.specs.rotation, this.specs.center, this.specs.target);

      if (testTolerance(result.angle, 0, 0.01) === false) {
        if (result.crossProduct > 0) {
          this.weaponSprite.rotateRight(this.specs.rotateRate);
          this.specs.rotation += this.specs.rotateRate;
        } else {
          this.weaponSprite.rotateLeft(this.specs.rotateRate);
          this.specs.rotation -= this.specs.rotateRate;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.baseSprite.draw();
      this.weaponSprite.draw(); // A little hack job to show something interesting.

      this.weaponSprite.drawArc(0.4);
    }
  }]);

  return Tower;
}();
//# sourceMappingURL=tower.dev.js.map
