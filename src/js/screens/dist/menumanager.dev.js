"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Manager =
/*#__PURE__*/
function () {
  function Manager() {
    _classCallCheck(this, Manager);

    this.initialize = this.initialize.bind(this);
    this.showScreen = this.showScreen.bind(this);
  }

  _createClass(Manager, [{
    key: "showScreen",
    value: function showScreen(id) {
      var screen = 0;
      var active = null;
      active = document.getElementsByClassName("active");

      for (screen = 0; screen < active.length; screen++) {
        active[screen].classList.remove("active");
      } // if (id == "gameplay") {
      //   GameState.input = new Keyboard();
      //   GameState.screens["gameplay"] = new GamePlay(manager, GameState.input);
      //   GameState.screens["gameplay"].initialize();
      // }


      GameState.screens[id].run();
      document.getElementById(id).classList.add("active");
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var screen = null;
      var self = this;

      for (screen in GameState.screens) {
        if (GameState.screens.hasOwnProperty(screen)) {
          GameState.screens[screen].initialize();
        }
      }

      self.showScreen("mainmenu");
    }
  }]);

  return Manager;
}();
//# sourceMappingURL=menumanager.dev.js.map
