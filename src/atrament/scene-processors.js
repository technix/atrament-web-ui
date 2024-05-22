// Atrament scene processors

export function sceneListImages(atrament) {
  atrament.game.defineSceneProcessor((scene) => {
    scene.images = [];
    scene.content = scene.content.map(item => {
      if (item.tags.IMAGE) {
        scene.images.push(item.tags.IMAGE);
        item.image = item.tags.IMAGE;
      }
      return item;
    });
  });
}
