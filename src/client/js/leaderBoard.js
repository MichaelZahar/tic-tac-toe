import Controller from './Controller';
import {
  loadLeaderBoard,
  saveLeaderBoard
} from './storage';

import '../styles/leader-board.styl';

const selectorContainer = '#leader-board';
const selectorTable = '#leader-board tbody';

class LeaderBoard extends Controller {
  constructor(selector) {
    super(selector);

    this.leaders = loadLeaderBoard() || [];
    this.tbody = document.querySelector(selectorTable);
  }

  addLeader(result) {
    this.leaders.push(result);
    this.leaders = this.leaders.sort((a, b) => {
      if (a.ts > b.ts) {
        return 1;
      }

      if (a.ts < b.ts) {
        return -1;
      }

      return 0;
    });

    saveLeaderBoard(this.leaders);
  }

  getHTML(leaders) {
    if (leaders.length > 0) {
      return leaders.map((leader) => {
        return `<tr>
          <td>${leader.name}</td>
          <td>${leader.ts}</td>
          <td>${leader.rounds}</td>
        </tr>`;
      }).join('');
    }

    return '<tr><td colspan="3">There aren\'t any leaders yet!</td></tr>';
  }

  render() {
    this.tbody.innerHTML = this.getHTML(this.leaders);
  }
}

export default new LeaderBoard(selectorContainer);
