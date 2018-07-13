import createStore from 'unistore';

let store = createStore(
  {
    sound: true,
    volume: 20,
    transcript: false,
    debug: true
  }
);

let actions = store => ({
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
