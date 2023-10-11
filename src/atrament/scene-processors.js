import { getAssetPath } from "../utils/asar";

// Atrament scene processors

export function sceneAddUuid(atrament) {
  atrament.game.defineSceneProcessor((scene) => {
    scene.uuid = Date.now();
  });
}

export function sceneListImages(atrament) {
  atrament.game.defineSceneProcessor((scene) => {
    scene.images = [];
    scene.content = scene.content.map(item => {
      if (item.tags.IMAGE) {
        const imageFullPath = getAssetPath(item.tags.IMAGE);
        scene.images.push(imageFullPath);
        item.image = imageFullPath;
      }
      return item;
    });
  });
}
