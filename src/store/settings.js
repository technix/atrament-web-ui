import settingsStorage from 'localforage';

export default function settingsStore(store) {
  async function loadSettings() {
    const savedSettings = await settingsStorage.getItem('settings');
    if (savedSettings) {
      store.dispatch('settings/load', savedSettings);
    }
  }
  
  // Initial state
  store.on('@init', () => {
    loadSettings();
    // return default settings on init
    return {
      sound: true,
      volume: 20
    };
  });
  // Reducers returns only changed part of the state
  store.on('switch/sound', ({ sound }) => ({ sound: !sound }));
  store.on('set/volume', (s, volume) => ({ volume }));
  // load/save settings
  store.on('settings/load', (s, settings) => settings);
  store.on('settings/save', () => {
    const state = store.get();
    settingsStorage.setItem('settings', {
      sound: state.sound,
      volume: state.volume
    });
  });
}
