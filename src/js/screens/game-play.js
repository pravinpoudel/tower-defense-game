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

    this.bulletController = new BulletController();
    this.tower = new Tower({
      baseSprite: "assets/tile-1-center.gif",
      weaponSprite: "assets/turret/turret-5-3.png",
      center: { x: 300, y: 400 },
      target: { x: 300, y: 100 },
      rotateRate: (6 * 3.14159) / 1000, // radians per second
      delay: 2000,
      power:2
    });
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
    let creepsLength =  this.creeps.length;
    for (let i = 0; i < creepsLength; i++) {
      let creep = this.creeps[i];
      if(creep){
        if(creep.health == 0){
          this.creeps.splice(i,1);
          continue;
        }
        creep.update(elapsedTime);
        if (isColliding(creep, this.tower, 200)) {
          this.tower.setTarget(
            creep.player.specs.center.x,
            creep.player.specs.center.y
          );
          if (this.tower.canShoot) {
            let direction = {
              x: this.tower.specs.target.x - this.tower.specs.center.x,
              y: this.tower.specs.target.y - this.tower.specs.center.y,
            };
            direction = normalize(direction);
            let bulletStartX = this.tower.specs.center.x;
            let bulletStartY = this.tower.specs.center.y;
  
            this.bulletController.addBullet(
              bulletStartX,
              bulletStartY,
              creep,
              this.tower.specs.power
            );
          }
        }
  
      }
    }
    this.tower.update(elapsedTime);
    this.bulletController.update(elapsedTime);
    // model.update(elapsedTime);
  }

  renderScore() {
    document.getElementById("currentScore").innerHTML = score;
    document.getElementById("lives").innerHTML = GameState.life;
  }

  render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.renderScore();
    this.creeps.forEach((creep) => {
      creep.render();
    });
    this.tower.render();
    this.bulletController.render();
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
