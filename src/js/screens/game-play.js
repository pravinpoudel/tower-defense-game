class GamePlay {
  constructor(manager, input) {
    this.myKeyboard = input;
    this.lastTimeStamp;
    this.manager = manager;
    this.model = null;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.playerModel = null;
    this.sound = null;
    this.particlesSmoke = null;
    this.registerKey = this.registerKey.bind(this);
  }

  initialize() {
    let self = this;
    self.myKeyboard.register("Escape", function () {
      GameState.cancelNextRequest = true;
      self.manager.showScreen("mainmenu");
    });

    this.particlesSmoke = new ParticleSystem({
      center: { x: 300, y: 300 },
      size: { mean: 10, stdev: 4 },
      speed: { mean: 50, stdev: 25 },
      lifetime: { mean: 4, stdev: 1 },
      left: 100,
      right: 100,
      top: 100,
      bottom: 100,
      image: GameState.assets["fire"],
    });

    this.particlesSmoke.createEffect();

    //all the event to handle movement
    this.playerEvent = new MovingEvents({
      size: { x: 50, y: 50 }, // Size in pixels
      center: { x: 50, y: 150 },
      rotation: 0,
      moveRate: 125 / 1000, // Pixels per second
      rotateRate: Math.PI / 1000, // Radians per second
      continousSpeed: 100,
    });

    // all the specs of the player sprite
    let playerSpecs = {
      spriteSheet: dir + "assets/spritesheet-bird.png",
      spriteCount: 14,
      spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
    };

    //make a playerModel
    self.playerModel = new gameModel(playerSpecs, this.playerEvent, true);
    //register that event to event handler
    self.enemycontroller = new EnemyController(self.playerModel);
    // self.enemycontroller.createEnemy({
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

  processInput(elapsedTime) {
    this.myKeyboard.update(elapsedTime);
  }

  registerKey() {
    let self = this;
    let upgrade = localStorage["upgrade"];
    let sell = localStorage["sell"];
    let start = localStorage["start"];

    self.myKeyboard.register(upgrade, self.playerEvent.moveForward);
    self.myKeyboard.register(sell, self.playerEvent.rotateLeft);
    self.myKeyboard.register(start, self.playerEvent.rotateRight);

    // self.myKeyboard.register("3", playerEvent.runRight);
    // self.myKeyboard.register("1", playerEvent.runLeft);
    // self.myKeyboard.register("5", playerEvent.runTop);
    // self.myKeyboard.register("2", playerEvent.runDown);
  }

  update(elapsedTime) {
    if (GameState.life <= 0) {
      GameState.cancelNextRequest = true;
      this.particlesSmoke.update(elapsedTime);
      return;
    }
    this.playerModel.update(elapsedTime);
    // this.enemycontroller.update(elapsedTime);
    // model.update(elapsedTime);
  }

  renderScore() {
    document.getElementById("currentScore").innerHTML = score;
    document.getElementById("lives").innerHTML = GameState.life;
  }

  render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.renderScore();
    this.playerModel.render();
  }

  run() {
    let self = this;
    this.sound = new Sound();
    this.sound.loadAudio();
    this.sound.playSound("end");
    this.registerKey();

    this.myKeyboard.register("ArrowUp", self.playerModel.player.moveTop);
    this.myKeyboard.register("ArrowDown", self.playerModel.player.moveDown);
    this.myKeyboard.register("ArrowLeft", self.playerModel.player.moveLeft);
    this.myKeyboard.register("ArrowRight", self.playerModel.player.moveRight);
    // console.log(self.playerModel.moveRight);

    let lastTimeStamp = performance.now();
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
}
