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

function sceneBackground(scene) {
  const background = scene.tags?.BACKGROUND;
  if (background) {
    scene.images.push(background);
    this.state.setSubkey('game', 'background', background);
  }
  const backgroundPage = scene.tags?.PAGE_BACKGROUND;
  if (backgroundPage) {
    scene.images.push(backgroundPage);
    this.state.setSubkey('game', 'background_page', backgroundPage);
  }
}

export default function registerSceneProcessors(atrament) {
  [sceneListImages, tagDisabledChoices, sceneBackground]
    .forEach((p) => atrament.game.defineSceneProcessor(p.bind(atrament)));
}
