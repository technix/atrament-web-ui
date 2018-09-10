import createStore from 'unistore';
import storage from './lib/storage';

let defaultStore =  {
  // settings
  sound: true,
  volume: 20,
  transcript: false,
  debug: true,
  hyphens: false,
  // game
  scene: null,
  episode: null
};

if (storage.exists('settings')) {
  defaultStore = storage.get('settings');
  defaultStore.scene = null;
  defaultStore.episode = null;
}

let store = createStore(defaultStore);

// autosave settings
store.subscribe((state) => {
  storage.set('settings', state);
});

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
  },
  setHyphens(state) {
    return { hyphens: !state.hyphens };
  }
});

export { store, actions };
