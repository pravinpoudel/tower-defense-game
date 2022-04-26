"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sprite =
/*#__PURE__*/
function () {
  function Sprite(specs) {
    _classCallCheck(this, Sprite);

    this.specs = specs;
    this.image = specs.sprite;
    this.imageLoaded = false;
    this.rotateRight = this.rotateRight.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.draw = this.draw.bind(this);
    this.drawArc = this.drawArc.bind(this);
  }

  _createClass(Sprite, [{
    key: "rotateRight",
    value: function rotateRight(angle) {
      this.specs.rotation += angle;
    }
  }, {
    key: "rotateLeft",
    value: function rotateLeft(angle) {
      this.specs.rotation -= angle;
    }
  }, {
    key: "draw",
    value: function draw() {
      var self = this;
      self.specs.height = self.image.height;
      self.specs.width = self.image.width / this.specs.spriteCount;
      context.save();
      context.translate(self.specs.center.x, self.specs.center.y);
      context.rotate(self.specs.rotation);
      context.translate(-self.specs.center.x, -self.specs.center.y);
      context.drawImage(self.image, self.specs.center.x - self.image.width / 2, self.specs.center.y - self.image.height / 2, self.image.width, self.image.height);
      context.restore();
    }
  }, {
    key: "drawArc",
    value: function drawArc(angle) {
      context.fillStyle = "rgba(255, 0, 0, 0.5)";
      context.beginPath();
      context.moveTo(this.specs.center.x, this.specs.center.y);
      context.arc(this.specs.center.x, this.specs.center.y, 100, this.specs.rotation - angle / 2, this.specs.rotation + angle / 2);
      context.lineTo(this.specs.center.x, this.specs.center.y);
      context.fill();
    }
  }]);

  return Sprite;
}();
//# sourceMappingURL=sprite.dev.js.map
