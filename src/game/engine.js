import Atrament from 'atrament';
import cfg from './config.json';
import storage from 'src/lib/storage';
import sound from 'src/lib/sound';
import { store } from 'src/store';


const atrament = new Atrament(cfg);

atrament.on('saveGame', (p) => new Promise((resolve) => {
  storage.set(p.id, p);
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

export function renderScene() {
  atrament.renderScene();
  const ep = atrament.story.getCurrentEpisode();
  store.setState({
    scene: atrament.story.getCurrentScene(),
    episode: ep.slice(0, ep.length-1)
  });
  return atrament.saveGame('auto');
}

export function makeChoice(id) {
  return atrament.makeChoice(id).then(renderScene);
}

export function initGame() {
  sound.mute(!store.getState().sound);
  if (storage.exists('auto')) {
    return atrament.loadGame('auto').then(renderScene);
  }
  return atrament.startGame().then(renderScene);
}

export function clearSavedGame() {
  storage.delete('auto');
}
