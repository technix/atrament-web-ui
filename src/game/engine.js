import Atrament from 'atrament';
import cfg from './config.json';
import storage from '../lib/storage';
import sound from '../lib/sound';
import { store } from '../store';


const atrament = new Atrament(cfg);

atrament.on('saveGame', (p) => new Promise((resolve) => {
  storage.set(p.id, p.data);
  resolve();
}));
atrament.on('loadGame', (id) => new Promise((resolve) => {
  resolve(storage.get(id, true));
}));
atrament.on('loadStory', () => fetch(cfg.episodes[0]).then((r) => r.json()));

atrament.registerCommand('IMG', (url) => `<img src="assets/game/${url}">`);
atrament.registerCommand(
  'CLEAR',
  (params, episode) => {
    episode.reset(); return false;
  },
  ['episode']
);

const engine = {
  gameState: {},

  renderer(renderCb) {
    this.renderer = renderCb;
  },

  startGame() {
    return atrament.startGame();
  },

  renderScene() {
    atrament.renderScene();
    const ep = atrament.getCurrentEpisode();
    this.gameState = {
      scene: atrament.getCurrentScene(),
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
