"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovingObject =
/*#__PURE__*/
function () {
  function MovingObject(specs) {
    _classCallCheck(this, MovingObject);

    this.specs = specs;
    this.moveForward = this.moveForward.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
  }

  _createClass(MovingObject, [{
    key: "moveForward",
    value: function moveForward(elapsedTime) {
      var vectorX = Math.cos(this.specs.rotation);
      var vectorY = Math.sin(this.specs.rotation);
      this.specs.center.x += vectorX * this.specs.moveRate * elapsedTime;
      this.specs.center.y += vectorY * this.specs.moveRate * elapsedTime;
    }
  }, {
    key: "rotateLeft",
    value: function rotateLeft(elapsedTime) {
      console.log("rotating left");
      this.specs.rotation -= this.specs.rotateRate * elapsedTime;
    }
  }, {
    key: "rotateRight",
    value: function rotateRight(elapsedTime) {
      console.log("rotating right");
      this.specs.rotation += this.specs.rotateRate * elapsedTime;
    }
  }]);

  return MovingObject;
}();
//# sourceMappingURL=player.dev.js.map
