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
      new EnemyCreator(2, "left", 3, 50),
      new EnemyCreator(2, "left", 3, 50),
      new EnemyCreator(2, "left", 3, 50),
    ]),
    new Level([
      new EnemyCreator(2, "top", 2, 70),
      new EnemyCreator(2, "top", 2, 70),
      new EnemyCreator(2, "top", 2, 70),
    ]),
    new Level([
      new EnemyCreator(2, "left", 3, 100),
      new EnemyCreator(2, "top", 3, 100),
      new EnemyCreator(1, "left", 3, 100),
    ]),
  ];
}
