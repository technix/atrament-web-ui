import { Howl, Howler } from 'howler';

const soundCache = {};

const sound = {
  mute(state) {
    Howler.mute(state);
  },

  setVolume(v) {
    Howler.volume(v);
  },

  play(snd) {
    if (!soundCache[snd]) {
      soundCache[snd] = new Howl({
        src: [ snd ]
      });
    }
    soundCache[snd].play();
  },

  playMusic(mus) {
    if (!soundCache[mus]) {
      soundCache[mus] = new Howl({
        src: [ mus ],
        html5: true, // streaming
        loop: true
      });
    }
    soundCache[mus].play();
  }
};

export default sound;
