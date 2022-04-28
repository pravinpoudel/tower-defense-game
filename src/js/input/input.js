class Keyboard {
  constructor() {
    this.keys = {};
    this.deletedKeys = {};
    this.handlers = {};
    this.releaser = {};
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
    this.deletedKeys[e.key] = true;
    delete this.keys[e.key];
  }

  cleanAll() {
    this.keys = {};
    this.handlers = {};
  }

  register(key, handler, releaser) {
    this.handlers[key] = handler;
    this.releaser[key] = releaser;
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
    for (let key in this.deletedKeys) {
      if (this.deletedKeys.hasOwnProperty(key)) {
        if (this.releaser[key]) {
          this.releaser[key](elapsedTime);
          delete this.deletedKeys[key];
        } else {
          console.warn(`${key} does not have handler registered for it`);
        }
      }
    }
  }
}
