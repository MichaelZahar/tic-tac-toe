const winLineLength = 5;

const getColls = (board) => {
  const size = board.size;
  const result = [];

  for (let i = 0; i < size; i += 1) {
    result[i] = [];
    for (let j = 0; j < size; j += 1) {
      result[i].push(board.cells[i + j * size]);
    }
  }

  return result;
};

const getRows = (board) => {
  const size = board.size;
  const cells = board.cells.length;
  const result = [];

  let index = 0;

  while (index < cells) {
    result.push(board.cells.slice(index, index + size));
    index += size;
  }

  return result;
};

const getDiagonal = (cells, startIndex, size, nextIndex) => {
  const maxIndex = cells.length;
  const result = [];

  let index = startIndex;

  while (index < maxIndex) {
    result.push(cells[index]);
    index = nextIndex(index, size);
  }

  return result;
};

const addDiagonals = (cells, size, minLength) => {
  const result = [];
  let i = 0;

  while (size - i >= minLength) {
    result.push(
      getDiagonal(
        cells,
        i,
        size,
        (index, s) => index + s + 1
      )
    );

    if (i !== 0) {
      result.push(
        getDiagonal(
          cells,
          i * size,
          size,
          (index, s) => index + s + 1
        )
      );
    }

    i += 1;
  }

  return result;
};

const getDiagonals = (board, minLength) => {
  const size = board.size;
  const cells = board.cells;
  const mirrorCells = getRows(board).reduce((result, row) => result.concat(row.reverse()), []);

  return [
    ...addDiagonals(cells, size, minLength),
    ...addDiagonals(mirrorCells, size, minLength)
  ];
};

const resultManager = {
  isWin(board) {
    const lines = [
      ...getRows(board),
      ...getColls(board),
      ...getDiagonals(board, winLineLength)
    ];

    for (let i = 0, length = lines.length; i < length; i += 1) {
      let count = 0;
      let player = 0;
      let line = lines[i];

      for (let j = 0, len = line.length; j < len; j += 1) {
        let curPlayer = line[j];

        if (curPlayer === 0) {
          count = 0;
          player = 0;
        } else {
          if (curPlayer === player || player === 0) {
            count += 1;
          } else {
            count = 0;
          }

          player = curPlayer;
        }

        if (count >= winLineLength) {
          return true;
        }
      }
    }

    return false;
  },

  isDraw(board) {
    const isWin = this.isWin(board);

    return !isWin && board.empties.length === 0;
  }
};

export default resultManager;
