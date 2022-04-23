class GamePlay {
  constructor(manager, input) {
    this.myKeyboard = input;
    this.lastTimeStamp;
    this.manager = manager;
    this.model = null;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.playerModel = null;
    self.wallModel = null;
    this.sound = null;
    this.particlesSmoke = null;
    this.tower = null;
    this.registerKey = this.registerKey.bind(this);
    this.createEnemy = this.createEnemy.bind(this);
  }

  createEnemy(x, y, url) {
    //all the event to handle movement
    let playerEvent = new MovingEvents({
      size: { x: 50, y: 50 }, // Size in pixels
      center: { x: x, y: y },
      rotation: 0,
      moveRate: 125 / 1000, // Pixels per second
      rotateRate: Math.PI / 1000, // Radians per second
      continousSpeed: 50,
    });

    let playerSpecs = {
      spriteSheet: dir + url,
      spriteCount: 14,
      spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
    };
    //make a playerModel
    let playerModel = new gameModel(playerSpecs, playerEvent, true);
    return playerModel;
  }

  initialize() {
    let self = this;
    self.myKeyboard.register("Escape", function () {
      GameState.cancelNextRequest = true;
      self.manager.showScreen("mainmenu");
    });

    this.wallEvent = new MovingEvents({
      size: { x: 50, y: 50 }, // Size in pixels
      center: { x: 250, y: 250 },
      rotation: 0,
      moveRate: 125 / 1000, // Pixels per second
      rotateRate: Math.PI / 1000, // Radians per second
      continousSpeed: 1,
    });

    let wallSpecs = {
      spriteSheet: dir + "assets/spritesheet-bird.png",
      spriteCount: 14,
      spriteTime: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
    };

    this.tower = new Tower({
      baseSprite: "assets/turret-base.gif",
      weaponSprite: "assets/turret-1-1.png",
      center: { x: 300, y: 400 },
      target: { x: 300, y: 100 },
      rotateRate: (6 * 3.14159) / 1000, // radians per second
    });

    self.wallModel = new gameModel(wallSpecs, this.wallEvent, true);

    this.playerModel = this.createEnemy(
      100,
      100,
      "assets/spritesheet-bird.png"
    );
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
    self.myKeyboard.cleanAll();

    // self.myKeyboard.register(upgrade, self.playerEvent.moveForward);
    // self.myKeyboard.register(sell, self.playerEvent.rotateLeft);
    // self.myKeyboard.register(start, self.playerEvent.rotateRight);

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
    this.wallModel.update(elapsedTime);
    this.tower.update(elapsedTime);
    if (isColliding(this.playerModel, this.tower, 500)) {
      console.log(this.playerModel.player.specs.center.x);
      this.tower.setTarget(
        this.playerModel.player.specs.center.x,
        this.playerModel.player.specs.center.y
      );
    }
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
    this.wallModel.render();
    this.tower.render();
  }

  run() {
    let self = this;
    this.sound = new Sound();
    this.sound.loadAudio();
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
