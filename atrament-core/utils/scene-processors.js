import toArray from './to-array';

function $processTag(scene, tag, store) {
  if (!scene[store]) {
    scene[store] = [];
  }
  scene.content = scene.content.map((paragraph) => {
    if (!paragraph[store]) {
      paragraph[store] = [];
    }
    const processedTag = paragraph.tags?.[tag];
    if (processedTag) {
      const t = toArray(processedTag);
      scene[store] = [...scene[store], ...t];
      paragraph[store] = [...paragraph[store], ...t];
    }
    return paragraph;
  });
}

function tagDisabledChoices(scene) {
  scene.choices = scene.choices.map((choice) => {
    if (choice.tags.UNCLICKABLE || choice.tags.DISABLED || choice.tags.INACTIVE) {
      choice.disabled = true;
    }
    return choice;
  });
}

export default [
  (scene) => $processTag(scene, 'IMAGE', 'images'),
  (scene) => $processTag(scene, 'AUDIO', 'sounds'),
  (scene) => $processTag(scene, 'PLAY_SOUND', 'sounds'),
  (scene) => $processTag(scene, 'AUDIOLOOP', 'music'),
  (scene) => $processTag(scene, 'PLAY_MUSIC', 'music'),
  tagDisabledChoices
];
