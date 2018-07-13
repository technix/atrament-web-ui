import Atrament from 'atrament';
import cfg from './config.json';

const atrament = new Atrament(cfg);

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
  }
};

export default engine;