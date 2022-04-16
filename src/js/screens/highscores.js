class HighScoreMenu {
  constructor(manager) {
    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
  }

  initialize() {
    let self = this;
    document
      .getElementById("id-high-scores-back")
      .addEventListener("click", function () {
        self.manager.showScreen("mainmenu");
      });
  }

  run() {}
}
