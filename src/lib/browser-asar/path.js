import {
  CHAR_DOT,
  CHAR_FORWARD_SLASH,
  validateString
} from './constants.js';

export function resolve () {
  var args = Array.prototype.slice.call(arguments);
  var resolvedPath = '';
  var resolvedAbsolute = false;

  for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? args[i] : '/';

    validateString(path, 'path');

    // Skip empty entries
    if (path.length === 0) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, '/', isPosixPathSeparator);

  if (resolvedAbsolute) {
    return '/' + resolvedPath;
  }
  return resolvedPath.length > 0 ? resolvedPath : '.';
}

export function normalize (path) {
  validateString(path, 'path');
  if (path.length === 0) { return '.'; }

  var isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  var trailingSeparator =
    path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH;

  // Normalize the path
  path = normalizeString(path, !isAbsolute, '/', isPosixPathSeparator);

  if (path.length === 0) {
    if (isAbsolute) { return '/'; }
    return trailingSeparator ? './' : '.';
  }
  if (trailingSeparator) { path += '/'; }

  return isAbsolute ? ('/' + path) : path;
}

export function isAbsolute (path) {
  validateString(path, 'path');
  return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
}

export function join () {
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 0) { return '.'; }
  var joined;
  for (var i = 0; i < args.length; ++i) {
    var arg = args[i];
    validateString(arg, 'path');
    if (arg.length > 0) {
      if (joined === undefined) { joined = arg; } else { joined += ('/' + arg); }
    }
  }
  if (joined === undefined) { return '.'; }
  return normalize(joined);
}

export function relative (from, to) {
  validateString(from, 'from');
  validateString(to, 'to');

  if (from === to) return '';

  // Trim leading forward slashes.
  from = resolve(from);
  to = resolve(to);

  if (from === to) return '';

  var fromStart = 1;
  var fromEnd = from.length;
  var fromLen = fromEnd - fromStart;
  var toStart = 1;
  var toLen = to.length - toStart;

  // Compare paths to find the longest common path from root
  var length = (fromLen < toLen ? fromLen : toLen);
  var lastCommonSep = -1;
  var i = 0;
  for (; i < length; i++) {
    var fromCode = from.charCodeAt(fromStart + i);
    if (fromCode !== to.charCodeAt(toStart + i)) break;
    else if (fromCode === CHAR_FORWARD_SLASH) lastCommonSep = i;
  }
  if (i === length) {
    if (toLen > length) {
      if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
        // We get here if `from` is the exact base path for `to`.
        // For example: from='/foo/bar'; to='/foo/bar/baz'
        return to.slice(toStart + i + 1);
      }
      if (i === 0) {
        // We get here if `from` is the root
        // For example: from='/'; to='/foo'
        return to.slice(toStart + i);
      }
    } else if (fromLen > length) {
      if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
        // We get here if `to` is the exact base path for `from`.
        // For example: from='/foo/bar/baz'; to='/foo/bar'
        lastCommonSep = i;
      } else if (i === 0) {
        // We get here if `to` is the root.
        // For example: from='/foo/bar'; to='/'
        lastCommonSep = 0;
      }
    }
  }

  var out = '';
  // Generate the relative path based on the path difference between `to`
  // and `from`.
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
      out += out.length === 0 ? '..' : '/..';
    }
  }

  // Lastly, append the rest of the destination (`to`) path that comes after
  // the common path parts.
  return out + to.slice(toStart + lastCommonSep);
}

export function toNamespacedPath (path) {
  // Non-op on posix systems
  return path;
}

export function dirname (path) {
  validateString(path, 'path');
  if (path.length === 0) { return '.'; }
  var hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) { return hasRoot ? '/' : '.'; }
  if (hasRoot && end === 1) { return '//'; }
  return path.slice(0, end);
}

export function basename (path, ext) {
  if (ext !== undefined) validateString(ext, 'ext');
  validateString(path, 'path');
  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
    if (ext === path) { return ''; }
    var extIdx = ext.length - 1;
    var firstNonSlashEnd = -1;
    for (i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === CHAR_FORWARD_SLASH) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          // We saw the first non-path separator, remember this index in case
          // we need it if the extension ends up not matching
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
        }
        if (extIdx >= 0) {
          // Try to match the explicit extension
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              // We matched the extension, so mark this as the end of our path
              // component
              end = i;
            }
          } else {
            // Extension does not match, so our result is the entire path
            // component
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }

    if (start === end) { end = firstNonSlashEnd; } else if (end === -1) { end = path.length; }
    return path.slice(start, end);
  }
  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        start = i + 1;
        break;
      }
    } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) { return ''; }
  return path.slice(start, end);
}

export function extname (path) {
  validateString(path, 'path');
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) {
        startDot = i;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 ||
      end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      (preDotState === 1 &&
      startDot === end - 1 &&
      startDot === startPart + 1)) {
    return '';
  }
  return path.slice(startDot, end);
}

export function format (pathObject) {
  if (pathObject === null || typeof pathObject !== 'object') {
    throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
  }
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || ((pathObject.name || '') + (pathObject.ext || ''));
  if (!dir) {
    return base;
  }
  return dir === pathObject.root ? (dir + base) : (dir + '/' + base);
}

export function parse (path) {
  validateString(path, 'path');

  var ret = { root: '', dir: '', base: '', ext: '', name: '' };
  if (path.length === 0) return ret;
  var isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
  var start;
  if (isAbsolute) {
    ret.root = '/';
    start = 1;
  } else {
    start = 0;
  }
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  var i = path.length - 1;

  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;

  // Get non-dir info
  for (; i >= start; --i) {
    var code = path.charCodeAt(i);
    if (code === CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (end !== -1) {
    var _start = startPart === 0 && isAbsolute ? 1 : startPart;
    if (startDot === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
        startDot === end - 1 &&
        startDot === startPart + 1)) {
      ret.base = ret.name = path.slice(_start, end);
    } else {
      ret.name = path.slice(_start, startDot);
      ret.base = path.slice(_start, end);
      ret.ext = path.slice(startDot, end);
    }
  }

  if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute) ret.dir = '/';

  return ret;
}

export var sep = '/';
export var delimiter = ':';

// Resolves . and .. elements in a path with directory names
function normalizeString (path, allowAboveRoot, separator, isPathSeparator) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code = 0;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) { code = path.charCodeAt(i); } else if (isPathSeparator(code)) { break; } else { code = CHAR_FORWARD_SLASH; }

    if (isPathSeparator(code)) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 ||
            res.charCodeAt(res.length - 1) !== CHAR_DOT ||
            res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = '';
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length !== 0) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? (separator + '..') : '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) { res += (separator + path.slice(lastSlash + 1, i)); } else { res = path.slice(lastSlash + 1, i); }
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function isPosixPathSeparator (code) {
  return code === CHAR_FORWARD_SLASH;
}
