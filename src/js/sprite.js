class Sprite {
  constructor(specs) {
    this.specs = specs;
    this.image = new Image();
    this.imageLoaded = false;
    this.image.onload = function () {
      this.imageLoaded = true;
    };
    this.image.src = this.specs.sprite;
    this.rotateRight = this.rotateRight.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.draw = this.draw.bind(this);
    this.drawArc = this.drawArc.bind(this);
  }

  rotateRight(angle) {
    this.specs.rotation += angle;
  }

  rotateLeft(angle) {
    this.specs.rotation -= angle;
  }

  draw() {
    let self = this;
    if (this.image.imageLoaded) {
      self.specs.height = self.image.height;
      self.specs.width = self.image.width / this.specs.spriteCount;
      context.save();
      context.translate(self.specs.center.x, self.specs.center.y);
      context.rotate(self.specs.rotation);
      context.translate(-self.specs.center.x, -self.specs.center.y);
      context.drawImage(
        self.image,
        self.specs.center.x - self.image.width / 2,
        self.specs.center.y - self.image.height / 2,
        self.image.width,
        self.image.height
      );
      context.restore();
    }
  }

  drawArc(angle) {
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.beginPath();
    context.moveTo(this.specs.center.x, this.specs.center.y);
    context.arc(
      this.specs.center.x,
      this.specs.center.y,
      100,
      this.specs.rotation - angle / 2,
      this.specs.rotation + angle / 2
    );
    context.lineTo(this.specs.center.x, this.specs.center.y);
    context.fill();
  }
}
