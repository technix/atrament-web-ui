import Atrament from 'atrament';
import cfg from './config.json';
import storage from '_src_/lib/storage';
import sound from '_src_/lib/sound';
import { store } from '_src_/store';


const atrament = new Atrament(cfg);

atrament.on('saveGame', (p) => new Promise((resolve) => {
  storage.set(p.id, p.data);
  resolve();
}));
atrament.on('loadGame', (id) => new Promise((resolve) => {
  resolve(storage.get(id, true));
}));
atrament.on('loadStory', () => import(/* webpackChunkName: "gamefile" */ './ink/gamefile').then(({ default: inkJSON }) => inkJSON));

atrament.registerCommand('IMG', (url) => `<img src="assets/game/${url}">`);
atrament.registerCommand(
  'CLEAR',
  (params, story) => {
    story.clearEpisode(); return false;
  }
);

const engine = {
  startGame() {
    return atrament.startGame();
  },

  renderScene() {
    atrament.renderScene();
    const ep = atrament.story.getCurrentEpisode();
    return {
      scene: atrament.story.getCurrentScene(),
      episode: ep.slice(0, ep.length-1)
    };
  },

  makeChoice(id) {
    return atrament.makeChoice(id);
  },

  saveGame() {
    return atrament.saveGame('auto');
  },

  resumeGame() {
    return atrament.loadGame('auto');
  },

  initGame() {
    sound.mute(!store.getState().sound);
    if (storage.exists('auto')) {
      return this.resumeGame();
    }
    return this.startGame();
  },

  clearSavedGame() {
    storage.delete('auto');
  }
};

export default engine;
