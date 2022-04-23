class Projection {
  constructor(x, y, direction, power) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.width = 10;
    this.height = 10;
    this.power = power;
    this.speed = 50;
  }

  update() {
    this.target;
    this.x += this.direction.x * this.speed * timeStamp * 0.0001;
    this.y += this.direction.y * this.speed * timeStamp * 0.0001;
  }
  draw() {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    context.fill();
  }
}
