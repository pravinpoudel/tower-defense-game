class Bullet {
  constructor(x, y, creep, power, type) {
    this.x = x;
    this.y = y;
    this.direction = null;
    this.width = 2;
    this.height = 2;
    this.radius = 5;
    this.power = power;
    this.type = type;
    this.speed = 200;
    this.targetCreep = creep;
    this.findDirection = this.findDirection.bind(this);
  }

  findDirection() {
    let self = this;
    let direction = {
      x: self.targetCreep.player.specs.center.x - self.x,
      y: self.targetCreep.player.specs.center.y - self.y,
    };
    self.direction = normalize(direction);
    if (this.type == 2 || this.type == 3) {
      console.log(self.x, self.y, self.direction.x, self.direction.y);
      trailFollow(self.x, self.y, self.direction.x, self.direction.y);
    }

  }

  update(timeStamp) {
    this.findDirection();
    this.x += this.direction.x * this.speed * timeStamp * 0.001;
    this.y += this.direction.y * this.speed * timeStamp * 0.001;
  }

  draw() {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}
