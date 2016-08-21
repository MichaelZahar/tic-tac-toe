import Controller from './Controller';
import Board from './Board';
import leaderBoard from './leaderBoard';
import resultManager from './resultManager';

import '../styles/game.styl';

const SIZE = 20;
const USER = 1;

const containerSelector = '#game';
const gameBoardSelector = '#game-board';
const roundSelector = '#round';

class Game extends Controller {
  constructor(container, gameBoard, round) {
    super(container);

    this.gameBoardElement = document.querySelector(gameBoard);
    this.roundElement = document.querySelector(round);
    this.handleClick();
  }

  handleClick() {
    this.element.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('cell')) {
        if (target.classList.contains('empty')) {
          const index = target.dataset.index;

          this.turn(index, this.player);
        }
      }
    });
  }

  get player() {
    return this.turnIndex % 2 + 1;
  }

  get round() {
    return Math.floor(this.turnIndex / 2) + 1;
  }

  getGameBoardHTML() {
    return this.board.cells.map((cell, index) => {
      let value = '';

      if (cell > 0) {
        value = cell === USER ? '&times;' : '0';
      }

      return `<div class="cell ${!value && 'empty' || ''}" data-index="${index}">${value}</div>`;
    }).join('');
  }

  renderTurn() {
    const turnTitle = this.player === USER ? 'Your turn' : 'Opponent\'s turn';

    this.roundElement.innerHTML = `Round: ${this.round}, ${turnTitle}`;
  }

  render() {
    this.gameBoardElement.innerHTML = this.getGameBoardHTML();
  }

  changeTurn() {
    this.turnIndex++;
    this.renderTurn();

    if (this.player !== USER) {
      // const index = AI.getCellIndex();
      // this.board.setCell(index, this.player);
      const emptyCells = this.board.empties;
      const index = emptyCells[Math.round(Math.random() * (emptyCells.length - 1))];

      this.turn(index, this.player);
    }
  }

  turn(index, player) {
    const result = this.board.setCell(index, player);

    if (result) {
      this.render();

      let isWin = resultManager.isWin(this.board);

      if (isWin) {
        this.finishGame();
      } else {
        this.changeTurn();
      }
    }

    if (!this.startedAt) {
      this.startedAt = Date.now();
    }
  }

  finishGame() {
    this.finishedAt = Date.now();

    if (this.player === USER) {
      const name = prompt('You win! Please enter your name.', 'name');

      if (name && name !== 'name') {
        leaderBoard.addLeader({
          name: name,
          ts: ((this.finishedAt - this.startedAt) / 1000).toFixed(1),
          rounds: this.round
        });

        this.goToLeaderBoard();
        return;
      }
    } else {
      alert('Sorry! You lost.');
    }

    this.goToMainMenu();
  }

  goToLeaderBoard() {
    document.location.hash = '#/leader-board';
  }

  goToMainMenu() {
    document.location.hash = '#/';
  }

  initGame() {
    this.board = new Board(SIZE);
    this.turnIndex = 0;
    this.startedAt = 0;
  }

  open() {
    this.initGame();

    this.show();
    this.renderTurn();
    this.render();
  }
}

export default new Game(containerSelector, gameBoardSelector, roundSelector);
