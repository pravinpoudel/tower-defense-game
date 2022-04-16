"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameObject =
/*#__PURE__*/
function () {
  function GameObject(spec) {
    _classCallCheck(this, GameObject);

    this.spec = spec;
  }

  _createClass(GameObject, [{
    key: "moveForward",
    value: function moveForward(elapsedTime) {
      var vectorX = Math.cos(spec.rotation);
      var vectorY = Math.sin(spec.rotation);
      spec.center.x += vectorX * spec.moveRate * elapsedTime;
      spec.center.y += vectorY * spec.moveRate * elapsedTime;
    }
  }, {
    key: "rotateLeft",
    value: function rotateLeft(elapsedTime) {
      spec.rotation -= spec.rotateRate * elapsedTime;
    }
  }, {
    key: "rotateRight",
    value: function rotateRight(elapsedTime) {
      spec.rotation += spec.rotateRate * elapsedTime;
    }
  }]);

  return GameObject;
}();
//# sourceMappingURL=gameobject.dev.js.map
