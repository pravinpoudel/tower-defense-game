"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParticleSystem =
/*#__PURE__*/
function () {
  function ParticleSystem(spec) {
    _classCallCheck(this, ParticleSystem);

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

  _createClass(ParticleSystem, [{
    key: "createEffect",
    value: function createEffect() {
      var self = this;
      var x,
          y,
          deltaX = (self.specs.right - self.specs.left) / 10,
          deltaY = (self.specs.bottom - self.specs.top) / 10,
          posX,
          posY;
      self.specs.speed = {
        mean: 40,
        stdev: 25
      };
      self.specs.lifetime = {
        mean: 2000,
        stdev: 500
      };

      for (x = 0; x < 10; x++) {
        posX = Math.trunc(self.specs.left + x * deltaX);

        for (y = 0; y < 10; y++) {
          posY = Math.trunc(self.specs.top + y * deltaY);
          self.particles[self.nextName++] = self.makeParticle(self.specs, posX, posY);
        }
      }
    }
  }, {
    key: "makeParticle",
    value: function makeParticle(specs, x, y) {
      var self = this;
      var p = {
        image: self.image,
        size: Math.abs(Random.nextGaussian(10, 4)),
        center: {
          x: x,
          y: y
        },
        direction: {
          x: 0,
          y: Math.abs(Random.nextGaussian(1, 0.25))
        },
        speed: Math.abs(Random.nextGaussian(specs.speed.mean, specs.speed.stdev)),
        // pixels per second
        rotation: 0,
        lifetime: Math.abs(Random.nextGaussian(specs.lifetime.mean, specs.lifetime.stdev)),
        // How long the particle should live, in milliseconds
        alive: 0 // How long the particle has been alive, in milliseconds

      };
      return p;
    }
  }, {
    key: "drawTexture",
    value: function drawTexture(image, center, rotation, size) {
      context.translate(center.x, center.y);
      context.rotate(rotation);
      context.translate(-center.x, -center.y);
      context.drawImage(image, center.x - size.x / 2, center.y - size.y / 2, size.x, size.y);
      context.restore();
    }
  }, {
    key: "update",
    value: function update(elapsedTime) {
      var removeMe = [],
          value,
          particle;

      for (value in this.particles) {
        if (this.particles.hasOwnProperty(value)) {
          particle = this.particles[value];
          particle.center.x += elapsedTime / 1000 * particle.speed * particle.direction.x;
          particle.center.y += elapsedTime / 1000 * particle.speed * particle.direction.y;
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
  }, {
    key: "render",
    value: function render() {
      var self = this;
      Object.getOwnPropertyNames(self.particles).forEach(function (value) {
        var particle = self.particles[value];
        self.drawTexture(self.specs.image, particle.center, particle.rotation, particle.size);
      });
    }
  }]);

  return ParticleSystem;
}();
//# sourceMappingURL=particleSystem.dev.js.map
