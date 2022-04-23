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
    this.loadedImage = 0;
    this.secondTime = false;
    this.images = [];
    this.index = 0;
    specs.spriteSheet.forEach(function (src) {
      var image = new Image();
      image.src = src;

      image.onload = function () {
        _this.loadedImage++;
        if (_this.loadedImage == _this.specs.spriteCount) _this.isReady = true;
      };

      _this.images.push(image);
    }); // this.image.src = this.specs.spriteSheet;

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
    key: "drawSubTexture",
    value: function drawSubTexture(image, index, subTextureWidth, center, rotation, size) {
      context.save();
      context.translate(center.x, center.y);
      context.rotate(rotation);
      context.translate(-center.x, -center.y); // context.drawImage(image, this.x, this.y, image.width, image.height);

      context.drawImage(image, center.x - image.width / 2, // Where to draw the sub-texture
      center.y - image.height / 2, image.width, image.height);
      context.restore();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isReady) {
        var image = this.images[this.subImageIndex];
        this.drawSubTexture(image, this.subImageIndex, this.subTextureWidth, this.player.specs.center, this.player.specs.rotation, this.player.specs.size);
        this.secondTime = true;
      }
    }
  }]);

  return gameModel;
}();
//# sourceMappingURL=gameModel.dev.js.map
