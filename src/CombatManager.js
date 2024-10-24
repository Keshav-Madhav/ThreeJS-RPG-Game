export class CombatManager {
  players = [];

  constructor() {

  }

  addPlayer(player) {
    this.players.push(player);
  }

  async takeTurns() {
    while (true){
      for (const player of this.players){
        let actionPerformed = false;
        do {
          const action = await player.requestAction();
          if( await action.canPerform()) {
            await action.perform();
            actionPerformed = true;
          } else {
            alert('Cannot perform action');
          }
        }
        while (!actionPerformed);
      }
    }
  }
}