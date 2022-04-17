"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard =
/*#__PURE__*/
function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this.keys = {};
    this.handlers = {};
    this.keyPress = this.keyPress.bind(this);
    this.keyRelease = this.keyRelease.bind(this);
    this.register = this.register.bind(this);
    window.addEventListener("keydown", this.keyPress);
    window.addEventListener("keyup", this.keyRelease);
  }

  _createClass(Keyboard, [{
    key: "keyPress",
    value: function keyPress(e) {
      this.keys[e.key] = true;
    }
  }, {
    key: "keyRelease",
    value: function keyRelease(e) {
      delete this.keys[e.key];
    }
  }, {
    key: "register",
    value: function register(key, handler) {
      this.handlers[key] = handler;
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      for (var key in this.keys) {
        if (this.keys.hasOwnProperty(key)) {
          if (this.handlers[key]) {
            this.handlers[key](elapsedTime);
          } else {
            console.warn("".concat(key, " does not have handler registered for it"));
          }
        }
      }
    }
  }]);

  return Keyboard;
}();
//# sourceMappingURL=input.dev.js.map
