var Brickout = {
  pages: {},
};

// ------------------------------------------------------------------
//
// This namespace provides the rendering code for the game.
//
// ------------------------------------------------------------------
Brickout.graphics = (function () {
  "use strict";

  var canvas = document.getElementById("canvas-main"),
    context = canvas.getContext("2d");

  //
  // Place a 'clear' function on the Canvas prototype, this makes it a part
  // of the canvas, rather than making a function that calls and does it.
  CanvasRenderingContext2D.prototype.clear = function () {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.clearRect(0, 0, canvas.width, canvas.height);
    this.restore();
  };

  //------------------------------------------------------------------
  //
  // Public method that allows the client code to clear the canvas.
  //
  //------------------------------------------------------------------
  function clear() {
    context.clear();
  }

  //------------------------------------------------------------------
  //
  // Draws a rectangle
  //
  //------------------------------------------------------------------
  function drawRectangle(spec) {
    context.fillStyle = spec.fill;
    context.fillRect(spec.x, spec.y, spec.width, spec.height);

    context.strokeStyle = spec.stroke;
    context.strokeRect(spec.x, spec.y, spec.width, spec.height);
  }

  //------------------------------------------------------------------
  //
  // Returns the width of the specified text, in pixels.
  //
  //------------------------------------------------------------------
  function measureTextWidth(spec) {
    context.save();

    context.font = spec.font;
    context.fillStyle = spec.fill;
    if (spec.hasOwnProperty("stroke")) {
      context.strokeStyle = spec.stroke;
    }
    var width = context.measureText(spec.text).width;

    context.restore();

    return width;
  }

  //------------------------------------------------------------------
  //
  // Returns the height of the specified text, in pixels.
  //
  //------------------------------------------------------------------
  function measureTextHeight(spec) {
    var saveText = spec.text;

    spec.text = "m"; // Clever trick to get font height
    context.save();

    context.font = spec.font;
    context.fillStyle = spec.fill;
    if (spec.hasOwnProperty("stroke")) {
      context.strokeStyle = spec.stroke;
    }
    var width = context.measureText(spec.text).width;
    spec.text = saveText;

    context.restore();

    return width;
  }

  //------------------------------------------------------------------
  //
  // Draw some text to the screen
  //
  //------------------------------------------------------------------
  function drawText(spec) {
    context.save();

    (context.font = spec.font), (context.fillStyle = spec.fill);
    if (spec.hasOwnProperty("stroke")) {
      context.strokeStyle = spec.stroke;
    }
    context.textBaseline = "top";

    context.fillText(spec.text, spec.position.x, spec.position.y);
    context.strokeText(spec.text, spec.position.x, spec.position.y);

    context.restore();
  }

  //------------------------------------------------------------------
  //
  // Expose an ability to draw an image/texture on the canvas.
  //
  //------------------------------------------------------------------
  function drawImage(spec) {
    context.save();

    context.translate(spec.center.x, spec.center.y);
    context.rotate(spec.rotation);
    context.translate(-spec.center.x, -spec.center.y);

    context.drawImage(
      spec.image,
      spec.center.x - spec.size / 2,
      spec.center.y - spec.size / 2,
      spec.size,
      spec.size
    );

    context.restore();
  }

  return {
    clear: clear,
    drawRectangle: drawRectangle,
    drawText: drawText,
    drawImage: drawImage,
    measureTextWidth: measureTextWidth,
    measureTextHeight: measureTextHeight,
  };
})();

function ParticleSystem(graphics) {
  "use strict";
  var that = {},
    image = new Image(),
    particles = {}, // Set of all active particles
    nextName = 1; // Unique identifier for the next particle

  //------------------------------------------------------------------
  //
  // Create a bunch of particles over the surface of the brick.
  //
  //------------------------------------------------------------------
  that.createEffect = function (spec) {
    var x,
      y,
      deltaX = (spec.right - spec.left) / 10,
      deltaY = (spec.bottom - spec.top) / 10, // bottom - top : remember that Y is position down the screen
      posX,
      posY;

    spec.speed = {
      mean: 20, // pixels per second
      stdev: 2,
    };
    spec.lifetime = {
      mean: spec.mean,
      stdev: spec.stdev,
    };

    //
    // Create particles over the area of the brick
    for (x = 0; x < spec.count; x++) {
      posX = Math.trunc(spec.left + x * deltaX);
      for (y = 0; y < spec.count; y++) {
        posY = Math.trunc(spec.top + y * deltaY);
        //
        // Assign a unique name to each particle
        particles[nextName++] = makeParticle(spec, posX, posY);
      }
    }
  };

  //------------------------------------------------------------------
  //
  // This creates one new particle
  //
  //------------------------------------------------------------------
  function makeParticle(spec, x, y) {
    var p = {
      image: image,
      size: Math.abs(Random.nextGaussian(10, 4)),
      center: { x: x, y: y },
      direction: { x: spec.xDirection, y: spec.yDirection },
      speed: Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.stdev)), // pixels per second
      rotation: 0,
      lifetime: Math.abs(
        Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
      ), // How long the particle should live, in milliseconds
      alive: 0, // How long the particle has been alive, in milliseconds
    };
    if (spec.guassian) {
      p.direction = { x: 0, y: Math.abs(Random.nextGaussian(1, 0.25)) };
    }
    return p;
  }

  //------------------------------------------------------------------
  //
  // Update the state of all particles.  This includes removing any that
  // have exceeded their lifetime.
  //
  //------------------------------------------------------------------
  that.update = function (elapsedTime) {
    var removeMe = [],
      value,
      particle;
    for (value in particles) {
      if (particles.hasOwnProperty(value)) {
        particle = particles[value];
        //
        // Update its position
        particle.center.x +=
          (elapsedTime / 1000) * particle.speed * particle.direction.x;
        particle.center.y +=
          (elapsedTime / 1000) * particle.speed * particle.direction.y;

        //
        // Rotate proportional to its speed
        particle.rotation += particle.speed / 500;

        //
        // Update how long it has been alive
        particle.alive += elapsedTime;

        //
        // If the lifetime has expired, identify it for removal
        if (particle.alive > particle.lifetime) {
          removeMe.push(value);
        }
      }
    }

    //
    // Remove all of the expired particles
    for (particle = 0; particle < removeMe.length; particle++) {
      delete particles[removeMe[particle]];
    }
  };

  //------------------------------------------------------------------
  //
  // Initially empty, will be replaced when the texture is loaded
  //
  //------------------------------------------------------------------
  that.render = function () {};

  image = GameState.assets["smoke"];
  that.render = function () {
    var value, particle;

    for (value in particles) {
      if (particles.hasOwnProperty(value)) {
        particle = particles[value];
        graphics.drawImage(particle);
      }
    }
  };

  return that;
}

let particleSystem = ParticleSystem(
  Brickout.graphics,
  GameState.assets["fire"]
);
let particleSystem2 = ParticleSystem(
  Brickout.graphics,
  GameState.assets["smoke"]
);

function makeParticle2(
  left,
  right,
  top,
  bottom,
  count,
  xDirection,
  yDirection,
  mean,
  stdev,
  gaussian
) {
  particleSystem2.createEffect({
    left: left,
    right: right,
    top: top,
    bottom: bottom,
    count: count,
    xDirection: xDirection,
    yDirection: yDirection,
    mean: mean,
    stdev: stdev,
    gaussian: gaussian,
  });
}

function makeParticle1(
  left,
  right,
  top,
  bottom,
  count,
  xDirection,
  yDirection,
  mean,
  stdev,
  gaussian
) {
  particleSystem.createEffect({
    left: left,
    right: right,
    top: top,
    bottom: bottom,
    count: count,
    xDirection: xDirection,
    yDirection: yDirection,
    mean: mean,
    stdev: stdev,
    gaussian: gaussian,
  });
}

function creepDied(x, y) {
  makeParticle2(x, x + 25, y, y + 25, 10, 0, 0, 800, 200, true);
}

function trailFollow(x, y, xDirection, yDirection) {
  makeParticle1(
    x,
    x + 5,
    y,
    y + 5,
    1,
    xDirection,
    yDirection,
    1000,
    250,
    false
  );
}

function bombHit(x, y, radius) {
  makeParticle2(
    x - radius / 4,
    x + radius / 4,
    y - radius / 4,
    y + radius / 4,
    5,
    0,
    0,
    1000,
    200,
    true
  );
}

function towerSold(x, y) {
  makeParticle2(x, x + 50, y, y + 50, 5, 0, 0, 1000, 200, true);
}
