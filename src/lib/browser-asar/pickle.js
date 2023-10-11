import { toString, readInt32LE, readUInt32LE, slice, alloc } from './buffer.js';
// Extract from chromium-pickle-js 0.2.0

// sizeof(T).
var SIZE_INT32 = 4;
var SIZE_UINT32 = 4;
// var SIZE_INT64 = 8
// var SIZE_UINT64 = 8
// var SIZE_FLOAT = 4
// var SIZE_DOUBLE = 8

// The allocation granularity of the payload.
// var PAYLOAD_UNIT = 64

// Largest JS number.
var CAPACITY_READ_ONLY = 9007199254740992;

// Aligns 'i' by rounding it up to the next multiple of 'alignment'.
var alignInt = function (i, alignment) {
  return i + (alignment - (i % alignment)) % alignment;
};

// PickleIterator reads data from a Pickle. The Pickle object must remain valid
// while the PickleIterator object is in use.
var PickleIterator = (function () {
  function PickleIterator (pickle) {
    this.payload = pickle.header;
    this.payloadOffset = pickle.headerSize;
    this.readIndex = 0;
    this.endIndex = pickle.getPayloadSize();
  }

  PickleIterator.prototype.readBool = function () {
    return this.readInt() !== 0;
  };

  PickleIterator.prototype.readInt = function () {
    return this.readBytes(SIZE_INT32, readInt32LE);
  };

  PickleIterator.prototype.readUInt32 = function () {
    return this.readBytes(SIZE_UINT32, readUInt32LE);
  };

  PickleIterator.prototype.readString = function () {
    return toString(this.readBytes(this.readInt()));
  };

  PickleIterator.prototype.readBytes = function (length, method) {
    var readPayloadOffset = this.getReadPayloadOffsetAndAdvance(length);
    if (method != null) {
      return method(this.payload, readPayloadOffset, length);
    } else {
      return slice(this.payload, readPayloadOffset, readPayloadOffset + length);
    }
  };

  PickleIterator.prototype.getReadPayloadOffsetAndAdvance = function (length) {
    if (length > this.endIndex - this.readIndex) {
      this.readIndex = this.endIndex;
      throw new Error('Failed to read data with length of ' + length);
    }
    var readPayloadOffset = this.payloadOffset + this.readIndex;
    this.advance(length);
    return readPayloadOffset;
  };

  PickleIterator.prototype.advance = function (size) {
    var alignedSize = alignInt(size, SIZE_UINT32);
    if (this.endIndex - this.readIndex < alignedSize) {
      this.readIndex = this.endIndex;
    } else {
      this.readIndex += alignedSize;
    }
  };

  return PickleIterator;
})();

// This class provides facilities for basic binary value packing and unpacking.
//
// The Pickle class supports appending primitive values (ints, strings, etc.)
// to a pickle instance.  The Pickle instance grows its internal memory buffer
// dynamically to hold the sequence of primitive values.   The internal memory
// buffer is exposed as the "data" of the Pickle.  This "data" can be passed
// to a Pickle object to initialize it for reading.
//
// When reading from a Pickle object, it is important for the consumer to know
// what value types to read and in what order to read them as the Pickle does
// not keep track of the type of data written to it.
//
// The Pickle's data has a header which contains the size of the Pickle's
// payload.  It can optionally support additional space in the header.  That
// space is controlled by the header_size parameter passed to the Pickle
// constructor.
var Pickle = (function () {
  function Pickle (buffer) {
    if (buffer) {
      this.initFromBuffer(buffer);
    } else {
      throw new TypeError('buffer required.');
    }
  }

  Pickle.prototype.initFromBuffer = function (buffer) {
    this.header = buffer;
    this.headerSize = buffer.length - this.getPayloadSize();
    this.capacityAfterHeader = CAPACITY_READ_ONLY;
    this.writeOffset = 0;
    if (this.headerSize > buffer.length) {
      this.headerSize = 0;
    }
    if (this.headerSize !== alignInt(this.headerSize, SIZE_UINT32)) {
      this.headerSize = 0;
    }
    if (this.headerSize === 0) {
      this.header = alloc(0);
    }
  };

  Pickle.prototype.createIterator = function () {
    return new PickleIterator(this);
  };

  Pickle.prototype.toBuffer = function () {
    return slice(this.header, 0, this.headerSize + this.getPayloadSize());
  };

  Pickle.prototype.getPayloadSize = function () {
    return readUInt32LE(this.header, 0);
  };

  return Pickle;
})();

export function createFromBuffer (buffer) {
  return new Pickle(buffer);
}
