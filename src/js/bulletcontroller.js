class BulletController {
  constructor(enemies) {
    this.bullets = [];
    this.enemies = enemies;
  }

  addBullet(bulletStartX, bulletStartY, creep, power, type) {
    this.bullets.push(
      new Bullet(bulletStartX, bulletStartY, creep, power, type)
    );
  }

  update(timeStamp) {
    console.log(this.enemies.length);
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
          //it is not bomb
          if (this.bullets[i].type == 1) {
            this.bullets[i].targetCreep.health -= this.bullets[i].power;
            if (this.bullets[i].targetCreep.health < 0) {
              this.bullets[i].targetCreep.health = 0;
            }
          }

          //if guided missile; affect in radius of "bombAffectRadius"
          if (this.bullets[i].type == 2) {
            let enemiesLength = this.enemies.length;
            for (let m = 0; m < enemiesLength; m++) {
              if (
                isColliding2(
                  this.bullets[i].x,
                  this.bullets[i].y,
                  bombAffectRadius,
                  this.enemies[m].player.specs.center.x,
                  this.enemies[m].player.specs.center.y,
                  Math.floor(this.enemies[m].player.specs.size.x / 2)
                )
              ) {
                console.log("i am collided with", m);
                this.enemies[m].health -= this.bullets[i].power;
                this.enemies[m].health =
                  this.enemies[m].health < 0 ? 0 : this.enemies[m].health;
              }
            }
          }

          if (this.bullets[i].type == 3) {
            let enemiesLength = this.enemies.length;
            for (let m = 0; m < enemiesLength; m++) {
              // if(enemy is flyover)
              console.log(this.enemies[m].flying);
              if (this.enemies[m].flying) {
                isColliding2(
                  this.bullets[i].x,
                  this.bullets[i].y,
                  5,
                  this.enemies[m].player.specs.center.x,
                  this.enemies[m].player.specs.center.y,
                  Math.floor(this.enemies[m].player.specs.size.x / 2)
                );
                {
                  console.log("i am collided with", m);
                  this.enemies[m].health -= this.bullets[i].power;
                  this.enemies[m].health =
                    this.enemies[m].health < 0 ? 0 : this.enemies[m].health;
                }
              }
            }
          }

          this.bullets.splice(i, 1);
          i--;
          bulletLength--;
          continue;
        }
      }
      this.bullets[i].update(timeStamp);
    }
      //if inside the boundary
    } 

  render() {
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }
}
