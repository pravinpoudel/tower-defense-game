class GamePlay {
  constructor(manager, input) {
    this.myKeyboard = input;
    this.cancelNextRequest = false;
    this.lastTimeStamp;
    this.manager = manager;
    this.model = null;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.playerModel = null;
  }

  initialize() {
    let self = this;
    self.myKeyboard.register("Escape", function () {
      cancelNextRequest = true;
      self.manager.showScreen("mainmenu");
    });

    let player = new MovingObject({
      size: { x: 50, y: 50 }, // Size in pixels
      center: { x: 50, y: 150 },
      rotation: 0,
      moveRate: 125 / 1000, // Pixels per second
      rotateRate: Math.PI / 1000, // Radians per second
    });

    let playerSpecs = {
      spriteSheet: "assets/spritesheet-bird.png",
      spriteCount: 14,
      spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
    };

    self.playerModel = new ModelAnimation(playerSpecs, player);
    self.myKeyboard.register("w", player.moveForward);
    self.myKeyboard.register("a", player.rotateLeft);
    self.myKeyboard.register("d", player.rotateRight);
  }

  processInput(elapsedTime) {
    console.log("input pressed");
    self.myKeyboard.update(elapsedTime);
  }

  update(elapsedTime) {
    this.playerModel.update(elapsedTime);
    // model.update(elapsedTime);
  }

  render() {
    console.log("i am rendering");
    this.playerModel.render();
    //draw things
    // graphics.clear();
    // renderGame(model, graphics); // draw background, obstacles, scene and player here
  }

  run() {
    let self = this;
    this.myKeyboard.register("ArrowUp", self.playerModel.turnUp);
    this.myKeyboard.register("ArrowDown", self.playerModel.turnDown);
    this.myKeyboard.register("ArrowLeft", self.playerModel.turnLeft);
    this.myKeyboard.register("ArrowRight", self.playerModel.turnRight);

    lastTimeStamp = performance.now();
    this.cancelNextRequest = false;

    function gameLoop(time) {
      processInput(time - lastTimeStamp);
      update(time - lastTimeStamp);
      lastTimeStamp = time;
      render();
      if (!cancelNextRequest) {
        requestAnimationFrame(gameLoop);
      }
    }
    requestAnimationFrame(gameLoop);
  }
}
