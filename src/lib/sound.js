import { Howl, Howler } from 'howler';

const soundCache = {};

function enableSound(state) {
  Howler.mute(state);
}

function setVolume(v) {
  Howler.volume(v);
}

function playSound(snd) {
  if (!soundCache[snd]) {
    soundCache[snd] = new Howl({
      src: [ snd ]
    });
  }
  soundCache[snd].play();
}

function playMusic(mus, loop = true) {
  if (!soundCache[mus]) {
    soundCache[mus] = new Howl({
      src: [ mus ],
      html5: true, // streaming
      loop
    });
  }
  soundCache[mus].play();
}

function stopMusic(mus) {
  if (soundCache[mus]) {
    soundCache[mus].stop();
  }
}

export {
  enableSound,
  setVolume,
  playSound,
  playMusic,
  stopMusic
};
