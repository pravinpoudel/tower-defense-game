"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Projection =
/*#__PURE__*/
function () {
  function Projection(x, y, direction, power) {
    _classCallCheck(this, Projection);

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.width = 10;
    this.height = 10;
    this.power = power;
    this.speed = 50;
  }

  _createClass(Projection, [{
    key: "update",
    value: function update() {
      this.target;
      this.x += this.direction.x * this.speed * timeStamp * 0.0001;
      this.y += this.direction.y * this.speed * timeStamp * 0.0001;
    }
  }, {
    key: "draw",
    value: function draw() {
      context.fillStyle = "black";
      context.beginPath();
      context.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      context.fill();
    }
  }]);

  return Projection;
}();
//# sourceMappingURL=projection.dev.js.map
