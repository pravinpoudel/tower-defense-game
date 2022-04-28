"use strict";

function findShortestLength(startIndex, endIndex) {
  var queue = [];
  var distances = new Array(rows * cols).fill(-1);
  queue.push(startIndex);
  distances[startIndex] = 0;
  var comb1, comb2;

  while (queue.length > 0) {
    var cellIndex = queue.shift();
    var neighbours = [cellIndex - cols, cellIndex + cols];

    if (cellIndex % cols == 0) {
      neighbours.push(cellIndex + 1);
    } else if (cellIndex % cols == cols - 1) {
      neighbours.push(cellIndex - 1);
    } else {
      neighbours.push(cellIndex + 1);
      neighbours.push(cellIndex - 1);
    }

    for (var i = 0; i < neighbours.length; i++) {
      // console.log(
      //   "index",
      //   i,
      //   neighbours[i],
      //   comb1,
      //   removedWallSet.hasOwnProperty(comb1),
      //   comb2,
      //   removedWallSet.hasOwnProperty(comb2)
      // );
      comb1 = neighbours[i] + "_" + cellIndex;
      comb2 = cellIndex + "_" + neighbours[i];

      if (!(removedWallSet[comb1] || removedWallSet[comb2])) {
        neighbours.splice(i, 1);
        i--;
      } else if (!(neighbours[i] < rows * cols && neighbours[i] >= 0)) {
        neighbours.splice(i, 1);
        i--;
      }
    }

    for (var _i = 0; _i < neighbours.length; _i++) {
      if (distances[neighbours[_i]] == -1) {
        distances[neighbours[_i]] = distances[cellIndex] + 1;
        queue.push(neighbours[_i]);

        if (neighbours[_i] == endIndex) {
          return distances;
        }
      }
    }
  }
}

function findShortestPath(startIndex, endIndex) {
  var distances = findShortestLength(startIndex, endIndex);
  var cellIndex = endIndex;
  path.push(endIndex);
  var currentDistance = distances[endIndex];

  while (currentDistance > 0) {
    currentDistance = distances[cellIndex];
    var neighbours = [cellIndex - cols, cellIndex + cols];

    if (cellIndex % cols == 0) {
      neighbours.push(cellIndex + 1);
    } else if (cellIndex % cols == cols - 1) {
      neighbours.push(cellIndex - 1);
    } else {
      neighbours.push(cellIndex + 1);
      neighbours.push(cellIndex - 1);
    }

    for (var i = 0; i < neighbours.length; i++) {
      comb1 = neighbours[i] + "_" + cellIndex;
      comb2 = cellIndex + "_" + neighbours[i];

      if (!(removedWallSet.hasOwnProperty(comb1) || removedWallSet.hasOwnProperty(comb2))) {
        neighbours.splice(i, 1);
        i--;
      } else if (!(neighbours[i] < rows * cols && neighbours[i] >= 0)) {
        neighbours.splice(i, 1);
        i--;
      }
    }

    currentDistance--;

    for (var _i2 = 0; _i2 < neighbours.length; _i2++) {
      if (distances[neighbours[_i2]] == currentDistance) {
        path.push(neighbours[_i2]);
        break;
      }
    }

    cellIndex = path[path.length - 1];
  }

  for (var _i3 = 0, length = path.length; _i3 < length; _i3++) {
    var y = Math.floor(path[_i3] / cols);
    var x = path[_i3] % cols;
    path[_i3] = {
      x: x,
      y: y
    };
  }
}
//# sourceMappingURL=shortestPath.dev.js.map
