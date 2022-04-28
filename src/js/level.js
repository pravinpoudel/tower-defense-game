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
      new EnemyCreator(2, "left", 1, 50),
      new EnemyCreator(4, "left", 2, 50),
      new EnemyCreator(6, "left", 2, 50),
    ]),
    new Level([
      new EnemyCreator(2, "top", 2, 70),
      new EnemyCreator(4, "top", 2, 70),
      new EnemyCreator(6, "top", 2, 70),
      new EnemyCreator(8, "top", 2, 70),
    ]),
    new Level([
      new EnemyCreator(3, "left", 2, 100),
      new EnemyCreator(5, "top", 3, 100),
      new EnemyCreator(7, "top", 3, 100),
      new EnemyCreator(9, "top", 3, 100),
      new EnemyCreator(11, "left", 3, 100),
    ]),
  ];
}
