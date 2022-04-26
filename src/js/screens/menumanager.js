class Manager {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.showScreen = this.showScreen.bind(this);
  }

  showScreen(id) {
    let screen = 0;
    let active = null;
    active = document.getElementsByClassName("active");
    for (screen = 0; screen < active.length; screen++) {
      active[screen].classList.remove("active");
    }
    GameState.screens[id].run();
    document.getElementById(id).classList.add("active");
  }

  initialize() {
    let screen = null;
    let self = this;
    for (screen in GameState.screens) {
      if (GameState.screens.hasOwnProperty(screen)) {
        GameState.screens[screen].initialize();
      }
    }
    self.showScreen("mainmenu");
  }
}
