class EnemyController {
  constructor(player) {
    this.enemies = [];
    this.player = player;
    this.render = this.render.bind(this);
    this.createEnemy = this.createEnemy.bind(this);
  }

  createEnemy(positionX, positionY, score) {
    let enemy = new Enemy(positionX, positionY, score);
    this.enemies.push(enemy);
  }

  update(elapsedTime) {
    if (this.enemies.length == 0) {
      // GameState.cancelNextRequest = true;
      // add(score);
      return;
    }

    this.enemies.forEach((enemy, index) => {
      if (
        enemy.y > canvas.height - enemy.height ||
        enemy.x > canvas.width - enemy.width ||
        enemy.x < enemy.width ||
        enemy.y < enemy.height
      ) {
        this.enemies.splice(index, 1);
        return;
      }

      if (isColliding(this.enemies[i], this.player)) {
        score += this.enemies[i].score;
        //play sound
        console.log("collieded with game object");
        GameState.cancelNextRequest = true;
        this.enemies.splice(index, 1);
      }
    });
  }

  render() {
    for (let i = 0; i < this.enemies.length; i += 1) {
      this.enemies[i].render();
    }
  }
}