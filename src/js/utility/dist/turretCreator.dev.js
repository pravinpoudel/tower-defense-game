"use strict";

function createTower(url, x, y, delay, power) {
  var tower = new Tower({
    baseSprite: "assets/tile-1-center.gif",
    weaponSprite: url,
    center: {
      x: x,
      y: y
    },
    target: {
      x: 300,
      y: 100
    },
    rotateRate: 6 * 3.14159 / 1000,
    // radians per second
    delay: delay,
    power: power
  });
  return tower;
}
//# sourceMappingURL=turretCreator.dev.js.map
