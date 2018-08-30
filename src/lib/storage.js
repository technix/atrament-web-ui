const localstorage = window.localStorage;

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
    const value = localstorage.getItem(this.key(key));
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
    localstorage.setItem(this.key(key), JSON.stringify(object));
  },

  delete(key) {
    localstorage.removeItem(this.key(key));
  },

  exists(key) {
    if (!key) {
      return false;
    }
    return !!localStorage.getItem(this.key(key));
  }
};

export default storage;
