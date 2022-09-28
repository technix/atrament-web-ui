import gameStorage from 'localforage';
import { enableSound } from 'src/lib/sound';
import store from 'src/store';
import { autosaveId, autosaveExists, autosaveClear } from 'src/lib/autosave';

let atrament;

async function initAtrament() {
  const { default: Atrament } = await import(/* webpackChunkName: "atrament" */ 'atrament');
  atrament = new Atrament({ storyFile: null });
  atrament.on('saveGame', (p) => gameStorage.setItem(p.id, p));
  atrament.on('loadGame', (id) => gameStorage.getItem(id).then((v) => JSON.stringify(v)));
  atrament.on('loadStory',
    () => import(/* webpackChunkName: "gamefile" */ 'src/game/ink/gamefile')
      .then(({ default: inkJSON }) => inkJSON)
  );
}

function updateSceneStore() {
  const story = atrament.story;
  const ep = story.getCurrentEpisode();
  store.dispatch('game/update', {
    scene: story.getCurrentScene(),
    episode: ep.slice(0, ep.length-1)
  });
}

function renderScene() {
  atrament.renderScene();
  atrament.saveGame(autosaveId);
  updateSceneStore();
}

async function initGame() {
  enableSound(!store.get().sound);
  if (await autosaveExists()) {
    await atrament.loadGame(autosaveId);
    return updateSceneStore();
  }
  await atrament.startGame();
  renderScene();
}
  
function makeChoice(id) {
  atrament.makeChoice(id);
  renderScene();
}

function goto(knot) {
  atrament.goto(knot);
  renderScene();
}


async function initEngine(newGame) {
  console.log('called initEngine');
  if (atrament) {
    return;
  }
  console.log('>>> initAtrament');
  atrament = true;
  if (newGame) {
    // new game; remove autosave
    await autosaveClear();
  }
  await initAtrament();
  await initGame();
}

export {
  initEngine,
  makeChoice,
  goto
}
