// Atrament scene processors

function sceneListImages(scene) {
  scene.images = [];
  scene.content = scene.content.map(item => {
    item.images = [];
    if (item.tags.IMAGE) {
      if (Array.isArray(item.tags.IMAGE)) {
        scene.images = [...scene.images, ...item.tags.IMAGE];
        item.images = item.tags.IMAGE;
      } else {
        scene.images.push(item.tags.IMAGE);
        item.images = [item.tags.IMAGE];
      }
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

export default function registerSceneProcessors(atrament) {
  [sceneListImages, tagDisabledChoices, sceneBackground]
    .forEach((p) => atrament.game.defineSceneProcessor(p.bind(atrament)));
}
