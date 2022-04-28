function findShortestLength(startIndex, endIndex) {
  let queue = [];
  let distances = new Array(rows * cols).fill(-1);
  queue.push(startIndex);
  distances[startIndex] = 0;
  let comb1, comb2;
  while (queue.length > 0) {
    let cellIndex = queue.shift();
    let neighbours = [cellIndex - cols, cellIndex + cols];
    if (cellIndex % cols == 0) {
      neighbours.push(cellIndex + 1);
    } else if (cellIndex % cols == cols - 1) {
      neighbours.push(cellIndex - 1);
    } else {
      neighbours.push(cellIndex + 1);
      neighbours.push(cellIndex - 1);
    }

    for (let i = 0; i < neighbours.length; i++) {
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

    for (let i = 0; i < neighbours.length; i++) {
      if (distances[neighbours[i]] == -1) {
        distances[neighbours[i]] = distances[cellIndex] + 1;
        queue.push(neighbours[i]);
        if (neighbours[i] == endIndex) {
          return distances;
        }
      }
    }
  }
}

function findShortestPath(startIndex, endIndex) {
  let distances = findShortestLength(startIndex, endIndex);
  let cellIndex = endIndex;
  path.push(endIndex);
  let currentDistance = distances[endIndex];
  while (currentDistance > 0) {
    currentDistance = distances[cellIndex];
    let neighbours = [cellIndex - cols, cellIndex + cols];
    if (cellIndex % cols == 0) {
      neighbours.push(cellIndex + 1);
    } else if (cellIndex % cols == cols - 1) {
      neighbours.push(cellIndex - 1);
    } else {
      neighbours.push(cellIndex + 1);
      neighbours.push(cellIndex - 1);
    }
    for (let i = 0; i < neighbours.length; i++) {
      comb1 = neighbours[i] + "_" + cellIndex;
      comb2 = cellIndex + "_" + neighbours[i];

      if (
        !(
          removedWallSet.hasOwnProperty(comb1) ||
          removedWallSet.hasOwnProperty(comb2)
        )
      ) {
        neighbours.splice(i, 1);
        i--;
      } else if (!(neighbours[i] < rows * cols && neighbours[i] >= 0)) {
        neighbours.splice(i, 1);
        i--;
      }
    }

    currentDistance--;
    for (let i = 0; i < neighbours.length; i++) {
      if (distances[neighbours[i]] == currentDistance) {
        path.push(neighbours[i]);
        break;
      }
    }
    cellIndex = path[path.length - 1];
  }

  for (let i = 0, length = path.length; i < length; i++) {
    let y = Math.floor(path[i] / cols);
    let x = path[i] % cols;
    path[i] = {
      x,
      y,
    };
  }
}
