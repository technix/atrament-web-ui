function Stat (info) {
  Object.defineProperties(this, {
    _info: {
      configurable: false,
      enumerable: false,
      get: function () {
        return JSON.parse(JSON.stringify(info));
      }
    },
    size: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: info.size || 0
    }
  });
}

Stat.prototype.isUnpacked = function isUnpacked () {
  return !!this._info.unpacked;
};

Stat.prototype.isDirectory = function isDirectory () {
  return !!this._info.files;
};

Stat.prototype.isFile = function isFile () {
  return !this._info.files && !this._info.link;
};

Stat.prototype.isSymbolicLink = function isSymbolicLink () {
  return !!this._info.link;
};

export default Stat;
