import { interfaces } from '../utils/interfaces';
import { getConfig } from '../utils/config';
import { emit } from '../utils/emitter';

const handlers = {
  mute: (oldValue, newValue) => interfaces().sound.mute(newValue),
  volume: (oldValue, newValue) => interfaces().sound.setVolume(newValue)
};

async function load() {
  const { state, persistent } = interfaces();
  // load default values first
  const defaultSettings = JSON.parse(JSON.stringify(getConfig().settings)); // TODO use deep copy here
  // load values from save if exist
  let savedSettings = {};
  const existSavedSettings = await persistent.exists('settings');
  if (existSavedSettings) {
    savedSettings = await persistent.get('settings');
  }
  // save app settings to state
  const settings = { ...defaultSettings, ...savedSettings };
  state.setKey('settings', settings);
  runHandlers();
  emit('settings/load', settings);
}

async function save() {
  const { state, persistent } = interfaces();
  const appState = state.get();
  await persistent.set('settings', appState.settings);
  emit('settings/save', appState.settings);
}

function get(name) {
  const value = interfaces().state.get().settings[name];
  emit('settings/get', { name, value });
  return value;
}

function set(name, newValue) {
  const { state } = interfaces();
  const oldValue = state.get().settings[name];
  state.setSubkey('settings', name, newValue);
  if (handlers[name]) {
    handlers[name](oldValue, newValue);
  }
  emit('settings/set', { name, value: newValue });
}

function toggle(name) {
  const oldValue = get(name);
  set(name, !oldValue);
}

function defineHandler(key, handlerFn) {
  handlers[key] = handlerFn;
}

function runHandlers() {
  const currentSettings = interfaces().state.get().settings;
  Object.entries(currentSettings).forEach(([k, v]) => {
    if (handlers[k]) {
      handlers[k](null, v);
    }
  });
}

export default {
  load,
  save,
  get,
  set,
  toggle,
  defineHandler,
  runHandlers
};
