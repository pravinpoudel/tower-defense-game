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
    this.creeps = [];
    this.towers = [];
    this.registerKey = this.registerKey.bind(this);
    this.flyingScores = [];
    this.tower1 = new Image();
    this.tower1.src = "assets/turret/turret-5-3.png";
    this.render = this.render.bind(this);
    this.firstTime = true;
    this.downHandler = this.downHandler.bind(this);
    this.enemyCreator = null;
    this.canPlace = false;
    this.upgrade = this.upgrade.bind(this);
    this.sell = this.sell.bind(this);
    this.renderScore = this.renderScore.bind(this);
    this.startNewWave = this.startNewWave.bind(this);
    this.level = 0;
    this.towerType = ["Gun", "Missile", "Air", "Mix (Air + Ground)"];
  }

  upgrade(elapsedTime) {
    let moneyRequired = Math.floor(0.5 * towerClicked.specs.cost);
    if (moneyRequired <= money) {
      if (towerClicked) {
        if (towerClicked.totalElapsedTime == undefined) {
          towerClicked.totalElapsedTime = 0;
        } else {
          towerClicked.totalElapsedTime += elapsedTime;
          if (towerClicked.totalElapsedTime >= 200) {
            console.log("upgraded");
            towerClicked.totalElapsedTime -= 200;
            if (!towerClicked.upgradeCount) {
              towerClicked.upgradeCount = 1;
            } else {
              if (towerClicked.upgradeCount >= 3) {
                return;
              } else {
                towerClicked.upgradeCount = towerClicked.upgradeCount + 1;
                towerClicked.delay = Math.floor(towerClicked.delay * 0.7);
                towerClicked.specs.power = towerClicked.specs.power + 1;
                money -= moneyRequired;
                gameSound.playSound("add");
              }
            }
          }
        }
      }
    }
  }

  sell() {
    if (towerClicked) {
      let towerLength = this.towers.length;
      for (let i = 0; i < towerLength; i++) {
        if (
          isColliding2(
            this.towers[i].specs.center.x - cellWidth / 2,
            this.towers[i].specs.center.y - cellWidth / 2,
            cellWidth,
            towerClicked.specs.center.x - cellWidth / 2,
            towerClicked.specs.center.y - cellWidth / 2,
            cellWidth
          )
        ) {
          money += Math.floor(0.7 * towerClicked.specs.cost);
          this.towers.splice(i, 1);
          gameSound.playSound("die");
          towerClicked = null;
          return;
        }
      }
    }
  }

  createElement() {
    selectedTower = this.getAttribute("data-myName");
    towerRadius = this.getAttribute("data-radius");
    moneyRequired = parseInt(this.getAttribute("data-cost"));
    towerTypeSelected = parseInt(this.getAttribute("data-type"));
    if (moneyRequired <= money) {
      renderCircle = true;
      mouse.isActive = true;
    }
  }

  downHandler(e, elapsedTime) {
    if (mouse.isActive) {
      firstTime = true;
      mouse.isActive = false;
      renderCircle = false;
      let decision = canCreated(this.towers) && this.canPlace;
      if (decision) {
        this.towers.push(
          createTower(
            GameState.assets[selectedTower],
            Math.floor(mouse.x / cellWidth) * cellWidth,
            Math.floor((mouse.y - 200) / cellWidth) * cellWidth + 200,
            2500,
            1,
            towerRadius,
            moneyRequired,
            towerTypeSelected
          )
        );
        money = money - moneyRequired;
        moneyRequired = 0;
        towerTypeSelected = 0;
        gameSound.playSound("add");
      }
      const canvasPosition = canvas.getBoundingClientRect();
    } else {
      const canvasPosition = canvas.getBoundingClientRect();
      mouse.x = e.clientX - canvasPosition.left;
      mouse.y = e.clientY - canvasPosition.top;
      findSelectedTower(this.towers);
    }
  }

  muteVolume(e) {
    e.preventDefault();
    var towerElements = document.getElementsByClassName("volumeButton");
    for (var i = 0; i < towerElements.length; i++) {
      towerElements[i].style.display = "block";
    }
    let myId = this.getAttribute("data-myId");
    document.getElementById(myId).style.display = "none";
    if (myId == "muteButton") {
      gameSound.stopAllSound();
    }
    if (myId == "unmuteButton") {
      gameSound.unMuteSound();
    }
  }

  startNewWave = (e) => {
    // e.preventDefault();
    this.enemyCreator = levels[this.level].sendNextWave();
    if (levels[this.level].wave >= levels[this.level].enemyCreators.length) {
      this.level++;
    }
    nextWave = false;
    GameState.cancelNextRequest = false;
  };

  checkCanProceed() {
    if (this.level > 2 || GameState.life <= 0) {
      GameState.cancelNextRequest = true;
      add(score);
    }
  }

  initialize() {
    let self = this;
    this.myMouse = new Mouse();

    self.myKeyboard.register("Escape", function () {
      GameState.cancelNextRequest = true;
      self.manager.showScreen("mainmenu");
    });

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          x: i,
          y: j,
        });
      }
      cellSet.push(row);
    }

    var towerElements = document.getElementsByClassName("tower");
    for (var i = 0; i < towerElements.length; i++) {
      towerElements[i].addEventListener("click", this.createElement, false);
    }

    var towerElements2 = document.getElementsByClassName("volumeButton");
    for (var i = 0; i < towerElements2.length; i++) {
      towerElements2[i].addEventListener("click", this.muteVolume, false);
    }
    var startButton = document.getElementById("startButton");
    startButton.addEventListener("click", this.startNewWave);

    this.bulletController = new BulletController(this.creeps);

    // this.towers.push(
    //   createTower("assets/turret/turret-5-3.png", 300, 500, 1000, 1)
    // );
    // this.towers.push(
    //   createTower("assets/turret/turret-3-3.png", 600, 500, 2000, 2)
    // );

    this.myMouse.register("mousedown", this.downHandler);

    // this.myMouse.register('mouseup', function(e, elapsedTime) {
    //   mouse.isActive = false;
    // });

    this.myMouse.register("mousemove", function (e, elapsedTime) {
      if (mouse.isActive) {
        const canvasPosition = canvas.getBoundingClientRect();
        mouse.x = e.clientX - canvasPosition.left;
        mouse.y = e.clientY - canvasPosition.top;
        if (mouse.y < 200) {
          mouse.y = 200;
        }
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

    self.myKeyboard.register(upgrade, function (elapsedTime) {
      self.upgrade(elapsedTime);
    });

    self.myKeyboard.register(sell, function (elapsedTime) {
      self.sell(elapsedTime);
    });

    self.myKeyboard.register(start, function (elapsedTime) {
      self.startNewWave(elapsedTime);
    });

    // self.myKeyboard.cleanAll();
  }

  update(elapsedTime) {
    if (GameState.life <= 0) {
      GameState.cancelNextRequest = true;
      // this.particlesSmoke.update(elapsedTime);
      return;
    }
    let creepsLength = this.creeps.length;
    for (let i = 0; i < creepsLength; i++) {
      let creep = this.creeps[i];
      if (creep) {
        if (creep.player.reachRight() || creep.player.reachBottom()) {
          this.creeps.splice(i, 1);
          GameState.life--;
          continue;
        }
        if (creep.health == 0) {
          let x = creep.player.specs.center.x;
          let y = creep.player.specs.center.y;
          score += creep.maxHealth;
          this.creeps.splice(i, 1);
          totalCreepKilled++;
          money += creep.maxHealth;
          gameSound.playSound("die");
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
          this.flyingScores.push(
            new FlyingScore(creep.maxHealth, textEvent, true)
          );
          continue;
        }
        creep.update(elapsedTime);
        let towersLength = this.towers.length;
        for (let i = 0; i < towersLength; i++) {
          let tower = this.towers[i];
          if (typeof creep.flying == "undefined" && tower.specs.type == 3) {
            console.log("flying" + " " + i);
          } else if (
            typeof creep.flying != "undefined" &&
            tower.specs.type < 3
          ) {
            console.log("flying" + " " + i);
          } else {
            if (isColliding(creep, tower, tower.specs.radius)) {
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
                  tower.specs.power,
                  tower.specs.type
                );
                gameSound.playSound("shoot");
              }
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
    if (this.enemyCreator) {
      let newEnemy = this.enemyCreator.createEnemy(elapsedTime);
      if (newEnemy) {
        this.creeps.push(newEnemy);
      }
    }
  }

  renderScore() {
    document.getElementById("currentScore").innerHTML = score;
    document.getElementById("lives").innerHTML = GameState.life;
    document.getElementById("money").innerHTML = money;
    let waveString = levels[this.level].wave + 1 + "/" + maxWave;
    document.getElementById("wave").innerHTML = waveString;
    var startButton = document.getElementById("startButton");
    document.getElementById("level").innerHTML = this.level + 1;
    document.getElementById("killed").innerHTML = totalCreepKilled;
    // startButton.style.display = "none";
    if (nextWave) {
      startButton.style.display = "block";
    }
    let totalTowerValues = 0;
    this.towers.forEach((tower) => {
      totalTowerValues += tower.specs.cost;
    });
    document.getElementById("towerValue").innerHTML = totalTowerValues;

    if (moneyRequired > 0) {
      document.getElementById("selectedInfo").style.display = "block";
      document.getElementById("moneyRequired").innerHTML = moneyRequired;
      document.getElementById("power").innerHTML =
        this.towerType[parseInt(towerTypeSelected) - 1];
    } else {
      document.getElementById("selectedInfo").style.display = "none";
      document.getElementById("moneyRequired").innerHTML = "";
      document.getElementById("power").innerHTML = "";
    }
  }

  render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "green";
    context.fillRect(0, 0 + 200, 600, 800);
    context.clearRect(50, 250, 500, 500);
    context.clearRect(0, 400, 50, 200);
    context.clearRect(550, 400, 50, 200);
    context.clearRect(175, 200, 225, 50);
    context.clearRect(175, 750, 225, 50);

    if (mouse.isActive) {
      let placementFlag = false;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let x1 = cellSet[i][j].x;
          let y1 = cellSet[i][j].y;
          if (
            Math.floor((mouse.x - leftOffset) / cellWidth) == x1 &&
            Math.floor((mouse.y - topOffset) / cellWidth) == y1
          ) {
            this.canPlace = true;
            placementFlag = true;
            context.beginPath();
            context.rect(
              x1 * cellWidth + leftOffset,
              y1 * cellWidth + topOffset,
              cellWidth,
              cellWidth
            );
            context.stroke();
          }
        }
      }
      if (!placementFlag) {
        this.canPlace = false;
      }
    }

    // ctx.strokeRect(50, 50, 50, 50);

    context.beginPath();
    context.moveTo(0, 200);
    context.lineTo(canvas.width, 200);
    context.stroke();
    if (renderCircle) {
      drawTower(towerRadius);
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
    if (towerClicked) {
      drawRectangle({
        x: towerClicked.specs.center.x - cellWidth / 2,
        y: towerClicked.specs.center.y - cellWidth / 2,
        width: 50,
        height: 50,
        fill: "#ffd63f9e",
        stroke: "red",
      });
    }

    this.bulletController.render();
    let scorelength = this.flyingScores.length;
    for (let i = 0; i < scorelength; i++) {
      this.flyingScores[i].render();
    }
  }

  run() {
    let self = this;
    gameSound = new Sound();
    gameSound.loadAudio();
    // this.sound.playSound("end");
    this.registerKey();
    let lastTimeStamp = performance.now();
    GameState.cancelNextRequest = false;

    function gameLoop(time) {
      if (
        self.enemyCreator &&
        self.enemyCreator.totalEnemy <= 0 &&
        self.creeps.length == 0 &&
        wave > 0
      ) {
        nextWave = true;
        wave--;
      } else {
        self.processInput(time - lastTimeStamp);
        self.update(time - lastTimeStamp);
        lastTimeStamp = time;
      }
      self.checkCanProceed();
      if (!GameState.cancelNextRequest) {
        requestAnimationFrame(gameLoop);
        self.processInput(time - lastTimeStamp);
        self.update(time - lastTimeStamp);
        lastTimeStamp = time;
        self.render();
      } else {
        context.font = "70px roboto";
        context.textAlign = "center";
        context.fillText("Game Over", canvas.width / 2, canvas.height * 0.8);
        setTimeout(() => {
          self.manager.showScreen("mainmenu");
        }, 2000);
      }
    }
    requestAnimationFrame(gameLoop);
  }
}
