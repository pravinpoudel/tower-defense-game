"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bullet =
/*#__PURE__*/
function () {
  function Bullet(x, y, creep, power, type) {
    _classCallCheck(this, Bullet);

    this.x = x;
    this.y = y;
    this.direction = null;
    this.width = 2;
    this.height = 2;
    this.radius = 5;
    this.power = power;
    this.type = type;
    this.speed = 200;
    this.targetCreep = creep;
    this.findDirection = this.findDirection.bind(this);
  }

  _createClass(Bullet, [{
    key: "findDirection",
    value: function findDirection() {
      var self = this;
      var direction = {
        x: self.targetCreep.player.specs.center.x - self.x,
        y: self.targetCreep.player.specs.center.y - self.y
      };
      self.direction = normalize(direction);

      if (this.type == 2 || this.type == 3) {
        console.log(self.x, self.y, self.direction.x, self.direction.y);
        trailFollow(self.x, self.y, self.direction.x, self.direction.y);
      }
    }
  }, {
    key: "update",
    value: function update(timeStamp) {
      this.findDirection();
      this.x += this.direction.x * this.speed * timeStamp * 0.001;
      this.y += this.direction.y * this.speed * timeStamp * 0.001;
    }
  }, {
    key: "draw",
    value: function draw() {
      context.fillStyle = "black";
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    }
  }]);

  return Bullet;
}();
//# sourceMappingURL=bullet.dev.js.map
