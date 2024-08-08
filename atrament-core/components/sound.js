import { interfaces } from '../utils/interfaces';
import toArray from '../utils/to-array';

export function playSound(snd) {
  const { sound, loader } = interfaces();
  toArray(snd).forEach(
    (file) => sound.playSound(loader.getAssetPath(file))
  );
}

export function stopSound(snd) {
  const { sound, loader } = interfaces();
  toArray(snd).forEach(
    (file) => sound.stopSound(file ? loader.getAssetPath(file) : null)
  );
}

export function playMusic(mus) {
  const { sound, state, loader } = interfaces();
  const currentMusic = state.get().game.$currentMusic || [];
  toArray(mus).forEach((file) => {
    sound.playMusic(loader.getAssetPath(file));
    currentMusic.push(file);
  });
  state.setSubkey('game', '$currentMusic', currentMusic);
}

export function playSingleMusic(mus) {
  const { sound, state, loader } = interfaces();
  sound.stopMusic();
  const file = toArray(mus).pop();
  sound.playMusic(loader.getAssetPath(file));
  state.setSubkey('game', '$currentMusic', [file]);
}

export function stopMusic(mus) {
  const { sound, state, loader } = interfaces();
  let currentMusic = state.get().game.$currentMusic || [];
  toArray(mus).forEach((file) => {
    if (file) {
      sound.stopMusic(loader.getAssetPath(file));
      currentMusic = currentMusic.filter((m) => m !== file);
    } else {
      sound.stopMusic();
      currentMusic = [];
    }
  });
  state.setSubkey('game', '$currentMusic', currentMusic);
}
