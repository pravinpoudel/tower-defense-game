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

let levels = [
  new Level([
    new EnemyCreator(3, "left", 1),
    new EnemyCreator(5, "left", 2),
    new EnemyCreator(10, "left", 2),
  ]),
  new Level([
    new EnemyCreator(3, "top", 1),
    new EnemyCreator(5, "top", 2),
    new EnemyCreator(10, "top", 2),
  ]),
  new Level([
    new EnemyCreator(3, "left", 2),
    new EnemyCreator(5, "top", 3),
    new EnemyCreator(10, "left", 3),
  ]),
];
