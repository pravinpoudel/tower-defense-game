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
    this.cancelNextRequest = false;
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
        cancelNextRequest = true;
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
      self.myKeyboard.update(elapsedTime);
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      playerModel.update(elapsedTime); // model.update(elapsedTime);
    }
  }, {
    key: "render",
    value: function render() {
      console.log("i am rendering");
      playerModel.render(); //draw things
      // graphics.clear();
      // renderGame(model, graphics); // draw background, obstacles, scene and player here
    }
  }, {
    key: "gameLoop",
    value: function (_gameLoop) {
      function gameLoop(_x) {
        return _gameLoop.apply(this, arguments);
      }

      gameLoop.toString = function () {
        return _gameLoop.toString();
      };

      return gameLoop;
    }(function (time) {
      processInput(time - lastTimeStamp);
      update(time - lastTimeStamp);
      lastTimeStamp = time;
      render();

      if (!cancelNextRequest) {
        requestAnimationFrame(gameLoop);
      }
    })
  }, {
    key: "run",
    value: function run() {
      //create player
      model = GameModel();
      myKeyboard.registerCommand("ArrowUp", model.turnUp);
      myKeyboard.registerCommand("ArrowDown", model.turnDown);
      myKeyboard.registerCommand("ArrowLeft", model.turnLeft);
      myKeyboard.registerCommand("ArrowRight", model.turnRight);
      lastTimeStamp = performance.now();
      cancelNextRequest = false;
      requestAnimationFrame(gameLoop);
    }
  }]);

  return GamePlay;
}();
//# sourceMappingURL=game-play.dev.js.map
