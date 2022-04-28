"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Level =
/*#__PURE__*/
function () {
  function Level(enemyCreators) {
    _classCallCheck(this, Level);

    this.wave = -1;
    this.enemyCreators = enemyCreators;
  }

  _createClass(Level, [{
    key: "sendNextWave",
    value: function sendNextWave() {
      this.wave++;
      return this.enemyCreators[this.wave];
    }
  }]);

  return Level;
}();

var levels = null;

function createLevels() {
  levels = [new Level([new EnemyCreator(2, "left", 3, 50), new EnemyCreator(2, "left", 3, 50), new EnemyCreator(2, "left", 3, 50)]), new Level([new EnemyCreator(2, "top", 2, 70), new EnemyCreator(2, "top", 2, 70), new EnemyCreator(2, "top", 2, 70)]), new Level([new EnemyCreator(2, "left", 3, 100), new EnemyCreator(2, "top", 3, 100), new EnemyCreator(1, "left", 3, 100)])];
}
//# sourceMappingURL=level.dev.js.map
