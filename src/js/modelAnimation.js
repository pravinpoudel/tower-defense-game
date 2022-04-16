class ModelAnimation {
  constructor(specs, player) {
    this.specs = specs;
    this.player = player;

    this.animationTime = 0;
    this.subImageIndex = 0;
    this.subTextureWidth = 0;

    this.image = new Image();
    this.isReady = false;

    this.secondTime = false;

    this.image.onload = () => {
      this.isReady = true;
      this.subTextureWidth = this.image.width / this.specs.spriteCount;
    };

    this.image.src = this.specs.spriteSheet;
  }

  update(elapsedTime) {
    this.animationTime += elapsedTime;
    if (this.animationTime >= this.specs.spriteTime[this.subImageIndex]) {
      this.animationTime -= this.specs.spriteTime[this.subImageIndex];
      this.subImageIndex += 1;
      this.subImageIndex = this.subImageIndex % this.specs.spriteCount;
    }
  }

  drawTexture(image, center, rotation, size) {
    context.translate(center.x, center.y);
    context.rotate(rotation);
    context.translate(-center.x, -center.y);

    context.drawImage(
      image,
      center.x - size.x / 2,
      center.y - size.y / 2,
      size.x,
      size.y
    );

    context.restore();
  }

  drawSubTexture(image, index, subTextureWidth, center, rotation, size) {
    context.save();
    context.translate(center.x, center.y);
    context.rotate(rotation);
    context.translate(-center.x, -center.y);

    context.drawImage(
      image,
      subTextureWidth * index,
      0, // Which sub-texture to pick out
      subTextureWidth,
      image.height, // The size of the sub-texture
      center.x - size.x / 2, // Where to draw the sub-texture
      center.y - size.y / 2,
      size.x,
      size.y
    );
    context.restore();
  }

  render() {
    if (this.isReady) {
      this.drawSubTexture(
        context,
        this.image,
        this.subImageIndex,
        this.subTextureWidth,
        this.player.specs.center,
        this.player.specs.rotation,
        this.player.specs.size
      );
      this.secondTime = true;
    }
  }
}
