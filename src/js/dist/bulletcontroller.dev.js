"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BulletController =
/*#__PURE__*/
function () {
  function BulletController(enemies) {
    _classCallCheck(this, BulletController);

    this.bullets = [];
    this.enemies = enemies;
  }

  _createClass(BulletController, [{
    key: "addBullet",
    value: function addBullet(bulletStartX, bulletStartY, creep, power, type) {
      this.bullets.push(new Bullet(bulletStartX, bulletStartY, creep, power, type));
    }
  }, {
    key: "update",
    value: function update(timeStamp) {
      console.log(this.enemies.length);
      var bulletLength = this.bullets.length;

      for (var i = 0; i < bulletLength; i++) {
        if (this.bullets[i]) {
          if (this.bullets[i].x < 0 || this.bullets[i].x > canvas.width || this.bullets[i].y < 0 || this.bullets[i].y > canvas.height) {
            this.bullets.splice(i, 1);
            continue;
          }

          if (isColliding2(this.bullets[i].x, this.bullets[i].y, 5, this.bullets[i].targetCreep.player.specs.center.x, this.bullets[i].targetCreep.player.specs.center.y, Math.floor(this.bullets[i].targetCreep.player.specs.size.x / 2))) {
            //it is not bomb
            if (this.bullets[i].type == 1) {
              this.bullets[i].targetCreep.health -= this.bullets[i].power;

              if (this.bullets[i].targetCreep.health < 0) {
                this.bullets[i].targetCreep.health = 0;
              }
            } //if guided missile; affect in radius of "bombAffectRadius"


            if (this.bullets[i].type == 2) {
              var enemiesLength = this.enemies.length;

              for (var m = 0; m < enemiesLength; m++) {
                if (isColliding2(this.bullets[i].x, this.bullets[i].y, bombAffectRadius, this.enemies[m].player.specs.center.x, this.enemies[m].player.specs.center.y, Math.floor(this.enemies[m].player.specs.size.x / 2))) {
                  console.log("i am collided with", m);
                  this.enemies[m].health -= this.bullets[i].power;
                  this.enemies[m].health = this.enemies[m].health < 0 ? 0 : this.enemies[m].health;
                }
              }
            }

            if (this.bullets[i].type == 3) {
              var _enemiesLength = this.enemies.length;

              for (var _m = 0; _m < _enemiesLength; _m++) {
                // if(enemy is flyover)
                console.log(this.enemies[_m].flying);

                if (this.enemies[_m].flying) {
                  isColliding2(this.bullets[i].x, this.bullets[i].y, 5, this.enemies[_m].player.specs.center.x, this.enemies[_m].player.specs.center.y, Math.floor(this.enemies[_m].player.specs.size.x / 2));
                  {
                    console.log("i am collided with", _m);
                    this.enemies[_m].health -= this.bullets[i].power;
                    this.enemies[_m].health = this.enemies[_m].health < 0 ? 0 : this.enemies[_m].health;
                  }
                }
              }
            }

            this.bullets.splice(i, 1);
            i--;
            bulletLength--;
            continue;
          }
        }

        this.bullets[i].update(timeStamp);
      } //if inside the boundary

    }
  }, {
    key: "render",
    value: function render() {
      this.bullets.forEach(function (bullet) {
        bullet.draw();
      });
    }
  }]);

  return BulletController;
}();
//# sourceMappingURL=bulletcontroller.dev.js.map
