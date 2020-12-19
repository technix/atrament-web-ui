/* global DB_UUID */
import localforage from 'localforage';
import memoryDriver from 'src/lib/localforage-memory';

localforage.config({
  name: DB_UUID
});

localforage.defineDriver(memoryDriver);
localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE, memoryDriver._driver]);
// localforage.setDriver(memoryDriver._driver);
