// Atrament scene processors

function sceneListImages(scene) {
  scene.images = [];
  scene.content = scene.content.map(item => {
    if (item.tags.IMAGE) {
      scene.images.push(item.tags.IMAGE);
      item.image = item.tags.IMAGE;
    }
    return item;
  });
}

function tagDisabledChoices(scene) {
  scene.choices = scene.choices.map(item => {
    if (item.tags.UNCLICKABLE || item.tags.DISABLED || item.tags.INACTIVE) {
      item.disabled = true;
    }
    return item;
  });
}


export default function registerSceneProcessors(atrament) {
  [sceneListImages, tagDisabledChoices]
    .forEach((p) => atrament.game.defineSceneProcessor(p));
}
