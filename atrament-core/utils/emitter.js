import mitt from 'mitt';

export const emitter = mitt();
export const emit = (...args) => emitter.emit(...args);
