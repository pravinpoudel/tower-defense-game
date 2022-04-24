class Tower {
  constructor(spec) {
    this.specs = spec;
    this.baseSprite = new Sprite({
      sprite: spec.baseSprite,
      center: spec.center,
      rotation: 0,
    });
    this.weaponSprite = new Sprite({
      sprite: spec.weaponSprite,
      center: spec.center,
      rotation: 0,
    });
    this.specs.rotation = 0;
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.setTarget = this.setTarget.bind(this);
    this.canShoot = false;
    this.animationTime = 0;
    this.delay = this.specs.delay;
  }

  setTarget(x, y) {
    this.specs.target = {
      x: x,
      y: y,
    };
  }

  update(elapsedTime) {
    let result = computeAngle(
      this.specs.rotation,
      this.specs.center,
      this.specs.target
    );
    if (testTolerance(result.angle, 0, 0.01) === false) {
      if (result.crossProduct > 0) {
        this.weaponSprite.rotateRight(this.specs.rotateRate);
        this.specs.rotation += this.specs.rotateRate;
      } else {
        this.weaponSprite.rotateLeft(this.specs.rotateRate);
        this.specs.rotation -= this.specs.rotateRate;
      }
    }
    this.animationTime += elapsedTime;
    if(this.animationTime > this.specs.delay){
      this.animationTime-= this.specs.delay;
      this.canShoot = true;
    }
    else{
      this.canShoot = false;
    }

  }

  render() {
    this.baseSprite.draw();
    this.weaponSprite.draw();
    // A little hack job to show something interesting.
    this.weaponSprite.drawArc(0.4);
  }
}
