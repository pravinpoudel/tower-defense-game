"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GamePlay =
/*#__PURE__*/
function () {
  function GamePlay(manager, input) {
    _classCallCheck(this, GamePlay);

    this.myKeyboard = input;
    this.myMouse = null;
    this.lastTimeStamp;
    this.manager = manager;
    this.model = null;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.playerModel = null;
    self.wallModel = null;
    this.renderCircle = false;
    this.sound = null;
    this.particlesSmoke = null;
    this.creeps = [makeCreateCreep1(20, 300), makeCreateCreep2(100, 300), makeCreateCreep3(300, 300)];
    this.towers = [];
    this.registerKey = this.registerKey.bind(this);
    this.flyingScores = [];
    this.tower1 = new Image();
    this.tower1.src = "assets/turret/turret-5-3.png";
    this.render = this.render.bind(this);
    this.firstTime = true;
    this.downHandler = this.downHandler.bind(this);
  }

  _createClass(GamePlay, [{
    key: "downHandler",
    value: function downHandler(e, elapsedTime) {
      mouse.isActive = true;

      if (firstTime) {
        console.log("firsttime");
        firstTime = false;
        renderCircle = true;
        mouse.isActive = true;
      } else {
        firstTime = true;
        mouse.isActive = false;
        renderCircle = false;
        this.towers.push(createTower("assets/turret/turret-5-3.png", mouse.x, mouse.y, 1000, 1));
        console.log(this.towers.length);
      }

      var canvasPosition = canvas.getBoundingClientRect();
      mouse.x = e.x;
      mouse.y = e.y;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var self = this;
      this.myMouse = new Mouse();
      self.myKeyboard.register("Escape", function () {
        GameState.cancelNextRequest = true;
        self.manager.showScreen("mainmenu");
      });
      this.bulletController = new BulletController();
      this.towers.push(createTower("assets/turret/turret-5-3.png", 300, 500, 1000, 1));
      this.towers.push(createTower("assets/turret/turret-3-3.png", 600, 500, 2000, 2));
      this.myMouse.register('mousedown', this.downHandler); // this.myMouse.register('mouseup', function(e, elapsedTime) {
      //   mouse.isActive = false;
      // });

      this.myMouse.register('mousemove', function (e, elapsedTime) {
        if (mouse.isActive) {
          var canvasPosition = canvas.getBoundingClientRect();
          mouse.x = e.clientX - canvasPosition.left;
          mouse.y = e.clientY;
          this.renderCircle = true;
        }
      });
    }
  }, {
    key: "processInput",
    value: function processInput(elapsedTime) {
      this.myKeyboard.update(elapsedTime);
      this.myMouse.update(elapsedTime);
    }
  }, {
    key: "registerKey",
    value: function registerKey() {
      var self = this;
      var upgrade = localStorage["upgrade"];
      var sell = localStorage["sell"];
      var start = localStorage["start"];
      self.myKeyboard.cleanAll();
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      if (GameState.life <= 0) {
        GameState.cancelNextRequest = true;
        this.particlesSmoke.update(elapsedTime);
        return;
      }

      var creepsLength = this.creeps.length;

      for (var i = 0; i < creepsLength; i++) {
        var creep = this.creeps[i];

        if (creep) {
          if (creep.health == 0) {
            var x = creep.player.specs.center.x;
            var y = creep.player.specs.center.y;
            this.creeps.splice(i, 1);
            var textEvent = new MovingEvents({
              size: {
                x: 50,
                y: 50
              },
              // Size in pixels
              center: {
                x: x,
                y: y
              },
              rotation: 0,
              moveRate: 125 / 1000,
              // Pixels per second
              rotateRate: Math.PI / 1000,
              // Radians per second
              continousSpeed: 50,
              yDirection: -1,
              xDirection: 0
            });
            this.flyingScores.push(new FlyingScore("10", textEvent, true));
            continue;
          }

          creep.update(elapsedTime);
          var towersLength = this.towers.length;

          for (var _i = 0; _i < towersLength; _i++) {
            var tower = this.towers[_i];

            if (isColliding(creep, tower, 200)) {
              tower.setTarget(creep.player.specs.center.x, creep.player.specs.center.y);

              if (tower.canShoot) {
                var direction = {
                  x: tower.specs.target.x - tower.specs.center.x,
                  y: tower.specs.target.y - tower.specs.center.y
                };
                direction = normalize(direction);
                var bulletStartX = tower.specs.center.x;
                var bulletStartY = tower.specs.center.y;
                this.bulletController.addBullet(bulletStartX, bulletStartY, creep, tower.specs.power);
              }
            }

            tower.update(elapsedTime);
          }
        }
      }

      this.bulletController.update(elapsedTime);
      var scorelength = this.flyingScores.length;

      for (var _i2 = 0; _i2 < scorelength; _i2++) {
        this.flyingScores[_i2].update(elapsedTime);

        if (!this.flyingScores[_i2].isVisible) {
          this.flyingScores.splice(_i2, 1);
          _i2--;
          scorelength--;
        }
      }
    }
  }, {
    key: "renderScore",
    value: function renderScore() {
      document.getElementById("currentScore").innerHTML = score;
      document.getElementById("lives").innerHTML = GameState.life;
    }
  }, {
    key: "render",
    value: function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (renderCircle) {
        drawTower(this.tower1, 200);
      }

      this.renderScore();
      this.creeps.forEach(function (creep) {
        creep.render();
      });
      var towersLength = this.towers.length;

      for (var i = 0; i < towersLength; i++) {
        var tower = this.towers[i];
        tower.render();
      }

      this.bulletController.render();
      var scorelength = this.flyingScores.length;

      for (var _i3 = 0; _i3 < scorelength; _i3++) {
        this.flyingScores[_i3].render();
      }
    }
  }, {
    key: "run",
    value: function run() {
      var self = this;
      this.sound = new Sound();
      this.sound.loadAudio();
      this.registerKey(); // this.myKeyboard.register("ArrowUp", self.playerModel.player.moveTop);
      // this.myKeyboard.register("ArrowDown", self.playerModel.player.moveDown);
      // this.myKeyboard.register("ArrowLeft", self.playerModel.player.moveLeft);
      // this.myKeyboard.register("ArrowRight", self.playerModel.player.moveRight);
      // console.log(self.playerModel.moveRight);

      var lastTimeStamp = performance.now();
      GameState.cancelNextRequest = false;

      function gameLoop(time) {
        self.processInput(time - lastTimeStamp);
        self.update(time - lastTimeStamp);
        lastTimeStamp = time;
        self.render();

        if (!GameState.cancelNextRequest) {
          requestAnimationFrame(gameLoop);
        }
      }

      requestAnimationFrame(gameLoop);
    }
  }]);

  return GamePlay;
}();
//# sourceMappingURL=game-play.dev.js.map
