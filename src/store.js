import createStore from 'unistore';

let store = createStore(
  {
    // settings
    sound: true,
    volume: 20,
    transcript: false,
    debug: true,
    // game
    scene: null,
    episode: null
  }
);

let actions = store => ({
  gameState(state, obj) {
    return obj;
  },
  setSound(state) {
    return { sound: !state.sound };
  },
  setVolume(state, e) {
    e.preventDefault();
    return { volume: e.target.value };
  },
  setTranscript(state) {
    return { transcript: !state.transcript };
  },
  setDebug(state) {
    return { debug: !state.debug };
  }
});

export { store, actions };
