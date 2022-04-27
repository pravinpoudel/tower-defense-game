"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HighScoreMenu =
/*#__PURE__*/
function () {
  function HighScoreMenu(manager) {
    _classCallCheck(this, HighScoreMenu);

    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.displayScore = this.displayScore.bind(this);
  }

  _createClass(HighScoreMenu, [{
    key: "initialize",
    value: function initialize() {
      var self = this;
      document.getElementById("id-high-scores-back").addEventListener("click", function () {
        self.manager.showScreen("mainmenu");
      });
    }
  }, {
    key: "displayScore",
    value: function displayScore() {
      var highScoresHTML = document.getElementById("high-scores-list");
      highScoresHTML.innerHTML = "";
      console.log(scores);

      if (scores.length > 0) {
        scores.forEach(function (score) {
          highScoresHTML.innerHTML += score + "<br/>";
        });
      }
    }
  }, {
    key: "run",
    value: function run() {
      this.displayScore();
    }
  }]);

  return HighScoreMenu;
}();
//# sourceMappingURL=highscores.dev.js.map
