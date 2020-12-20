import gameStorage from 'localforage';
import { enableSound } from 'src/lib/sound';
import store from 'src/store';
import { autosaveId, autosaveExists, autosaveClear } from 'src/lib/autosave';


class GameController {
  async initAtrament() {
    const { default: Atrament } = await import(/* webpackChunkName: "atrament" */ 'atrament');
    const atrament = new Atrament({ storyFile: null });
    atrament.on('saveGame', (p) => gameStorage.setItem(p.id, p));
    atrament.on('loadGame', (id) => gameStorage.getItem(id).then((v) => JSON.stringify(v)));
    atrament.on('loadStory',
      () => import(/* webpackChunkName: "gamefile" */ 'src/game/ink/gamefile')
        .then(({ default: inkJSON }) => inkJSON)
    );
    this.atrament = atrament;
  }

  renderScene() {
    const atrament = this.atrament;
    atrament.renderScene();
    atrament.saveGame(autosaveId);
    this.updateSceneStore();
  }

  updateSceneStore() {
    const story = this.atrament.story;
    const ep = story.getCurrentEpisode();
    store.dispatch('game/update', {
      scene: story.getCurrentScene(),
      episode: ep.slice(0, ep.length-1)
    });
  }

  async initGame() {
    const atrament = this.atrament;
    enableSound(!store.get().sound);
    if (await autosaveExists()) {
      await atrament.loadGame(autosaveId);
      return this.updateSceneStore();
    }
    await atrament.startGame();
    return this.renderScene();
  }
  
  makeChoice(id) {
    this.atrament.makeChoice(id);
    return this.renderScene();
  }

  goto(knot) {
    this.atrament.goto(knot);
    return this.renderScene();
  }

  clearAutoSave() {
    return autosaveClear();
  }
}

export default GameController;
