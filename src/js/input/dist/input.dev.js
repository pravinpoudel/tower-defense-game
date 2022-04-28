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
    this.deletedKeys = {};
    this.handlers = {};
    this.releaser = {};
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
      this.deletedKeys[e.key] = true;
      delete this.keys[e.key];
    }
  }, {
    key: "cleanAll",
    value: function cleanAll() {
      this.keys = {};
      this.handlers = {};
    }
  }, {
    key: "register",
    value: function register(key, handler, releaser) {
      this.handlers[key] = handler;
      this.releaser[key] = releaser;
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

      for (var _key in this.deletedKeys) {
        if (this.deletedKeys.hasOwnProperty(_key)) {
          if (this.releaser[_key]) {
            this.releaser[_key](elapsedTime);

            delete this.deletedKeys[_key];
          } else {
            console.warn("".concat(_key, " does not have handler registered for it"));
          }
        }
      }
    }
  }]);

  return Keyboard;
}();
//# sourceMappingURL=input.dev.js.map
