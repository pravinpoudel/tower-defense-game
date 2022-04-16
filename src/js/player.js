class MovingObject {
  constructor(specs) {
    this.specs = specs;
    this.moveForward = this.moveForward.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
  }

  moveForward(elapsedTime) {
    let vectorX = Math.cos(this.specs.rotation);
    let vectorY = Math.sin(this.specs.rotation);
    this.specs.center.x += vectorX * this.specs.moveRate * elapsedTime;
    this.specs.center.y += vectorY * this.specs.moveRate * elapsedTime;
  }

  rotateLeft(elapsedTime) {
    console.log("rotating left");
    this.specs.rotation -= this.specs.rotateRate * elapsedTime;
  }

  rotateRight(elapsedTime) {
    console.log("rotating right");
    this.specs.rotation += this.specs.rotateRate * elapsedTime;
  }
}
