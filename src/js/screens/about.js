class About {
  constructor(manager) {
    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
  }

  initialize() {
    let self = this;
    console.log("about initialized");
    document
      .getElementById("id-about-back")
      .addEventListener("click", function () {
        self.manager.showScreen("mainmenu");
      });
  }

  run() {}
}
