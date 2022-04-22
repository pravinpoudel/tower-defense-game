class Keyboard {
  constructor() {
    this.keys = {};
    this.handlers = {};
    this.keyPress = this.keyPress.bind(this);
    this.keyRelease = this.keyRelease.bind(this);
    this.register = this.register.bind(this);
    window.addEventListener("keydown", this.keyPress);
    window.addEventListener("keyup", this.keyRelease);
  }

  keyPress(e) {
    this.keys[e.key] = true;
  }

  keyRelease(e) {
    delete this.keys[e.key];
  }

  cleanAll() {
    this.keys = {};
    this.handlers = {};
  }

  register(key, handler) {
    this.handlers[key] = handler;
  }

  update(elapsedTime) {
    for (let key in this.keys) {
      if (this.keys.hasOwnProperty(key)) {
        if (this.handlers[key]) {
          this.handlers[key](elapsedTime);
        } else {
          console.warn(`${key} does not have handler registered for it`);
        }
      }
    }
  }
}
