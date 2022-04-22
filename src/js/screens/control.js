class Control {
  constructor(manager) {
    this.manager = manager;
    this.initialize = this.initialize.bind(this);
    this.run = this.run.bind(this);
    this.readControl = this.readControl.bind(this);
    this.controlForm = this.controlForm.bind(this);
    this.upgrade = null;
    this.sell = null;
    this.start = null;
  }

  initialize() {
    let self = this;
    console.log("control initialized");
    document
      .getElementById("id-control-back")
      .addEventListener("click", function () {
        self.manager.showScreen("mainmenu");
      });

    window.addEventListener("keydown", (event) => {
      //check if there is button selected on control selection form
      if (activeButton) {
        activeButton.innerText = event.key;
        let element_key = activeButton.dataset.key;
        if (event.key == "Escape") {
          return;
        }
        console.log(element_key);
        switch (element_key) {
          case "upgrade":
            localStorage["upgrade"] = event.key;
            break;
          //   topCode = event.key;
          case "sell":
            localStorage["sell"] = event.key;
            break;
          // downCode = event.key;
          case "start":
            localStorage["start"] = event.key;
            break;
          //   rightCode = event.key;
        }
        this.run();
      }
    });
  }

  readControl() {
    this.upgrade = localStorage["upgrade"];
    this.sell = localStorage["sell"];
    this.start = localStorage["start"];
  }

  controlForm() {
    document.getElementById("upgrade_button").innerText = this.upgrade;
    document
      .getElementById("upgrade_button")
      .addEventListener("click", (event) => {
        activeButton = document.getElementById("upgrade_button");
      });
    document.getElementById("sell_button").innerText = this.sell;
    document
      .getElementById("sell_button")
      .addEventListener("click", (event) => {
        activeButton = document.getElementById("sell_button");
        // console.log(activeButton);
      });

    document.getElementById("start_button").innerText = this.start;
    document
      .getElementById("start_button")
      .addEventListener("click", (event) => {
        activeButton = document.getElementById("start_button");
      });
  }

  run() {
    console.log(
      localStorage["upgrade"],
      localStorage["sell"],
      localStorage["start"]
    );
    this.readControl();
    this.controlForm();
  }
}
