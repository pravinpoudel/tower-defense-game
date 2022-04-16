"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HighScore =
/*#__PURE__*/
function () {
  function HighScore() {
    _classCallCheck(this, HighScore);

    this.scores = [];
    this.previousScores = localStorage.getItem(Constants.StorageName);

    if (this.previousScores) {
      this.scores = JSON.parse(this.previousScores);
    }
  }

  _createClass(HighScore, [{
    key: "add",
    value: function add(score) {
      this.scores.push(score);
      this.scores.sort(function (a, b) {
        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        }

        return 0;
      });

      if (this.scores.length > Constants.MaxScoreCount) {
        this.scores = this.scores.slice(0, Constants.MaxScoreCount);
      }

      localStorage[ConstantSourceNode.StorageName] = JSON.stringify(scores);
    }
  }, {
    key: "getScore",
    value: function getScore() {
      return this.scores;
    }
  }]);

  return HighScore;
}();
//# sourceMappingURL=highscore.dev.js.map
