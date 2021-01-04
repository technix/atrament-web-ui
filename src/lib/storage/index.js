/* global DB_UUID */
import localforage from 'localforage';
import memoryDriver from 'src/lib/storage/localforage-memory';

localforage.config({
  name: DB_UUID
});

localforage.defineDriver(memoryDriver);
localforage.setDriver([localforage.INDEXEDDB, localforage.LOCALSTORAGE, memoryDriver._driver]);
