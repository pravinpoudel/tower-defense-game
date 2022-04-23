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
    this.creeps = [
      makeCreateCreep1(20, 300),
      makeCreateCreep2(100, 300),
      makeCreateCreep3(300, 300),
    ];
    this.registerKey = this.registerKey.bind(this);
  }

  initialize() {
    let self = this;
    self.myKeyboard.register("Escape", function () {
      GameState.cancelNextRequest = true;
      self.manager.showScreen("mainmenu");
    });

    this.tower = new Tower({
      baseSprite: "assets/tile-1-center.gif",
      weaponSprite: "assets/turret/turret-5-3.png",
      center: { x: 300, y: 400 },
      target: { x: 300, y: 100 },
      rotateRate: (6 * 3.14159) / 1000, // radians per second
    });

    // this.playerModel = this.createEnemy(
    //   100,
    //   100,
    //   "assets/spritesheet-bird.png"
    // );
    // self.enemycontroller = new EnemyController(self.playerModel);
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
  }

  update(elapsedTime) {
    if (GameState.life <= 0) {
      GameState.cancelNextRequest = true;
      this.particlesSmoke.update(elapsedTime);
      return;
    }
    this.creeps.forEach((creep) => {
      creep.update(elapsedTime);
      if (isColliding(creep, this.tower, 200)) {
        this.tower.setTarget(
          creep.player.specs.center.x,
          creep.player.specs.center.y
        );
      }
    });
    // this.playerModel.update(elapsedTime);
    this.tower.update(elapsedTime);
   
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
    // this.playerModel.render();
    this.creeps.forEach((creep) => {
      creep.render();
    });
    this.tower.render();
  }

  run() {
    let self = this;
    this.sound = new Sound();
    this.sound.loadAudio();
    this.registerKey();

    // this.myKeyboard.register("ArrowUp", self.playerModel.player.moveTop);
    // this.myKeyboard.register("ArrowDown", self.playerModel.player.moveDown);
    // this.myKeyboard.register("ArrowLeft", self.playerModel.player.moveLeft);
    // this.myKeyboard.register("ArrowRight", self.playerModel.player.moveRight);
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
