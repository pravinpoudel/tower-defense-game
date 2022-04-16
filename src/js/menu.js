class menu {
  constructor() {}

  showScreen(id) {
    var screen = 0,
      active = null;
    //
    // Remove the active state from all screens.  There should only be one...
    active = document.getElementsByClassName("active");
    for (screen = 0; screen < active.length; screen += 1) {
      active[screen].classList.remove("active");
    }
    //
    // Tell the screen to start actively running
    pages[id].run();
    //
    // Then, set the new screen to be active
    document.getElementById(id).classList.add("active");
  }

  initialize() {
    var screen = null;
    //
    // Go through each of the screens and tell them to initialize
    for (screen in pages) {
      if (pages.hasOwnProperty(screen)) {
        pages[screen].initialize();
      }
    }
    showScreen("page-mainmenu");
  }
}
