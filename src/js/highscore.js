class HighScore {
  constructor() {
    this.scores = [];
    this.previousScores = localStorage.getItem(Constants.StorageName);
    if (this.previousScores) {
      this.scores = JSON.parse(this.previousScores);
    }
  }

  add(score) {
    this.scores.push(score);
    this.scores.sort(function (a, b) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      }
      return 0;
    });

    if (this.scores.length > Constants.MaxScoreCount) {
      this.scores = this.scores.slice(0, Constants.MaxScoreCount);
    }

    localStorage[ConstantSourceNode.StorageName] = JSON.stringify(scores);
  }

  getScore() {
    return this.scores;
  }
}
