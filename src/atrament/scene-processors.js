// Atrament scene processors
import arrayShuffle from "src/utils/array-shuffle";
import getImagesFromContent from "src/utils/get-images-from-content";

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

function sceneMarkupImages(scene) {
  // get image URLs from [img] and [picture], so they can be preloaded
  const images = getImagesFromContent(scene.content?.map((item) => item.text));
  scene.images.push(...images);
}

export default function registerSceneProcessors(atrament) {
  [sceneBackground, shuffleChoices, sceneMarkupImages]
    .forEach((p) => atrament.game.defineSceneProcessor(p.bind(atrament)));
}
