// Atrament scene processors

export function sceneListImages(atrament) {
  atrament.game.defineSceneProcessor((scene) => {
    scene.images = [];
    scene.content = scene.content.map(item => {
      if (item.tags.IMAGE) {
        const imageFullPath = atrament.game.getAssetPath(item.tags.IMAGE);
        scene.images.push(imageFullPath);
        item.image = imageFullPath;
      }
      return item;
    });
  });
}
