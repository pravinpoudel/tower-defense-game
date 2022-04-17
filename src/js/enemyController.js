class EnemyController {
  constructor(spec) {
    (this.bricks = []), (this.top = 50 + 8 * 15);
    this.createRow = this.createRow.bind(this);
    this.thoseHit = [];
    this.doesIntersectintersect = this.doesIntersectintersect.bind(this);
    this.render = this.render.bind(this);
  }

  createRow(rowTop, score, color) {
    var leftover =
        canvas.width -
        Constants.BricksPerRow *
          Math.trunc((Constants.BrickWidthPercent / 100) * canvas.width),
      left = leftover / 2,
      brick = 0,
      brickRow = bricks.length;
    this.bricks.push([]);
    for (brick = 0; brick < 5; brick += 1) {
      this.bricks[brickRow].push(
        new Brick({
          color: color,
          position: { left: left, top: rowTop },
          score: score,
          view: canvas.width,
        })
      );
      left = this.bricks[brickRow][bricks[brickRow].length - 1].right;
    }
  }

  doesIntersectintersect(gameObject) {
    let self = this;
    self.thoseHit = [];
    var row, brick, intersectAll, intersectRow;

    // Step 1: See if we can reject all of the bricks first
    let intersectAll = intersectRectangles(gameObject, {
      left: self.bricks[0][0].left,
      right: self.bricks[0][bricks[0].length - 1].right,
      top: self.bricks[bricks.length - 1][0].top,
      bottom: self.bricks[0][0].bottom,
    });

    if (intersectAll) {
      for (row = 0; row < bricks.length; row += 1) {
        intersectRow = intersectRectangles(gameObject, {
          left: self.bricks[row][0].left,
          right: self.bricks[row][bricks[row].length - 1].right,
          top: self.bricks[row][0].top,
          bottom: self.bricks[row][0].bottom,
        });

        if (intersectRow) {
          for (brick = 0; brick < bricks[row].length; brick += 1) {
            if (self.bricks[row][brick].doesIntersectintersect(gameObject)) {
              this.thoseHit.push(bricks[row][brick]);
            }
          }
        }
      }
    }
  }

  update(elapsedTime) {
    doesIntersectintersect(playerModel);
    if (this.thoseHit.length > 0) {
      //move gameObject in opposite direction
      //create particle effects
    }
    for (brick = 0; brick < this.thoseHit.length; brick += 1) {
      this.particleSmoke.createEffect({
        left: this.thoseHit[brick].left,
        right: this.thoseHit[brick].right,
        top: this.thoseHit[brick].top,
        bottom: this.thoseHit[brick].bottom,
      });
    }
    //
    // Update score based upon the bricks hit
    for (brick = 0; brick < bricksHit.length; brick += 1) {
      score += this.bricksHit[brick].score;
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

//code to make this row
createRow(top, 1, "rgba(255, 255, 0, 1)");
createRow(bricks[0][0].top - Constants.BrickHeight, 1, "rgba(255, 255, 0, 1)");
createRow(bricks[1][0].top - Constants.BrickHeight, 2, "rgba(255, 165, 0, 1)");
createRow(bricks[2][0].top - Constants.BrickHeight, 2, "rgba(255, 165, 0, 1)");
createRow(bricks[3][0].top - Constants.BrickHeight, 3, "rgba(0, 0, 255, 1)");
createRow(bricks[4][0].top - Constants.BrickHeight, 3, "rgba(0, 0, 255, 1)");
createRow(bricks[5][0].top - Constants.BrickHeight, 5, "rgba(0, 255, 0, 1)");
createRow(bricks[6][0].top - Constants.BrickHeight, 5, "rgba(0, 255, 0, 1)");
