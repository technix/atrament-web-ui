// ES6 implementation of
// https://github.com/localForage/localForage-memoryStorageDriver

function getSerializerPromise(localForageInstance) {
  if (getSerializerPromise.result) {
    return getSerializerPromise.result;
  }
  if (!localForageInstance || typeof localForageInstance.getSerializer !== 'function') {
    return Promise.reject(new Error('localforage.getSerializer() was not available! localforage v1.4+ is required!'));
  }
  getSerializerPromise.result = localForageInstance.getSerializer();
  return getSerializerPromise.result;
}

function executeCallback(promise, callback) {
  if (callback) {
    promise.then((result) => callback(null, result), (error) => callback(error));
  }
}

function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

const storageRepository = {};

// Config the localStorage backend, using options set in the config.
function _initStorage(options) {
  const self = this;

  let dbInfo = {};
  if (options) {
    dbInfo = { ...dbInfo, ...options };
  }

  const database = storageRepository[dbInfo.name] = storageRepository[dbInfo.name] || {};
  const table = database[dbInfo.storeName] = database[dbInfo.storeName] || {};
  dbInfo.db = table;

  self._dbInfo = dbInfo;

  return getSerializerPromise(self).then((serializer) => {
    dbInfo.serializer = serializer;
  });
}

function clear(callback) {
  const self = this;
  const promise = self.ready().then(() => {
    const db = self._dbInfo.db;

    for (const key in db) {
      if (hasOwnProperty(db, key)) {
        delete db[key];
      }
    }
  });

  executeCallback(promise, callback);
  return promise;
}

function getItem(key, callback) {
  const self = this;

  // Cast the key to a string, as that's all we can set as a key.
  if (typeof key !== 'string') {
    console.warn(`${key} used as a key, but it is not a string.`);
    key = String(key);
  }

  const promise = self.ready().then(() => {
    const db = self._dbInfo.db;
    let result = db[key];

    if (result) {
      result = self._dbInfo.serializer.deserialize(result);
    }

    return result;
  });

  executeCallback(promise, callback);
  return promise;
}

function iterate(iterator, callback) {
  const self = this;

  const promise = self.ready().then(() => {
    const db = self._dbInfo.db;

    let iterationNumber = 1;
    for (const key in db) {
      if (hasOwnProperty(key)) {
        let value = db[key];

        if (value) {
          value = self._dbInfo.serializer.deserialize(value);
        }

        value = iterator(value, key, iterationNumber++);

        if (value !== void 0) {
          return value;
        }
      }
    }
  });

  executeCallback(promise, callback);
  return promise;
}

function key(n, callback) {
  const self = this;
  const promise = self.ready().then(() => {
    const db = self._dbInfo.db;
    let result = null;
    let index = 0;

    for (const key in db) {
      if (hasOwnProperty(db, key)) {
        if (n === index) {
          result = key;
          break;
        }
        index++;
      }
    }

    return result;
  });

  executeCallback(promise, callback);
  return promise;
}

function keys(callback) {
  const self = this;
  const promise = self.ready().then(() => {
    const db = self._dbInfo.db;
    const keys = [];

    for (const key in db) {
      if (hasOwnProperty(db, key)) {
        keys.push(key);
      }
    }

    return keys;
  });

  executeCallback(promise, callback);
  return promise;
}

function length(callback) {
  const self = this;
  const promise = self.keys().then((keys) => keys.length);

  executeCallback(promise, callback);
  return promise;
}

function removeItem(key, callback) {
  const self = this;

  // Cast the key to a string, as that's all we can set as a key.
  if (typeof key !== 'string') {
    console.warn(`${key} used as a key, but it is not a string.`);
    key = String(key);
  }

  const promise = self.ready().then(() => {
    const db = self._dbInfo.db;
    if (hasOwnProperty(db, key)) {
      delete db[key];
    }
  });

  executeCallback(promise, callback);
  return promise;
}

function setItem(key, value, callback) {
  const self = this;

  // Cast the key to a string, as that's all we can set as a key.
  if (typeof key !== 'string') {
    console.warn(`${key} used as a key, but it is not a string.`);
    key = String(key);
  }

  const promise = self.ready().then(() => {
    // Convert undefined values to null.
    // https://github.com/mozilla/localForage/pull/42
    if (value === undefined) {
      value = null;
    }

    // Save the original value to pass to the callback.
    const originalValue = value;

    function serializeAsync(value) {
      return new Promise((resolve, reject) => {
        self._dbInfo.serializer.serialize(value, (value, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(value);
          }
        });
      });
    }

    return serializeAsync(value).then((value) => {
      const db = self._dbInfo.db;
      db[key] = value;
      return originalValue;
    });
  });

  executeCallback(promise, callback);
  return promise;
}

const memoryStorageDriver = {
  _driver: 'memoryStorageDriver',
  _initStorage,
  // _supports: function() { return true; }
  iterate,
  getItem,
  setItem,
  removeItem,
  clear,
  length,
  key,
  keys
};

export default memoryStorageDriver;