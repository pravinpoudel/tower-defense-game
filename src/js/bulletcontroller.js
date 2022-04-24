class BulletController {
  constructor(enemies) {
    this.bullets = [];
    this.enemies = [];
  }

  addBullet(bulletStartX, bulletStartY, creep, power) {
    this.bullets.push(new Bullet(bulletStartX, bulletStartY, creep, power));
  }

  update(timeStamp) {
    let bulletLength = this.bullets.length;
    for (let i = 0; i < bulletLength; i++) {
      if (this.bullets[i]) {
        if (
          this.bullets[i].x < 0 ||
          this.bullets[i].x > canvas.width ||
          this.bullets[i].y < 0 ||
          this.bullets[i].y > canvas.height
        ) {
          this.bullets.splice(i, 1);
          continue;
        }
        if (
          isColliding2(
            this.bullets[i].x,
            this.bullets[i].y,
            5,
            this.bullets[i].targetCreep.player.specs.center.x,
            this.bullets[i].targetCreep.player.specs.center.y,
            Math.floor(this.bullets[i].targetCreep.player.specs.size.x / 2)
          )
        ) {
          this.bullets[i].targetCreep.health -= this.bullets[i].power;
          if (this.bullets[i].targetCreep.health < 0) {
            this.bullets[i].targetCreep.health = 0;
          }
          this.bullets.splice(i, 1);
          continue;
        }
        this.bullets[i].update(timeStamp);
      }
      //if inside the boundary
    }

    this.bullets.forEach((bullet) => {});
    // let bulletLength = this.bullets.length;
    // console.log(this.bullets[bulletLength - 1]);
    // let enemyLength = this.enemies.length;
    // for (let i = 0; i < bulletLength; i++) {
    //   this.bullets[i].update(timeStamp);
    //   for (let j = 0; j < enemyLength; j++) {
    //     if (
    //       enemies[j] &&
    //       this.bullets[i] &&
    //       isEnemyColliding(this.bullets[i], this.enemies[j])
    //     ) {
    //       enemies[j].health -= this.bullets[i].power;
    //       this.projectils.splice(i, 1);
    //     }
    //     if (this.bullets[i] && this.bullets[i].x > canvas.width - 10) {
    //       this.projectils.splice(i, 1);
    //     }
    //   }
    // }
  }

  render() {
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }
}
