class MainMenu {
  constructor(manager) {
    console.log(manager);
    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
  }

  initialize() {
    let self = this;
    document
      .getElementById("id-new-game")
      .addEventListener("click", function () {
        self.manager.showScreen("gameplay");
      });

    document
      .getElementById("id-high-scores")
      .addEventListener("click", function () {
        self.manager.showScreen("highscores");
      });

    document.getElementById("id-help").addEventListener("click", function () {
      self.manager.showScreen("help");
    });

    document.getElementById("id-about").addEventListener("click", function () {
      self.manager.showScreen("about");
    });
  }

  run() {}
}
