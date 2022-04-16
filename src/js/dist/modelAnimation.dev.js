"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModelAnimation =
/*#__PURE__*/
function () {
  function ModelAnimation(specs, player) {
    var _this = this;

    _classCallCheck(this, ModelAnimation);

    this.specs = specs;
    this.player = player;
    this.animationTime = 0;
    this.subImageIndex = 0;
    this.subTextureWidth = 0;
    this.image = new Image();
    this.isReady = false;
    this.secondTime = false;

    this.image.onload = function () {
      _this.isReady = true;
      _this.subTextureWidth = _this.image.width / _this.specs.spriteCount;
    };

    this.image.src = this.specs.spriteSheet;
  }

  _createClass(ModelAnimation, [{
    key: "update",
    value: function update(elapsedTime) {
      this.animationTime += elapsedTime;

      if (this.animationTime >= this.specs.spriteTime[this.subImageIndex]) {
        this.animationTime -= this.specs.spriteTime[this.subImageIndex];
        this.subImageIndex += 1;
        this.subImageIndex = this.subImageIndex % this.specs.spriteCount;
      }
    }
  }, {
    key: "drawTexture",
    value: function drawTexture(image, center, rotation, size) {
      context.translate(center.x, center.y);
      context.rotate(rotation);
      context.translate(-center.x, -center.y);
      context.drawImage(image, center.x - size.x / 2, center.y - size.y / 2, size.x, size.y);
      context.restore();
    }
  }, {
    key: "drawSubTexture",
    value: function drawSubTexture(image, index, subTextureWidth, center, rotation, size) {
      context.save();
      context.translate(center.x, center.y);
      context.rotate(rotation);
      context.translate(-center.x, -center.y);
      context.drawImage(image, subTextureWidth * index, 0, // Which sub-texture to pick out
      subTextureWidth, image.height, // The size of the sub-texture
      center.x - size.x / 2, // Where to draw the sub-texture
      center.y - size.y / 2, size.x, size.y);
      context.restore();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isReady) {
        this.drawSubTexture(context, this.image, this.subImageIndex, this.subTextureWidth, this.player.specs.center, this.player.specs.rotation, this.player.specs.size);
        this.secondTime = true;
      }
    }
  }]);

  return ModelAnimation;
}();
//# sourceMappingURL=modelAnimation.dev.js.map
