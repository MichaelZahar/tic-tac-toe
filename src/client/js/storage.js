const key = 'leaderBoard';

export function loadLeaderBoard() {
  const stringData = localStorage[key];

  if (stringData) {
    try {
      return JSON.parse(stringData);
    } catch (error) {
      console.log(error);
    }
  }

  return undefined;
}

export function saveLeaderBoard(leaders) {
  localStorage.setItem(key, JSON.stringify(leaders));
}
