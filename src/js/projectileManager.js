class ProjectileManager {
  constructor(enemies) {
    this.projectils = [];
    this.enemies = [];
  }

  update() {
    let projectileLength = this.projectils.length;
    let enemyLength = this.enemies.length;
    for (let i = 0; i < this.projectils.length; i++) {
      this.projectils[i].update();
      for (let j = 0; j < enemyLength; j++) {
        if (
          enemies[j] &&
          this.projectils[i] &&
          isEnemyColliding(this.projectils[i], this.enemies[j])
        ) {
          enemies[j].health -= this.projectils[i].power;
          this.projectils.splice(i, 1);
        }
        if (this.projectils[i] && this.projectils[i].x > canvas.width - 10) {
          this.projectils.splice(i, 1);
        }
      }
    }
  }
}
