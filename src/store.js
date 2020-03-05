import { createStore, Provider, connect } from 'unistore/full/preact';
import storage from 'src/lib/storage';

let defaultStore =  {
  // settings
  settings: {
    sound: true,
    volume: 20,
    transcript: false,
    debug: true,
    hyphens: false
  },
  // game
  scene: null,
  episode: null
};

if (storage.exists('settings')) {
  defaultStore.settings = storage.get('settings');
  defaultStore.scene = null;
  defaultStore.episode = null;
}

let store = createStore(defaultStore);

// autosave settings
store.subscribe((state) => {
  storage.set('settings', state.settings);
});

function toggleSetting(state, param) {
  const settings = { ...state.settings };
  settings[param] = !settings[param];
  return { settings };
}

let actions = store => ({
  gameState(state, obj) {
    return obj;
  },
  setSound(state) {
    return toggleSetting(state, 'sound');
  },
  setVolume(state, e) {
    e.preventDefault();
    const settings = { ...state.settings };
    settings.volume = e.target.value;
    return { settings };
  },
  setTranscript(state) {
    return toggleSetting(state, 'transcript');
  },
  setDebug(state) {
    return toggleSetting(state, 'debug');
  },
  setHyphens(state) {
    return toggleSetting(state, 'hyphens');
  }
});

export { Provider, connect, store, actions };
