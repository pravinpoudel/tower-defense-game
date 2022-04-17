"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var gameModel =
/*#__PURE__*/
function () {
  function gameModel(specs, playerEvent, continousMotion) {
    var _this = this;

    _classCallCheck(this, gameModel);

    this.specs = specs;
    this.player = playerEvent;
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
    this.continousMotion = continousMotion;
    this.collided = false;
  }

  _createClass(gameModel, [{
    key: "update",
    value: function update(elapsedTime) {
      this.animationTime += elapsedTime;

      if (this.animationTime >= this.specs.spriteTime[this.subImageIndex]) {
        this.animationTime -= this.specs.spriteTime[this.subImageIndex];
        this.subImageIndex += 1;
        this.subImageIndex = this.subImageIndex % this.specs.spriteCount;
      }

      if (this.continousMotion) {
        this.player.update(elapsedTime);
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
        this.drawSubTexture(this.image, this.subImageIndex, this.subTextureWidth, this.player.specs.center, this.player.specs.rotation, this.player.specs.size);
        this.secondTime = true;
      }
    }
  }]);

  return gameModel;
}();
//# sourceMappingURL=gameModel.dev.js.map
