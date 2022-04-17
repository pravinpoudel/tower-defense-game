class MovingEvents {
  constructor(spec) {
    this.spec = spec;
  }

  moveForward(elapsedTime) {
    let vectorX = Math.cos(spec.rotation);
    let vectorY = Math.sin(spec.rotation);
    spec.center.x += vectorX * spec.moveRate * elapsedTime;
    spec.center.y += vectorY * spec.moveRate * elapsedTime;
  }

  rotateLeft(elapsedTime) {
    spec.rotation -= spec.rotateRate * elapsedTime;
  }

  rotateRight(elapsedTime) {
    spec.rotation += spec.rotateRate * elapsedTime;
  }
}
