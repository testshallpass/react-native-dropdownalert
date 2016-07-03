/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Storage/AsyncStorage.js
 */

function wrap(value, callback) {
  return Promise.resolve(value).then(
    obj => {
      if (callback) {
        callback(null, obj);
      }
      return obj;
    },
    err => {
      if (callback) {
        callback(err);
      }
      throw err;
    }
  );
}

let db = {};

const AsyncStorage = {
  getItem(key, callback) {
    return wrap(db[key], callback);
  },

  setItem(key, value, callback) {
    db[key] = value;
    return wrap(null, callback);
  },

  removeItem(key, callback) {
    delete db[key];
    return wrap(null, callback);
  },

  mergeItem(key, value, callback) {
    db[key] = Object.assign({}, db[key] || {}, value);
    return wrap(null, callback);
  },

  clear(callback) {
    db = {};
    return wrap(null, callback);
  },

  getAllKeys(callback) {
    return wrap(Object.keys(db), callback);
  },

  flushGetRequests() {

  },

  multiGet(keys, callback) {
    return wrap(keys.map(k => [k, db[k]]), callback);
  },

  multiSet(keyValuePairs, callback) {
    keyValuePairs.forEach(([key, value]) => {
      db[key] = value;
    });
    return wrap(null, callback);
  },

  multiRemove(keys, callback) {
    keys.forEach(key => delete db[key]);
    return wrap(null, callback);
  },

  multiMerge(keyValuePairs, callback) {
    keyValuePairs.forEach(([key, value]) => {
      db[key] = Object.asign({}, db[key] || {}, value);
    });
    return wrap(null, callback);
  },
};

module.exports = AsyncStorage;
