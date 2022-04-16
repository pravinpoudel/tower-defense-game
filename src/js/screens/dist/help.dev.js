"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Help =
/*#__PURE__*/
function () {
  function Help(manager) {
    _classCallCheck(this, Help);

    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
  }

  _createClass(Help, [{
    key: "initialize",
    value: function initialize() {
      var self = this;
      console.log("help initialized");
      document.getElementById("id-help-back").addEventListener("click", function () {
        self.manager.showScreen("mainmenu");
      });
    }
  }, {
    key: "run",
    value: function run() {}
  }]);

  return Help;
}();
//# sourceMappingURL=help.dev.js.map
