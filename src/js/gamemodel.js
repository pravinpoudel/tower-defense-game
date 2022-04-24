class gameModel {
  constructor(specs, playerEvent, continousMotion) {
    this.specs = specs;
    this.player = playerEvent;

    this.animationTime = 0;
    this.subImageIndex = 0;
    this.subTextureWidth = 0;

    this.image = new Image();
    this.isReady = false;
    this.loadedImage = 0;
    this.secondTime = false;

    this.images = [];
    this.index = 0;
    specs.spriteSheet.forEach((src) => {
      let image = new Image();
      image.src = src;
      image.onload = () => {
        this.loadedImage++;
        if (this.loadedImage == this.specs.spriteCount) this.isReady = true;
      };
      this.images.push(image);
    });

    // this.image.src = this.specs.spriteSheet;
    this.continousMotion = continousMotion;
    this.collided = false;
    this.health = specs.health;
    this.maxHealth = specs.health;
    this.meterWidth = 40;
    this.yoffsetBar = 20;
  }

  update(elapsedTime) {
    this.animationTime += elapsedTime;
    if (this.animationTime >= this.specs.spriteTime[this.subImageIndex]) {
      this.animationTime -= this.specs.spriteTime[this.subImageIndex];
      this.subImageIndex += 1;
      this.subImageIndex = this.subImageIndex % this.specs.spriteCount;
    }
    if (this.continousMotion) {
      this.player.update(elapsedTime);
    }
  }

  reachRight() {
    return this.player.reachRight();
  }

  drawBar(center, width, height, currentHealth, maxHealth) {
    let barHeight = 5;
    context.fillStyle = "red";
    let left = center.x - this.meterWidth / 2;
    let top = center.y - height / 2 - this.yoffsetBar - barHeight;
    context.fillRect(left, top, this.meterWidth, barHeight);
    context.fillStyle = "green";
    let lifeWidth = Math.floor((currentHealth / maxHealth) * this.meterWidth);
    context.fillRect(left, top, lifeWidth, barHeight);
  }

  drawSubTexture(image, index, subTextureWidth, center, rotation, size) {
    context.save();
    context.translate(center.x, center.y);
    context.rotate(rotation);
    context.translate(-center.x, -center.y);
    // context.drawImage(image, this.x, this.y, image.width, image.height);
    context.drawImage(
      image,
      center.x - image.width / 2, // Where to draw the sub-texture
      center.y - image.height / 2,
      image.width,
      image.height
    );
    context.restore();
  }

  render() {
    if (this.isReady) {
      let image = this.images[this.subImageIndex];
      this.drawSubTexture(
        image,
        this.subImageIndex,
        this.subTextureWidth,
        this.player.specs.center,
        this.player.specs.rotation,
        this.player.specs.size
      );
      this.drawBar(
        this.player.specs.center,
        image.width,
        image.height,
        this.health,
        this.maxHealth
      );
      this.secondTime = true;
    }
  }
}
