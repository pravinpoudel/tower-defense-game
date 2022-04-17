class ParticleSystem {
  constructor(spec) {
    this.specs = spec;
    this.image = this.specs.image;
    this.nextName = 1;
    this.particles = {};
    this.createEffect = this.createEffect.bind(this);
    this.makeParticle = this.makeParticle.bind(this);
    this.drawTexture = this.drawTexture.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  createEffect() {
    let self = this;
    var x,
      y,
      deltaX = (self.specs.right - self.specs.left) / 10,
      deltaY = (self.specs.bottom - self.specs.top) / 10,
      posX,
      posY;

    self.specs.speed = {
      mean: 40,
      stdev: 25,
    };

    self.specs.lifetime = {
      mean: 2000,
      stdev: 500,
    };
    for (x = 0; x < 10; x++) {
      posX = Math.trunc(self.specs.left + x * deltaX);
      for (y = 0; y < 10; y++) {
        posY = Math.trunc(self.specs.top + y * deltaY);
        self.particles[self.nextName++] = self.makeParticle(
          self.specs,
          posX,
          posY
        );
      }
    }
  }

  makeParticle(specs, x, y) {
    let self = this;
    var p = {
      image: self.image,
      size: Math.abs(Random.nextGaussian(10, 4)),
      center: { x: x, y: y },
      direction: { x: 0, y: Math.abs(Random.nextGaussian(1, 0.25)) },
      speed: Math.abs(Random.nextGaussian(specs.speed.mean, specs.speed.stdev)), // pixels per second
      rotation: 0,
      lifetime: Math.abs(
        Random.nextGaussian(specs.lifetime.mean, specs.lifetime.stdev)
      ), // How long the particle should live, in milliseconds
      alive: 0, // How long the particle has been alive, in milliseconds
    };

    return p;
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

  update(elapsedTime) {
    var removeMe = [],
      value,
      particle;
    for (value in this.particles) {
      if (this.particles.hasOwnProperty(value)) {
        particle = this.particles[value];
        particle.center.x +=
          (elapsedTime / 1000) * particle.speed * particle.direction.x;
        particle.center.y +=
          (elapsedTime / 1000) * particle.speed * particle.direction.y;

        particle.rotation += particle.speed / 500;
        particle.alive += elapsedTime;
        if (particle.alive > particle.lifetime) {
          removeMe.push(value);
        }
      }
    }

    for (particle = 0; particle < removeMe.length; particle++) {
      delete this.particles[removeMe[particle]];
    }
  }

  render() {
    let self = this;
    Object.getOwnPropertyNames(self.particles).forEach(function (value) {
      let particle = self.particles[value];
      self.drawTexture(
        self.specs.image,
        particle.center,
        particle.rotation,
        particle.size
      );
    });
  }
}
