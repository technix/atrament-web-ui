import cfg from './config.json';

const localstorage = window.localStorage;

function keyName(key) {
  return `${cfg.uuid}/${key}`;
}

const storage = {
  get(key, isRaw) {
    let item;
    const value = localstorage.getItem(keyName(key));
    if (isRaw) {
      return value;
    }
    try {
      item = JSON.parse(value);
    } catch (e) {
      item = {};
    }
    return item;
  },

  set(key, object) {
    localstorage.setItem(keyName(key), JSON.stringify(object));
  },

  delete(key) {
    localstorage.removeItem(keyName(key));
  },

  exists(key) {
    if (!key) {
      return false;
    }
    return !!localStorage.getItem(keyName(key));
  }
};

export default storage;
