class HighScoreMenu {
  constructor(manager) {
    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.displayScore = this.displayScore.bind(this);
  }

  initialize() {
    let self = this;
    document
      .getElementById("id-high-scores-back")
      .addEventListener("click", function () {
        self.manager.showScreen("mainmenu");
      });
  }

  displayScore() {
    let highScoresHTML = document.getElementById("high-scores-list");
    highScoresHTML.innerHTML = "";
    if(scores.length>0){
      scores.forEach(function (score) {
        highScoresHTML.innerHTML += score + "<br/>";
      });
    }

  }

  run() {
    this.displayScore();
  }
}
