"use strict";

var shortestPathBinaryMatrix = function shortestPathBinaryMatrix(grid) {
  if (grid.length === 0) return -1;
  var queue = [];
  var visited = new Map();
  if (grid[0][0] !== 0) return -1;
  queue.push({
    row: 0,
    col: 0,
    length: 0
  });
  var lastRow = grid.length - 1,
      lastCol = grid[grid.length - 1].length - 1;
  if (grid[lastRow][lastCol] !== 0) return -1;
  var neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1]];
  var totalLength = Infinity;

  while (queue.length > 0) {
    var _queue$shift = queue.shift(),
        currentRow = _queue$shift.row,
        currentCol = _queue$shift.col,
        currentLength = _queue$shift.length;

    var key = "".concat(currentRow, "::").concat(currentCol);

    if (currentRow === lastRow && currentCol === lastCol && grid[currentRow][currentCol] === 0) {
      totalLength = Math.min(totalLength, currentLength + 1);
      continue;
    }

    if (visited.has(key) === true) continue;
    visited.set(key, true);
    var newLength = currentLength + 1;

    for (var i = 0; i < neighbors.length; i++) {
      var nextRow = currentRow + neighbors[i][0];
      var nextCol = currentCol + neighbors[i][1];

      if (grid[nextRow] && grid[nextRow][nextCol] === 0) {
        queue.push({
          row: nextRow,
          col: nextCol,
          length: newLength
        });
      }
    }
  }

  return totalLength === Infinity ? -1 : totalLength;
};
//# sourceMappingURL=shortestPath.dev.js.map
