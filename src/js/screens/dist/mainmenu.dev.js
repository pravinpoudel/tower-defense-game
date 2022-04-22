"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MainMenu =
/*#__PURE__*/
function () {
  function MainMenu(manager) {
    _classCallCheck(this, MainMenu);

    console.log(manager);
    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
  }

  _createClass(MainMenu, [{
    key: "initialize",
    value: function initialize() {
      var self = this;
      document.getElementById("id-new-game").addEventListener("click", function () {
        self.manager.showScreen("gameplay");
      });
      document.getElementById("id-high-scores").addEventListener("click", function () {
        self.manager.showScreen("highscores");
      });
      document.getElementById("id-control").addEventListener("click", function () {
        self.manager.showScreen("control");
      });
      document.getElementById("id-help").addEventListener("click", function () {
        self.manager.showScreen("help");
      }); // document
      //   .getElementById("id-new-game")
      //   .addEventListener("click", function () {
      //     self.manager.showScreen("mainmenu");
      //   });

      document.getElementById("id-about").addEventListener("click", function () {
        self.manager.showScreen("about");
      });
    }
  }, {
    key: "run",
    value: function run() {}
  }]);

  return MainMenu;
}();
//# sourceMappingURL=mainmenu.dev.js.map
