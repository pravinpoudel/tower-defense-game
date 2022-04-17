class EnemyController {
  constructor(spec, player) {
    this.enemies = [];
    this.player = player;
    this.top = 50 + 8 * 15;
    this.createRow = this.createRow.bind(this);
    this.thoseHit = [];
    this.doesIntersectintersect = this.doesIntersectintersect.bind(this);
    this.render = this.render.bind(this);
  }

  createEnemy(positionX, positionY, score) {
    let enemy = new Enemy(positionX, positionY, score);
    this.enemies.push(enemy);
  }

  update(elapsedTime) {
    if(this.enemies.length ==0){
      GameState.cancelNextRequest = true;
      addEventListener(score);
      return;
    }

    this.enemies.forEach((enemy, index) => {
      if ( enemy.y > canvas.height - enemy.height || enemy.x > canvas.width-enemy.width || enemy.x< enemy.width || 
        enemy.y< enemy.height) {
        this.enemies.splice(index, 1);
        return;
      }

      if (doesIntersectintersect(this.enemies[i], this.player)){
        score += this.enemies[i].score;
        //play sound
        console.log("collieded with game object")
        GameState.cancelNextRequest = true;
        this.enemies.splice(index, 1);
      }
     }
    }

  render() {
    var row, brick;
    for (row = 0; row < bricks.length; row += 1) {
      for (brick = 0; brick < bricks[row].length; brick += 1) {
        bricks[row][brick].render();
      }
    }
  }
}