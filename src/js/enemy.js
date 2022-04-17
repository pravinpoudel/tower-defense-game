class Enemy {
  constructor(spec) {
    this.alive = true;
    this.width = Math.trunc((7 / 100) * canvas.width);
    this.left = spec.position.left;
    this.right = spec.position.left + this.width;
    this.top = spec.position.top;
    this.bottom = spec.position.top + Constants.BrickHeight;
    this.score = spec.score;
  }

  doesIntersect(gameObject) {
    var intersect = false;
    if (this.alive) {
      // if there is another enemy as well and is collided with other
      //we dont care
      if (!gameObject.collided && isColliding(this, gameObject)) {
        this.alive = false;
        intersect = true;
      }
    }
    gameObject.collided = intersect;
    return intersect;
  }

  update() {
    //if anything is needed to be updated
  }

  render() {
    if (this.alive) {
      drawRectangle({
        x: that.left,
        y: that.top,
        width: brickWidth,
        height: Constants.BrickHeight,
        fill: spec.color,
        stroke: "rgba(0, 0, 0, 1)",
      });
    }
  }
}
