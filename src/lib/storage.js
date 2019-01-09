function testStorage (storage) {
  try {
    const key = '__atrament_ui_set_random_key__';
    storage.setItem(key, key);
    storage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

let store = {
  storage: {},
  getItem(key) {
    return this.storage[key];
  },
  setItem(key, value) {
    this.storage[key] = value;
  },
  removeItem(key) {
    delete this.storage[key];
  }
};

// if localStorage is available, use it instead of in-memory storage
if ('localStorage' in window && testStorage(window.localStorage)) {
  store = window.localStorage;
}

const storage = {
  uuid: '',

  setUUID(uuid) {
    this.uuid = uuid;
  },
  
  key(k) {
    return `${this.uuid}/${k}`;
  },

  get(key, isRaw) {
    let item;
    const value = store.getItem(this.key(key));
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
    store.setItem(this.key(key), JSON.stringify(object));
  },

  delete(key) {
    store.removeItem(this.key(key));
  },

  exists(key) {
    if (!key) {
      return false;
    }
    return !!localStorage.getItem(this.key(key));
  }
};

export default storage;
