class Level {
  constructor(enemyCreators) {
    this.wave = -1;
    this.enemyCreators = enemyCreators;
  }

  sendNextWave() {
    this.wave++;
    return this.enemyCreators[this.wave];
  }
}

let levels = null;
function createLevels() {
  levels = [
    new Level([
      new EnemyCreator(5, "left", 2),
      new EnemyCreator(5, "left", 3),
      new EnemyCreator(10, "left", 3),
    ]),
    new Level([
      new EnemyCreator(5, "top", 2),
      new EnemyCreator(10, "top", 3),
      new EnemyCreator(15, "left", 3),
      new EnemyCreator(15, "top", 3),
    ]),
    new Level([
      new EnemyCreator(10, "left", 3),
      new EnemyCreator(17, "top", 3),
      new EnemyCreator(21, "left", 3),
    ]),
  ];
}
