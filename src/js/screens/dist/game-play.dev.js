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

  _createClass(GamePlay, [{
    key: "upgrade",
    value: function upgrade(elapsedTime) {
      var moneyRequired = Math.floor(0.5 * towerClicked.specs.cost);
      console.log(towerClicked);

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
  }, {
    key: "sell",
    value: function sell() {
      if (towerClicked) {
        var towerLength = this.towers.length;

        for (var i = 0; i < towerLength; i++) {
          if (isColliding2(this.towers[i].specs.center.x - cellWidth / 2, this.towers[i].specs.center.y - cellWidth / 2, cellWidth, towerClicked.specs.center.x - cellWidth / 2, towerClicked.specs.center.y - cellWidth / 2, cellWidth)) {
            money += Math.floor(0.7 * towerClicked.specs.cost);
            towerSold(this.towers[i].specs.center.x - cellWidth / 2, this.towers[i].specs.center.y - cellWidth / 2);
            this.towers.splice(i, 1);
            gameSound.playSound("die");
            towerClicked = null;
            return;
          }
        }
      }
    }
  }, {
    key: "createElement",
    value: function createElement() {
      selectedTower = this.getAttribute("data-myName");
      towerRadius = this.getAttribute("data-radius");
      moneyRequired = parseInt(this.getAttribute("data-cost"));
      towerTypeSelected = parseInt(this.getAttribute("data-type"));

      if (moneyRequired <= money) {
        renderCircle = true;
        mouse.isActive = true;
      }
    }
  }, {
    key: "downHandler",
    value: function downHandler(e, elapsedTime) {
      if (mouse.isActive) {
        firstTime = true;
        mouse.isActive = false;
        renderCircle = false;
        var decision = canCreated(this.towers) && this.canPlace;

        if (decision) {
          //blockage check code
          // ----------------------------------------------------
          // if(levels[this.level].wave >=0){
          //   if (levels[this.level].enemyCreators[levels[this.level].wave].position == "top") {
          //     //the new tower that was placed recently got into line of the creeps so wont be added to scene
          //     if (
          //       isColliding3(
          //         Math.floor(mouse.x / cellWidth) * cellWidth,
          //         Math.floor((mouse.y - 200) / cellWidth) * cellWidth + 200,
          //         10,
          //         10,
          //         175,
          //         200,
          //         225,
          //         600
          //       )
          //     ) {
          //       block = true;
          //       console.log("it is blocking the path");
          //       return;
          //     }
          //   } 
          //   //the new tower that was placed recently got into line of the creeps so wont be added to scene
          //   else if (levels[this.level].enemyCreators[levels[this.level].wave].position == "left") {
          //     if (
          //       isColliding3(
          //         Math.floor(mouse.x / cellWidth) * cellWidth,
          //         Math.floor((mouse.y - 200) / cellWidth) * cellWidth + 200,
          //         10,
          //         10,
          //         0,
          //         400,
          //         600,
          //         200
          //       )
          //     ) {
          //       block = true
          //       console.log("it is blocking the path");
          //       return;
          //     }
          //   }
          // }
          // ------------------------------------------------------------------
          this.towers.push(createTower(GameState.assets[selectedTower], Math.floor(mouse.x / cellWidth) * cellWidth, Math.floor((mouse.y - 200) / cellWidth) * cellWidth + 200, 2500, 1, towerRadius, moneyRequired, towerTypeSelected));
          money = money - moneyRequired;
          moneyRequired = 0;
          towerTypeSelected = 0;
          gameSound.playSound("add");
        }

        var canvasPosition = canvas.getBoundingClientRect();
      } else {
        var _canvasPosition = canvas.getBoundingClientRect();

        mouse.x = e.clientX - _canvasPosition.left;
        mouse.y = e.clientY - _canvasPosition.top;
        findSelectedTower(this.towers);
      }
    }
  }, {
    key: "muteVolume",
    value: function muteVolume(e) {
      e.preventDefault();
      var towerElements = document.getElementsByClassName("volumeButton");

      for (var i = 0; i < towerElements.length; i++) {
        towerElements[i].style.display = "block";
      }

      var myId = this.getAttribute("data-myId");
      document.getElementById(myId).style.display = "none";

      if (myId == "muteButton") {
        gameSound.stopAllSound();
      }

      if (myId == "unmuteButton") {
        gameSound.unMuteSound();
      }
    }
  }, {
    key: "startNewWave",
    value: function startNewWave(e) {
      e.preventDefault();
      console.log("start button clicked");
      this.enemyCreator = levels[this.level].sendNextWave();

      if (levels[this.level].wave >= levels[this.level].enemyCreators.length) {
        this.level++;
        this.towers = [];
      }

      nextWave = false;
      GameState.cancelNextRequest = false;
    }
  }, {
    key: "checkCanProceed",
    value: function checkCanProceed() {
      if (this.level > 2 || GameState.life <= 0) {
        GameState.cancelNextRequest = true;
        add(score);
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var self = this;
      createLevels();
      makeParticle2();
      this.myMouse = new Mouse();
      GameState.cancelNextRequest = false;
      GameState.life = 10;
      self.myKeyboard.register("Escape", function () {
        GameState.cancelNextRequest = true;
        self.manager.showScreen("mainmenu");
      });

      for (var _i = 0; _i < rows; _i++) {
        var row = [];

        for (var j = 0; j < cols; j++) {
          row.push({
            x: _i,
            y: j
          });
        }

        cellSet.push(row);
      }

      towerElements = document.getElementsByClassName("tower");

      for (var i = 0; i < towerElements.length; i++) {
        towerElements[i].addEventListener("click", this.createElement, false);
      }

      towerElements2 = document.getElementsByClassName("volumeButton");

      for (var i = 0; i < towerElements2.length; i++) {
        towerElements2[i].addEventListener("click", this.muteVolume, false);
      }

      startButton = document.getElementById("startButton");
      startButton.addEventListener("click", this.startNewWave);
      this.bulletController = new BulletController(this.creeps);
      this.myMouse.register("mousedown", this.downHandler);
      this.myMouse.register("mousemove", function (e, elapsedTime) {
        if (mouse.isActive) {
          var canvasPosition = canvas.getBoundingClientRect();
          mouse.x = e.clientX - canvasPosition.left;
          mouse.y = e.clientY - canvasPosition.top;

          if (mouse.y < 200) {
            mouse.y = 200;
          }

          this.renderCircle = true;
        }
      });
    }
  }, {
    key: "processInput",
    value: function processInput(elapsedTime) {
      this.myKeyboard.update(elapsedTime);
      this.myMouse.update(elapsedTime);
    }
  }, {
    key: "registerKey",
    value: function registerKey() {
      var self = this;
      var upgrade = localStorage["upgrade"];
      var sell = localStorage["sell"];
      var start = localStorage["start"];
      self.myKeyboard.register(upgrade, function (elapsedTime) {
        self.upgrade(elapsedTime);
      });
      self.myKeyboard.register(sell, function (elapsedTime) {
        self.sell(elapsedTime);
      });
      self.myKeyboard.register(start, function (elapsedTime) {
        self.startNewWave(elapsedTime);
      }); // self.myKeyboard.cleanAll();
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      if (GameState.life <= 0) {
        GameState.cancelNextRequest = true; // this.particlesSmoke.update(elapsedTime);

        return;
      }

      particleSystem.update(elapsedTime);
      var creepsLength = this.creeps.length;

      for (var i = 0; i < creepsLength; i++) {
        var creep = this.creeps[i];

        if (creep) {
          if (creep.player.reachRight() || creep.player.reachBottom()) {
            this.creeps.splice(i, 1);
            GameState.life--;
            continue;
          }

          if (creep.health == 0) {
            var x = creep.player.specs.center.x;
            var y = creep.player.specs.center.y;
            score += creep.maxHealth;
            this.creeps.splice(i, 1);
            creepDied(x, y);
            totalCreepKilled++;
            money += creep.maxHealth;
            gameSound.playSound("die");
            var textEvent = new MovingEvents({
              size: {
                x: 50,
                y: 50
              },
              center: {
                x: x,
                y: y
              },
              rotation: 0,
              moveRate: 125 / 1000,
              rotateRate: Math.PI / 1000,
              continousSpeed: 50,
              yDirection: -1,
              xDirection: 0
            });
            this.flyingScores.push(new FlyingScore(creep.maxHealth, textEvent, true));
            continue;
          }

          creep.update(elapsedTime);
          var towersLength = this.towers.length;

          for (var _i2 = 0; _i2 < towersLength; _i2++) {
            var tower = this.towers[_i2];

            if (typeof creep.flying == "undefined" && tower.specs.type == 3) {
              console.log("flying" + " " + _i2);
            } else if (typeof creep.flying != "undefined" && tower.specs.type < 3) {
              console.log("flying" + " " + _i2);
            } else {
              if (isColliding(creep, tower, tower.specs.radius)) {
                tower.setTarget(creep.player.specs.center.x, creep.player.specs.center.y);

                if (tower.canShoot) {
                  var direction = {
                    x: tower.specs.target.x - tower.specs.center.x,
                    y: tower.specs.target.y - tower.specs.center.y
                  };
                  direction = normalize(direction);
                  var bulletStartX = tower.specs.center.x;
                  var bulletStartY = tower.specs.center.y;
                  this.bulletController.addBullet(bulletStartX, bulletStartY, creep, tower.specs.power, tower.specs.type);
                  gameSound.playSound("shoot");
                }
              }
            }

            tower.update(elapsedTime);
          }
        }
      }

      this.bulletController.update(elapsedTime);
      var scorelength = this.flyingScores.length;

      for (var _i3 = 0; _i3 < scorelength; _i3++) {
        this.flyingScores[_i3].update(elapsedTime);

        if (!this.flyingScores[_i3].isVisible) {
          this.flyingScores.splice(_i3, 1);
          _i3--;
          scorelength--;
        }
      }

      if (this.enemyCreator) {
        var newEnemy = this.enemyCreator.createEnemy(elapsedTime);

        if (newEnemy) {
          this.creeps.push(newEnemy);
        }
      }
    }
  }, {
    key: "renderScore",
    value: function renderScore() {
      document.getElementById("currentScore").innerHTML = score;
      document.getElementById("lives").innerHTML = GameState.life;
      document.getElementById("money").innerHTML = money;
      var waveString = levels[this.level].wave + 1 + "/" + maxWave;
      document.getElementById("wave").innerHTML = waveString;
      var startButton = document.getElementById("startButton");
      document.getElementById("level").innerHTML = this.level + 1;
      document.getElementById("killed").innerHTML = totalCreepKilled; // startButton.style.display = "none";

      if (nextWave) {
        startButton.style.display = "block";
      }

      var totalTowerValues = 0;
      this.towers.forEach(function (tower) {
        totalTowerValues += tower.specs.cost;
      });
      document.getElementById("towerValue").innerHTML = totalTowerValues;

      if (moneyRequired > 0) {
        document.getElementById("selectedInfo").style.display = "block";
        document.getElementById("moneyRequired").innerHTML = moneyRequired;
        document.getElementById("power").innerHTML = this.towerType[parseInt(towerTypeSelected) - 1];
      } else {
        document.getElementById("selectedInfo").style.display = "none";
        document.getElementById("moneyRequired").innerHTML = "";
        document.getElementById("power").innerHTML = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "green";
      context.fillRect(0, 0 + 200, 600, 800);
      context.clearRect(50, 250, 500, 500);
      context.clearRect(0, 400, 50, 200);
      context.clearRect(550, 400, 50, 200);
      context.clearRect(175, 200, 225, 50);
      context.clearRect(175, 750, 225, 50);

      if (mouse.isActive) {
        var placementFlag = false;

        for (var i = 0; i < rows; i++) {
          for (var j = 0; j < cols; j++) {
            var x1 = cellSet[i][j].x;
            var y1 = cellSet[i][j].y;

            if (Math.floor((mouse.x - leftOffset) / cellWidth) == x1 && Math.floor((mouse.y - topOffset) / cellWidth) == y1) {
              this.canPlace = true;
              placementFlag = true;
              context.beginPath();
              context.rect(x1 * cellWidth + leftOffset, y1 * cellWidth + topOffset, cellWidth, cellWidth);
              context.stroke();
            }
          }
        }

        if (!placementFlag) {
          this.canPlace = false;
        }
      } // ctx.strokeRect(50, 50, 50, 50);


      context.beginPath();
      context.moveTo(0, 200);
      context.lineTo(canvas.width, 200);
      context.stroke();

      if (renderCircle) {
        drawTower(towerRadius);
      }

      context.fillStyle = "black";
      this.renderScore();
      this.creeps.forEach(function (creep) {
        creep.render();
      });
      var towersLength = this.towers.length;

      for (var _i4 = 0; _i4 < towersLength; _i4++) {
        var tower = this.towers[_i4];
        tower.render();
      }

      if (towerClicked) {
        drawRectangle({
          x: towerClicked.specs.center.x - cellWidth / 2,
          y: towerClicked.specs.center.y - cellWidth / 2,
          width: 50,
          height: 50,
          fill: "#ffd63f9e",
          stroke: "red"
        });
      }

      this.bulletController.render();
      var scorelength = this.flyingScores.length;

      for (var _i5 = 0; _i5 < scorelength; _i5++) {
        this.flyingScores[_i5].render();
      }

      particleSystem.render();
    }
  }, {
    key: "run",
    value: function run() {
      var self = this;
      gameSound = new Sound();
      gameSound.loadAudio(); // this.sound.playSound("end");

      this.registerKey();
      var lastTimeStamp = performance.now();
      GameState.cancelNextRequest = false;

      function gameLoop(time) {
        if (self.enemyCreator && self.enemyCreator.totalEnemy <= 0 && self.creeps.length == 0 && wave > 0) {
          nextWave = true;
          wave--;
        } else {} // self.processInput(time - lastTimeStamp);
        // self.update(time - lastTimeStamp);
        // self.checkCanProceed();


        if (!GameState.cancelNextRequest) {
          requestAnimationFrame(gameLoop);
          self.processInput(time - lastTimeStamp);
          self.update(time - lastTimeStamp);
          lastTimeStamp = time;
          self.render();
        } else {
          if (score > 0) {
            add(score);
          }

          context.font = "70px roboto";
          context.fillStyle = "black";
          context.textAlign = "center";
          context.fillText("Game Over", canvas.width / 2, canvas.height * 0.6);
          context.fillText(score, canvas.width / 2, canvas.height * 0.8); // for (var i = 0; i < towerElements.length; i++) {
          //   towerElements[i].removeEventListener(
          //     "click",
          //     this.createElement,
          //     false
          //   );
          // }
          // for (var i = 0; i < towerElements2.length; i++) {
          //   towerElements2[i].removeEventListener(
          //     "click",
          //     this.muteVolume,
          //     false
          //   );
          // }
          // startButton.removeEventListener("click", self.startNewWave);

          setTimeout(function () {
            self.manager.showScreen("mainmenu");
          }, 4000);
        }

        lastTimeStamp = time;
      }

      requestAnimationFrame(gameLoop);
    }
  }]);

  return GamePlay;
}();
//# sourceMappingURL=game-play.dev.js.map
