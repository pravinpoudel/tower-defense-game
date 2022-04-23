"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProjectileManager =
/*#__PURE__*/
function () {
  function ProjectileManager(enemies) {
    _classCallCheck(this, ProjectileManager);

    this.projectils = [];
    this.enemies = [];
  }

  _createClass(ProjectileManager, [{
    key: "update",
    value: function update() {
      var projectileLength = this.projectils.length;
      var enemyLength = this.enemies.length;

      for (var i = 0; i < this.projectils.length; i++) {
        this.projectils[i].update();

        for (var j = 0; j < enemyLength; j++) {
          if (enemies[j] && this.projectils[i] && isEnemyColliding(this.projectils[i], this.enemies[j])) {
            enemies[j].health -= this.projectils[i].power;
            this.projectils.splice(i, 1);
          }

          if (this.projectils[i] && this.projectils[i].x > canvas.width - 10) {
            this.projectils.splice(i, 1);
          }
        }
      }
    }
  }]);

  return ProjectileManager;
}();
//# sourceMappingURL=projectileManager.dev.js.map
