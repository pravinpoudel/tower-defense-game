class Mouse {
  constructor() {
    this.mouseDown = [];
    this.mouseUp = [];
    this.mouseMove = [];
    this.handlersDown = [];
    this.handlersUp = [];
    this.handlersMove = [];

    window.addEventListener("mousedown", (e) => {
      this.mouseDown.push(e);
    });
    window.addEventListener("mouseup", (e) => {
      this.mouseUp.push(e);
    });

    window.addEventListener("mousemove", (e) => {
      this.mouseMove.push(e);
    });
  }

  update(elapsedTime) {
    var event, handler;
    console.log(this.mouseDown.length);
    for (event = 0; event < this.mouseDown.length; event++) {
      for (handler = 0; handler < this.handlersDown.length; handler++) {
        this.handlersDown[handler](this.mouseDown[event], elapsedTime);
      }
    }

    for (event = 0; event < this.mouseUp.length; event++) {
      for (handler = 0; handler < this.handlersUp.length; handler++) {
        this.handlersUp[handler](this.mouseUp[event], elapsedTime);
      }
    }

    for (event = 0; event < this.mouseMove.length; event++) {
      for (handler = 0; handler < this.handlersMove.length; handler++) {
        this.handlersMove[handler](this.mouseMove[event], elapsedTime);
      }
    }

    this.mouseDown.length = 0;
    this.mouseUp.length = 0;
    this.mouseMove.length = 0;
  }

  register(type, handler) {
    if (type === "mousedown") {
      this.handlersDown.push(handler);
    } else if (type === "mouseup") {
      this.handlersUp.push(handler);
    } else if (type === "mousemove") {
      this.handlersMove.push(handler);
    }
  }
}
