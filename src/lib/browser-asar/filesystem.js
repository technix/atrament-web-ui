import { basename, dirname, join } from './path.js';
import { slice, toString } from './buffer.js';
import { createFromBuffer } from './pickle.js';
import Stat from './stat.js';

/**
 * @constructor
 * @param {Uint8Array} buffer - ASAR buffer
 */
function Filesystem (buffer) {
  if (!(this instanceof Filesystem)) {
    return new Filesystem(buffer);
  }

  if (!(buffer instanceof Uint8Array)) {
    throw new TypeError('The "buffer" argument must be an instance of Uint8Array.');
  }

  var size;
  var headerBuf;
  var sizeBuf = slice(buffer, 0, 8);

  var sizePickle = createFromBuffer(sizeBuf);
  size = sizePickle.createIterator().readUInt32();
  headerBuf = slice(buffer, 8, 8 + size);

  var headerPickle = createFromBuffer(headerBuf);
  var header = headerPickle.createIterator().readString();

  Object.defineProperties(this, {
    buffer: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: buffer
    },
    headerSize: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: size
    }
  });

  /** @type {{ files: { [item: string]: any } }} */
  this.header = JSON.parse(header);
}

function searchNodeFromDirectory (filesystem, p) {
  p = join('.', p);
  if (p === './') {
    p = '.';
  }
  var json = filesystem.header;
  var dirs = p.split('/');
  for (var i = 0; i < dirs.length; i++) {
    var dir = dirs[i];
    if (dir !== '.') {
      json = json.files[dir];
    }
  }
  return json;
}

/**
 * @method
 * @param {{ isPack?: boolean }=} options
 * @returns {string[]}
 */
Filesystem.prototype.listFiles = function listFiles (options) {
  var files = [];
  var fillFilesFromHeader = function (p, json) {
    if (!json.files) {
      return;
    }
    return (function () {
      var result = [];
      for (var f in json.files) {
        var fullPath = join(p, f);
        var packState = json.files[f].unpacked === true ? 'unpack' : 'pack  ';
        files.push((options && options.isPack) ? (packState + ' : ' + fullPath) : fullPath);
        result.push(fillFilesFromHeader(fullPath, json.files[f]));
      }
      return result;
    })();
  };

  fillFilesFromHeader('/', this.header);
  return files;
};

function getNode (filesystem, p) {
  var node;
  try {
    node = searchNodeFromDirectory(filesystem, dirname(p));
  } catch (_) {
    throw new Error('No such file or directory: ' + p);
  }
  if (!node) {
    throw new Error('No such file or directory: ' + p);
  }
  var name = basename(p);
  if (name) {
    if (node.files) {
      return node.files[name];
    } else {
      throw new Error('No such file or directory: ' + p);
    }
  } else {
    return node;
  }
}

function getFile (filesystem, p, followLinks) {
  followLinks = typeof followLinks === 'undefined' ? true : followLinks;
  var info = getNode(filesystem, p);
  if (!info) {
    throw new Error('No such file or directory: ' + p);
  }
  // if followLinks is false we don't resolve symlinks
  if (info.link && followLinks) {
    return getFile(filesystem, info.link);
  } else {
    return info;
  }
}

/**
 * @type {((p: string) => Uint8Array) & ((p: string, toUtf8: true) => string)}
 */
Filesystem.prototype.readFileSync = function readFileSync (p, toUtf8) {
  var info = getFile(this, p);
  if (info.size <= 0) { return new Uint8Array(0); }
  if (info.unpacked) {
    throw new Error('Cannot read unpacked file.');
  }
  var offset = 8 + this.headerSize + parseInt(info.offset);
  var buf = new Uint8Array(slice(this.buffer, offset, offset + info.size));
  if (toUtf8) {
    return toString(buf);
  } else {
    return buf;
  }
};

/**
 * @method
 * @param {string} p - path
 * @returns {string[]}
 */
Filesystem.prototype.readdirSync = function readdirSync (p) {
  var info = getNode(this, p);
  if (!info.files) {
    throw new Error('Not a directory: ' + p);
  }
  var res = [];
  for (var dir in info.files) {
    res.push(dir);
  }
  return res;
};

/**
 * @method
 * @param {string} p - path
 * @returns {boolean}
 */
Filesystem.prototype.existsSync = function existsSync (p) {
  if (p === '.') {
    p = '/';
  }
  try {
    if (getNode(this, p)) {
      return true;
    }
    return false;
  } catch (_) {
    return false;
  }
};

/**
 * @method
 * @param {string} p - path
 * @returns {Stat}
 */
Filesystem.prototype.statSync = function statSync (p) {
  var info = getFile(this, p, true);
  return new Stat(info);
};

/**
 * @method
 * @param {string} p - path
 * @returns {Stat}
 */
Filesystem.prototype.lstatSync = function lstatSync (p) {
  var info = getFile(this, p, false);
  return new Stat(info);
};

export default Filesystem;
