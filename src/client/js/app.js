import mainMenu from './mainMenu';
import game from './game';
import leaderBoard from './leaderBoard';

const app = {
  statesMap: {
    '/': mainMenu,
    '#/game': game,
    '#/leader-board': leaderBoard
  },

  init() {
    this.currentState = document.location.hash;

    this.handleStateChange();
    this.setState(document.location.hash);
  },

  handleStateChange() {
    window.addEventListener('hashchange', () => {
      this.setState(document.location.hash);
    }, false);
  },

  setState(value) {
    const oldValue = this.state;
    let newValue = value;

    if (oldValue === newValue) {
      return;
    }

    const isValid = !!this.statesMap[newValue];

    if (!isValid) {
      newValue = '/';
    }

    if (oldValue) {
      this.statesMap[oldValue].hide();
    }

    this.statesMap[newValue].open();

    this.state = newValue;
  }
};

export default app;
