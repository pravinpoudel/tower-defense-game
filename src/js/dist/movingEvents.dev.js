"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovingEvents =
/*#__PURE__*/
function () {
  function MovingEvents(specs) {
    _classCallCheck(this, MovingEvents);

    this.specs = specs;
    this.moveForward = this.moveForward.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveTop = this.moveTop.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.runTop = this.runTop.bind(this);
    this.runDown = this.runDown.bind(this);
    this.runRight = this.runRight.bind(this);
    this.runLeft = this.runLeft.bind(this);
    this.update = this.update.bind(this);
    this.yDirection = specs.yDirection;
    this.xDirection = specs.xDirection;
  }

  _createClass(MovingEvents, [{
    key: "moveRight",
    value: function moveRight(elapsedTime) {
      this.specs.center.x += this.specs.moveRate * elapsedTime;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(elapsedTime) {
      this.specs.center.x -= this.specs.moveRate * elapsedTime;
    }
  }, {
    key: "moveTop",
    value: function moveTop(elapsedTime) {
      this.specs.center.y -= this.specs.moveRate * elapsedTime;
    }
  }, {
    key: "moveDown",
    value: function moveDown(elapsedTime) {
      this.specs.center.y += this.specs.moveRate * elapsedTime;
    }
  }, {
    key: "runTop",
    value: function runTop(elapsedTime) {
      this.yDirection = -1;
      this.xDirection = 0;
    }
  }, {
    key: "runDown",
    value: function runDown(elapsedTime) {
      this.yDirection = 1;
      this.xDirection = 0;
    }
  }, {
    key: "runRight",
    value: function runRight(elapsedTime) {
      this.xDirection = 1.0;
      this.yDirection = 0;
    }
  }, {
    key: "runLeft",
    value: function runLeft(elapsedTime) {
      this.xDirection = -1.0;
      this.yDirection = 0.0;
    } //gaze direction movement

  }, {
    key: "moveForward",
    value: function moveForward(elapsedTime) {
      var vectorX = Math.cos(this.specs.rotation);
      var vectorY = Math.sin(this.specs.rotation);
      this.specs.center.x += vectorX * this.specs.moveRate * elapsedTime;
      this.specs.center.y += vectorY * this.specs.moveRate * elapsedTime; //limiting the movement in each direction
      //  this.specs.center.x =
      //     this.specs.center.x >= canvas.clientWidth - 50
      //       ? canvas.clientWidth - 50
      //       : this.specs.center.x;
      //   this.specs.center.x = this.specs.center.x <= 10 ? 10 : this.specs.center.x;
      //   this.specs.center.y =
      //     this.specs.center.y >= canvas.clientHeight - 50
      //       ? canvas.clientHeight - 50
      //       : this.specs.center.x;
      //   this.specs.center.y = this.specs.center.y <= 20 ? 20 : this.specs.center.x;
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
  }, {
    key: "reachRight",
    value: function reachRight() {
      if (this.specs.center.x > canvas.width - this.specs.size.x / 2) {
        return true;
      }
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      if (this.specs.continousSpeed > 0) {
        this.specs.center.x += this.xDirection * this.specs.continousSpeed * elapsedTime * 0.001;
        this.specs.center.y += this.yDirection * this.specs.continousSpeed * elapsedTime * 0.001;
      }

      if (this.specs.center.x < this.specs.size.x / 2) {
        this.specs.center.x = this.specs.size.x / 2;
      } // if (this.specs.center.x > canvas.width - this.specs.size.x / 2) {
      //   this.specs.center.x = canvas.width - this.specs.size.x / 2;
      // }


      if (this.specs.center.y > canvas.height - this.specs.size.y / 2) {
        this.specs.center.y = canvas.height - this.specs.size.y / 2;
      }

      if (this.specs.center.y < this.specs.size.y / 2) {
        this.specs.center.y = this.specs.size.y / 2;
      } // if (that.right > spec.view.width) {
      //   spec.direction.x *= -1;
      // }
      // if (that.left < 0) {
      //   spec.direction.x *= -1;
      // }
      // if (that.top < 0) {
      //   spec.direction.y *= -1;
      // }
      // if (that.bottom > spec.view.height) {
      //   //
      //   // Indicate the ball fell through the bottom
      //   missed = true;
      // }

    }
  }]);

  return MovingEvents;
}();
//# sourceMappingURL=movingEvents.dev.js.map
