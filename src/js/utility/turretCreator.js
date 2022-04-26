function createTower(image, x, y, delay, power, radius, cost, type) {
  let tower = new Tower({
    baseSprite: GameState.assets["base"],
    weaponSprite: image,
    center: { x: x + 25, y: y + 25 },
    target: { x: 300, y: 100 },
    rotateRate: (6 * 3.14159) / 1000, // radians per second
    delay: delay,
    radius: radius,
    power: power,
    cost: cost,
    type: type,
  });
  return tower;
}
