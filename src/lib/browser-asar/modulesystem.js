import { validateString, validateFunction } from './constants.js';
import Filesystem from './filesystem.js';
import { createModuleClass, globalBuiltins, requireModule, injectModule, extendModule } from './module.js';
import * as path from './path.js';

function defineProperty (o, key, value) {
  return Object.defineProperty(o, key, {
    configurable: false,
    writable: false,
    enumerable: true,
    value: value
  });
}

/**
 * @constructor
 * @param {Filesystem | Uint8Array} bufferOrfs - ASAR buffer or Filesystem object
 */
function Modulesystem (bufferOrfs) {
  if (!(this instanceof Modulesystem)) {
    return new Modulesystem(bufferOrfs);
  }
  var fs;
  if (bufferOrfs instanceof Filesystem) {
    fs = bufferOrfs;
  } else if (bufferOrfs instanceof Uint8Array) {
    fs = new Filesystem(bufferOrfs);
  } else {
    throw new TypeError('The "bufferOrfs" argument must be an instance of Filesystem or Uint8Array.');
  }
  this.mainModule = null;
  this.builtins = Object.create(null);
  defineProperty(this.builtins, 'fs', fs);
  var makeRequireFunction = (function (ms) {
    return function makeRequireFunction (mod) {
      var Module = mod.constructor;
      var require = function require (path) {
        return mod.require(path);
      };

      function resolve (request) {
        validateString(request, 'request');
        return Module._resolveFilename(request, mod, false);
      }

      require.resolve = resolve;

      function paths (request) {
        validateString(request, 'request');
        return Module._resolveLookupPaths(request, mod);
      }

      resolve.paths = paths;
      require.main = ms.mainModule;
      require.extensions = Module._extensions;
      require.cache = Module._cache;

      return require;
    };
  })(this);
  defineProperty(this.builtins, 'module', createModuleClass(fs, makeRequireFunction));
}

/**
 * Run an asar package like a Node.js project.
 * @param {string=} entry - entry module path
 * @returns {any} module.exports of entry module
 */
Modulesystem.prototype.run = function run (entry) {
  entry = entry !== undefined ? entry : '/';
  validateString(entry);

  var Module = this.builtins.module;
  var entryPath = Module._resolveFilename(entry, null, true);
  var module = Module._cache[entryPath] = new Module(entryPath, null);
  module.filename = entryPath;
  module.paths = Module._nodeModulePaths(path.dirname(entryPath));
  this.mainModule = module;
  try {
    Module._extensions[path.extname(entryPath)](module, entryPath);
  } catch (err) {
    delete Module._cache[entryPath];
    this.mainModule = null;
    throw err;
  }
  module.loaded = true;

  return module.exports;
};

/**
 * Require builtin module.
 * @param {string} moduleName - module name
 * @returns {any}
 */
Modulesystem.prototype.require = function require (moduleName) {
  validateString(moduleName, 'moduleName');
  if (moduleName in this.builtins) {
    return this.builtins[moduleName];
  }
  if (moduleName in globalBuiltins) {
    return globalBuiltins[moduleName];
  }
  throw new Error('Cannot find module \'' + moduleName + '\'. ');
};

/**
 * Inject builtin module that can be required in asar package.
 * @param {string} moduleName - module name
 * @param {any} m - function or any value
 */
Modulesystem.prototype.inject = function inject (moduleName, m) {
  validateString(moduleName, 'moduleName');
  if (typeof m === 'function') {
    var module = { exports: {} };
    m.call(module.exports, module.exports, this.require.bind(this), module);
    this.builtins[moduleName] = module.exports;
  } else {
    this.builtins[moduleName] = m;
  }
};

/**
 * Handle custom file format.
 * @param {string} ext - extension
 * @param {(this: Modulesystem, require: (this: Modulesystem, moduleName: string) => any) => (module: InstanceType<ReturnType<createModuleClass>>, filename: string) => void} compilerFactory - how to load file
 */
Modulesystem.prototype.extend = function extend (ext, compilerFactory) {
  validateString(ext, 'ext');
  validateFunction(compilerFactory, 'compilerFactory');
  this.builtins.module._extensions[ext] = compilerFactory.call(this, this.require.bind(this));
};

/**
 * Run an asar package like a Node.js project.
 * @param {Filesystem} fs - Filesystem object
 * @param {string=} entry - entry module path
 * @returns {any} module.exports of entry module
 */
Modulesystem.run = function run (fs, entry) {
  var ms = new Modulesystem(fs);
  return ms.run(entry);
};

/**
 * Require global builtin module.
 * @param {string} moduleName - module name
 * @returns {any}
 */
Modulesystem.require = function require (moduleName) {
  return requireModule(moduleName);
};

/**
 * Inject global builtin module that can be required in asar package.
 * @param {string} moduleName - module name
 * @param {any} m - function or any value
 */
Modulesystem.inject = function inject (moduleName, m) {
  injectModule(moduleName, m);
};

/**
 * Handle custom file format.
 * @param {string} ext - extension
 * @param {(require: (moduleName: string) => any) => (module: InstanceType<ReturnType<createModuleClass>>, filename: string) => void} compilerFactory - how to load file
 */
Modulesystem.extend = function extend (ext, compilerFactory) {
  extendModule(ext, compilerFactory);
};

export default Modulesystem;
