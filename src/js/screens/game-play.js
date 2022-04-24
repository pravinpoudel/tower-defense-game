class GamePlay {
  constructor(manager, input) {
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
    this.creeps = [
      makeCreateCreep1(20, 300),
      makeCreateCreep2(100, 300),
      makeCreateCreep3(300, 300),
    ];
    this.towers = [];
    this.registerKey = this.registerKey.bind(this);
    this.flyingScores = [];
    this.tower1 = new Image();
    this.tower1.src = "assets/turret/turret-5-3.png";
    this.render = this.render.bind(this);
    this.firstTime = true;
    this.downHandler = this.downHandler.bind(this);
  }

   downHandler(e, elapsedTime) {
     console.log(mouse.x, mouse.y);
    mouse.isActive = true;
    if(firstTime){
      console.log("firsttime");
      firstTime = false;
      renderCircle = true;
      mouse.isActive = true;
    }
    else{
      firstTime = true;
      mouse.isActive = false;
      renderCircle = false;
      this.towers.push(
        createTower("assets/turret/turret-5-3.png", mouse.x, mouse.y, 1000, 1)
      );
      console.log(this.towers.length)
  
    }
    const canvasPosition = canvas.getBoundingClientRect(); 
    mouse.x = e.x ;
    mouse.y = e.y ; 

}

  initialize() {
    let self = this;
    this.myMouse = new Mouse();
    self.myKeyboard.register("Escape", function () {
      GameState.cancelNextRequest = true;
      self.manager.showScreen("mainmenu");
    });

    this.bulletController = new BulletController();

    this.towers.push(
      createTower("assets/turret/turret-5-3.png", 300, 500, 1000, 1)
    );
    this.towers.push(
      createTower("assets/turret/turret-3-3.png", 600, 500, 2000, 2)
    );

    this.myMouse.register('mousedown', this.downHandler);

  // this.myMouse.register('mouseup', function(e, elapsedTime) {
  //   mouse.isActive = false;
  // });

  this.myMouse.register('mousemove', function(e, elapsedTime) { 
    if (mouse.isActive) {
        const canvasPosition = canvas.getBoundingClientRect(); 
        mouse.x = e.clientX - canvasPosition.left ;
        mouse.y = e.clientY - canvasPosition.top;    
        this.renderCircle = true; 
      }
  });

  }

  processInput(elapsedTime) {
    this.myKeyboard.update(elapsedTime);
    this.myMouse.update(elapsedTime);

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
    let creepsLength = this.creeps.length;
    for (let i = 0; i < creepsLength; i++) {
      let creep = this.creeps[i];
      if (creep) {
        if (creep.health == 0) {
          let x = creep.player.specs.center.x;
          let y = creep.player.specs.center.y;
          this.creeps.splice(i, 1);
          let textEvent = new MovingEvents({
            size: { x: 50, y: 50 }, // Size in pixels
            center: { x: x, y: y },
            rotation: 0,
            moveRate: 125 / 1000, // Pixels per second
            rotateRate: Math.PI / 1000, // Radians per second
            continousSpeed: 50,
            yDirection: -1,
            xDirection: 0,
          });
          this.flyingScores.push(new FlyingScore("10", textEvent, true));
          continue;
        }
        creep.update(elapsedTime);
        let towersLength = this.towers.length;
        for (let i = 0; i < towersLength; i++) {
          let tower = this.towers[i];
          if (isColliding(creep, tower, 200)) {
            tower.setTarget(
              creep.player.specs.center.x,
              creep.player.specs.center.y
            );
            if (tower.canShoot) {
              let direction = {
                x: tower.specs.target.x - tower.specs.center.x,
                y: tower.specs.target.y - tower.specs.center.y,
              };
              direction = normalize(direction);
              let bulletStartX = tower.specs.center.x;
              let bulletStartY = tower.specs.center.y;

              this.bulletController.addBullet(
                bulletStartX,
                bulletStartY,
                creep,
                tower.specs.power
              );
            }
          }
          tower.update(elapsedTime);
        }
      }
    }

    this.bulletController.update(elapsedTime);
    let scorelength = this.flyingScores.length;
    for (let i = 0; i < scorelength; i++) {
      this.flyingScores[i].update(elapsedTime);
      if (!this.flyingScores[i].isVisible) {
        this.flyingScores.splice(i, 1);
        i--;
        scorelength--;
      }
    }
  }

  renderScore() {
    document.getElementById("currentScore").innerHTML = score;
    document.getElementById("lives").innerHTML = GameState.life;
  }

  render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(renderCircle){
      drawTower(this.tower1, 200);

    }
    this.renderScore();
    this.creeps.forEach((creep) => {
      creep.render();
    });
    let towersLength = this.towers.length;
    for (let i = 0; i < towersLength; i++) {
      let tower = this.towers[i];
      tower.render();
    }
    this.bulletController.render();
    let scorelength = this.flyingScores.length;
    for (let i = 0; i < scorelength; i++) {
      this.flyingScores[i].render();
    }
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
