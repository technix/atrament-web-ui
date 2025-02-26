// Atrament scene processors
import arrayShuffle from "src/utils/array-shuffle";


function sceneBackground(scene) {
  // BACKGROUND and PAGE_BACKGROUND can be set to false, so we check if variable is defined
  const background = scene.tags?.BACKGROUND;
  if (typeof background !== 'undefined') {
    scene.images.push(background);
    this.state.setSubkey('game', 'background', background);
  }
  const backgroundPage = scene.tags?.PAGE_BACKGROUND;
  if (typeof backgroundPage !== 'undefined') {
    scene.images.push(backgroundPage);
    this.state.setSubkey('game', 'background_page', backgroundPage);
  }
}

function shuffleChoices(scene) {
  if (scene.tags?.SHUFFLE_CHOICES) {
    scene.choices = arrayShuffle(scene.choices);
  }
}

export default function registerSceneProcessors(atrament) {
  [sceneBackground, shuffleChoices]
    .forEach((p) => atrament.game.defineSceneProcessor(p.bind(atrament)));
}
