export function boardsMatch(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
    return false;
  }

  for (let rowIndex = 0; rowIndex < left.length; rowIndex += 1) {
    const leftRow = left[rowIndex];
    const rightRow = right[rowIndex];

    if (!Array.isArray(leftRow) || !Array.isArray(rightRow) || leftRow.length !== rightRow.length) {
      return false;
    }

    for (let colIndex = 0; colIndex < leftRow.length; colIndex += 1) {
      if (Number(leftRow[colIndex]) !== Number(rightRow[colIndex])) {
        return false;
      }
    }
  }

  return true;
}
