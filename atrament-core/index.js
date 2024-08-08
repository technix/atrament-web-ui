import { interfaces, defineInterfaces } from './utils/interfaces';
import { getConfig, setConfig } from './utils/config';
import { emitter, emit } from './utils/emitter';

import game from './components/game';
import ink from './components/ink';
import settings from './components/settings';

// @atrament/core version
const version = '2.0.0';

/*
Initialize engine:
- save global config
- initialize persistent storage
- if persistent settings found: load settings
- save settings to application state
- initialize sound
*/
async function init(InkStory, cfg) {
  emit('atrament/init');
  const { persistent } = interfaces();
  // save global configuration
  setConfig(InkStory, cfg);
  // initialize persistent storage
  persistent.init(getConfig().applicationID);
  // load app settings from storage
  await settings.load();
}

export default {
  get interfaces() {
    return interfaces();
  },
  defineInterfaces,
  init,
  get state() {
    return interfaces().state;
  },
  get store() {
    return interfaces().state.store();
  },
  on: (event, callback) => emitter.on(event, callback),
  off: (event, callback) => emitter.off(event, callback),
  // sub-objects
  game,
  ink,
  settings,
  version
};
