export default class Board {
  constructor(size = 20, cells) {
    this.size = size;
    this.cells = this.initCells(cells || []);
  }

  initCells(cells) {
    const length = Math.pow(this.size, 2);

    if (!cells || cells.length < length) {
      return Array.apply(null, { length: length }).map(() => 0);
    }

    return cells;
  }

  get empties() {
    return this.cells.reduce((result, cell, index) => {
      if (cell === 0) {
        result.push(index);
      }

      return result;
    }, []);
  }

  setCell(index, value) {
    if (this.cells[index] === 0) {
      this.cells[index] = value;
      return true;
    }

    return false;
  }
}
