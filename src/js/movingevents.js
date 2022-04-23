class MovingEvents {
  constructor(specs) {
    this.specs = specs;
    this.moveForward = this.moveForward.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveTop = this.moveTop.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.runTop = this.runTop.bind(this);
    this.runDown = this.runDown.bind(this);
    this.runRight = this.runRight.bind(this);
    this.runLeft = this.runLeft.bind(this);
    this.update = this.update.bind(this);
    this.yDirection = 0;
    this.xDirection = 1;
  }

  moveRight(elapsedTime) {
    this.specs.center.x += this.specs.moveRate * elapsedTime;
  }

  moveLeft(elapsedTime) {
    this.specs.center.x -= this.specs.moveRate * elapsedTime;
  }

  moveTop(elapsedTime) {
    this.specs.center.y -= this.specs.moveRate * elapsedTime;
  }

  moveDown(elapsedTime) {
    this.specs.center.y += this.specs.moveRate * elapsedTime;
  }

  runTop(elapsedTime) {
    this.yDirection = -1;
    this.xDirection = 0;
  }

  runDown(elapsedTime) {
    this.yDirection = 1;
    this.xDirection = 0;
  }

  runRight(elapsedTime) {
    this.xDirection = 1.0;
    this.yDirection = 0;
  }

  runLeft(elapsedTime) {
    this.xDirection = -1.0;
    this.yDirection = 0.0;
  }

  //gaze direction movement
  moveForward(elapsedTime) {
    let vectorX = Math.cos(this.specs.rotation);
    let vectorY = Math.sin(this.specs.rotation);
    this.specs.center.x += vectorX * this.specs.moveRate * elapsedTime;
    this.specs.center.y += vectorY * this.specs.moveRate * elapsedTime;
    //limiting the movement in each direction
    //  this.specs.center.x =
    //     this.specs.center.x >= canvas.clientWidth - 50
    //       ? canvas.clientWidth - 50
    //       : this.specs.center.x;
    //   this.specs.center.x = this.specs.center.x <= 10 ? 10 : this.specs.center.x;
    //   this.specs.center.y =
    //     this.specs.center.y >= canvas.clientHeight - 50
    //       ? canvas.clientHeight - 50
    //       : this.specs.center.x;
    //   this.specs.center.y = this.specs.center.y <= 20 ? 20 : this.specs.center.x;
  }

  rotateLeft(elapsedTime) {
    console.log("rotating left");
    this.specs.rotation -= this.specs.rotateRate * elapsedTime;
  }

  rotateRight(elapsedTime) {
    console.log("rotating right");
    this.specs.rotation += this.specs.rotateRate * elapsedTime;
  }

  update(elapsedTime) {
    if (this.specs.continousSpeed > 0) {
      this.specs.center.x +=
        this.xDirection * this.specs.continousSpeed * elapsedTime * 0.001;
      this.specs.center.y +=
        this.yDirection * this.specs.continousSpeed * elapsedTime * 0.001;
    }

    if (this.specs.center.x < this.specs.size.x / 2) {
      this.specs.center.x = this.specs.size.x / 2;
    }

    if (this.specs.center.x > canvas.width - this.specs.size.x / 2) {
      this.specs.center.x = canvas.width - this.specs.size.x / 2;
    }

    if (this.specs.center.y > canvas.height - this.specs.size.y / 2) {
      this.specs.center.y = canvas.height - this.specs.size.y / 2;
    }

    if (this.specs.center.y < this.specs.size.y / 2) {
      this.specs.center.y = this.specs.size.y / 2;
    }

    // if (that.right > spec.view.width) {
    //   spec.direction.x *= -1;
    // }

    // if (that.left < 0) {
    //   spec.direction.x *= -1;
    // }

    // if (that.top < 0) {
    //   spec.direction.y *= -1;
    // }

    // if (that.bottom > spec.view.height) {
    //   //
    //   // Indicate the ball fell through the bottom
    //   missed = true;
    // }
  }
}
