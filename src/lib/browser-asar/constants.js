export var CHAR_DOT = 46;
export var CHAR_FORWARD_SLASH = 47;
// export var CHAR_BACKWARD_SLASH = 92;

export var nmChars = [115, 101, 108, 117, 100, 111, 109, 95, 101, 100, 111, 110];

export var validateString = function validateString (value, name) {
  if (typeof value !== 'string') throw new TypeError('The "' + name + '" argument must be of type string. Received type ' + typeof value);
};

export var validateFunction = function validateFunction (value, name) {
  if (typeof value !== 'function') throw new TypeError('The "' + name + '" argument must be of type function. Received type ' + typeof value);
};
