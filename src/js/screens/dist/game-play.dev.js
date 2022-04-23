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
    this.lastTimeStamp;
    this.manager = manager;
    this.model = null;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.playerModel = null;
    self.wallModel = null;
    this.sound = null;
    this.tower = null;
    this.registerKey = this.registerKey.bind(this);
  }

  _createClass(GamePlay, [{
    key: "initialize",
    value: function initialize() {
      var self = this;
      self.myKeyboard.register("Escape", function () {
        GameState.cancelNextRequest = true;
        self.manager.showScreen("mainmenu");
      }); // all the specs of the player sprite

      var playerSpecs = {
        spriteSheet: dir + "assets/spritesheet-bird.png",
        spriteCount: 14,
        spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
      };
      this.wallEvent = new MovingEvents({
        size: {
          x: 50,
          y: 50
        },
        // Size in pixels
        center: {
          x: 250,
          y: 250
        },
        rotation: 0,
        moveRate: 125 / 1000,
        // Pixels per second
        rotateRate: Math.PI / 1000,
        // Radians per second
        continousSpeed: 1
      });
      var wallSpecs = {
        spriteSheet: dir + "assets/spritesheet-bird.png",
        spriteCount: 14,
        spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
      };
      this.tower = new Tower({
        baseSprite: "assets/turret-base.gif",
        weaponSprite: "assets/turret-1-1.png",
        center: {
          x: 500,
          y: 500
        },
        target: {
          x: 300,
          y: 200
        },
        rotateRate: 6 * 3.14159 / 1000 // radians per second

      }); //make a playerModel

      self.playerModel = new gameModel(playerSpecs, this.playerEvent, true);
      self.wallModel = new gameModel(wallSpecs, this.wallEvent, true); //register that event to event handler

      self.enemycontroller = new EnemyController(self.playerModel); // self.enemycontroller.createEnemy({
      //   size: { x: 50, y: 50 }, // Size in pixels
      //   center: { x: 50, y: 150 },
      //   rotation: 0,
      //   moveRate: 125 / 1000,
      //   rotateRate: Math.PI / 1000,
      //   continousSpeed: 100,
      //   image: GameState.assets["bird"],
      //   spriteSheet: dir + "assets/spritesheet-bird.png",
      //   spriteCount: 14,
      //   spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
      // });
    }
  }, {
    key: "processInput",
    value: function processInput(elapsedTime) {
      this.myKeyboard.update(elapsedTime);
    }
  }, {
    key: "registerKey",
    value: function registerKey() {
      var self = this;
      var upgrade = localStorage["upgrade"];
      var sell = localStorage["sell"];
      var start = localStorage["start"];
      self.myKeyboard.cleanAll();
      self.myKeyboard.register(upgrade, self.playerEvent.moveForward);
      self.myKeyboard.register(sell, self.playerEvent.rotateLeft);
      self.myKeyboard.register(start, self.playerEvent.rotateRight); // self.myKeyboard.register("3", playerEvent.runRight);
      // self.myKeyboard.register("1", playerEvent.runLeft);
      // self.myKeyboard.register("5", playerEvent.runTop);
      // self.myKeyboard.register("2", playerEvent.runDown);
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      if (GameState.life <= 0) {
        GameState.cancelNextRequest = true;
        return;
      }

      this.playerModel.update(elapsedTime);
      this.wallModel.update(elapsedTime);
      this.tower.update(elapsedTime);

      if (isColliding(this.playerModel, this.wallModel, 100)) {
        this.sound.playSound("end");
      } // this.enemycontroller.update(elapsedTime);
      // model.update(elapsedTime);

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
      this.renderScore();
      this.playerModel.render();
      this.wallModel.render();
      this.tower.render();
    }
  }, {
    key: "run",
    value: function run() {
      var self = this;
      this.sound = new Sound();
      this.sound.loadAudio();
      this.registerKey();
      this.myKeyboard.register("ArrowUp", self.playerModel.player.moveTop);
      this.myKeyboard.register("ArrowDown", self.playerModel.player.moveDown);
      this.myKeyboard.register("ArrowLeft", self.playerModel.player.moveLeft);
      this.myKeyboard.register("ArrowRight", self.playerModel.player.moveRight); // console.log(self.playerModel.moveRight);

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
