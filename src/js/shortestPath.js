var shortestPathBinaryMatrix = function (grid) {
  if (grid.length === 0) return -1;
  const queue = [];
  const visited = new Map();
  if (grid[0][0] !== 0) return -1;
  queue.push({ row: 0, col: 0, length: 0 });
  const lastRow = grid.length - 1,
    lastCol = grid[grid.length - 1].length - 1;
  if (grid[lastRow][lastCol] !== 0) return -1;
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
  ];
  let totalLength = Infinity;

  while (queue.length > 0) {
    const {
      row: currentRow,
      col: currentCol,
      length: currentLength,
    } = queue.shift();
    const key = `${currentRow}::${currentCol}`;
    if (
      currentRow === lastRow &&
      currentCol === lastCol &&
      grid[currentRow][currentCol] === 0
    ) {
      totalLength = Math.min(totalLength, currentLength + 1);
      continue;
    }
    if (visited.has(key) === true) continue;
    visited.set(key, true);
    const newLength = currentLength + 1;
    for (let i = 0; i < neighbors.length; i++) {
      const nextRow = currentRow + neighbors[i][0];
      const nextCol = currentCol + neighbors[i][1];
      if (grid[nextRow] && grid[nextRow][nextCol] === 0) {
        queue.push({ row: nextRow, col: nextCol, length: newLength });
      }
    }
  }
  return totalLength === Infinity ? -1 : totalLength;
};
