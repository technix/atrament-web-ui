// Atrament scene processors
import arrayShuffle from "src/utils/array-shuffle";
import getMarkupRegex from 'src/utils/get-markup-regex';

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

const imageRegexes = [getMarkupRegex('img'), getMarkupRegex('picture')];

function precacheImages(scene) {
  // get image URLs from [img] and [picture], so they can be preloaded
  const images = {};
  scene.content?.forEach((content) => {
    imageRegexes.forEach((regex) => {
      content.text?.match(regex.matcher)?.forEach((item) => {
        const parsed = item.match(regex.parser);
        images[parsed[2]] = true;
      });
    })
  });
  scene.images.push(...Object.keys(images));
}

export default function registerSceneProcessors(atrament) {
  [sceneBackground, shuffleChoices, precacheImages]
    .forEach((p) => atrament.game.defineSceneProcessor(p.bind(atrament)));
}
