class FlyingScore {
  constructor(score, playerEvent, continousMotion) {
    this.player = playerEvent;
    this.score = score;
    this.continousMotion = continousMotion;
    this.animationTime = 0;
    this.isVisible = true;
  }

  update(elapsedTime) {
    this.animationTime += elapsedTime;
    if (this.animationTime >= 1000) {
      this.animationTime -= 1000;
      this.isVisible = false;
    }
    if (this.continousMotion) {
      this.player.update(elapsedTime);
    }
  }

  render() {
    context.font = "32px Arial";
    context.fillStyle = "#000000";
    context.fillText(
      this.score,
      this.player.specs.center.x,
      this.player.specs.center.y
    );
  }
}
