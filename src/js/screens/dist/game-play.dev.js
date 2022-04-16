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
  }

  _createClass(GamePlay, [{
    key: "initialize",
    value: function initialize() {
      var self = this;
      self.myKeyboard.register("Escape", function () {
        GameState.cancelNextRequest = true;
        self.manager.showScreen("mainmenu");
      });
      var player = new MovingObject({
        size: {
          x: 50,
          y: 50
        },
        // Size in pixels
        center: {
          x: 50,
          y: 150
        },
        rotation: 0,
        moveRate: 125 / 1000,
        // Pixels per second
        rotateRate: Math.PI / 1000 // Radians per second

      });
      var playerSpecs = {
        spriteSheet: "assets/spritesheet-bird.png",
        spriteCount: 14,
        spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
      };
      self.playerModel = new ModelAnimation(playerSpecs, player);
      self.myKeyboard.register("w", player.moveForward);
      self.myKeyboard.register("a", player.rotateLeft);
      self.myKeyboard.register("d", player.rotateRight);
    }
  }, {
    key: "processInput",
    value: function processInput(elapsedTime) {
      console.log("input pressed");
      this.myKeyboard.update(elapsedTime);
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      this.playerModel.update(elapsedTime); // model.update(elapsedTime);
    }
  }, {
    key: "render",
    value: function render() {
      console.log("i am rendering");
      this.playerModel.render(); //draw things
      // graphics.clear();
      // renderGame(model, graphics); // draw background, obstacles, scene and player here
    }
  }, {
    key: "run",
    value: function run() {
      var self = this;
      this.myKeyboard.register("ArrowUp", self.playerModel.turnUp);
      this.myKeyboard.register("ArrowDown", self.playerModel.turnDown);
      this.myKeyboard.register("ArrowLeft", self.playerModel.turnLeft);
      this.myKeyboard.register("ArrowRight", self.playerModel.turnRight);
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
