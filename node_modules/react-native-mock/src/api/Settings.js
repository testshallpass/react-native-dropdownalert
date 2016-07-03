import invariant from 'invariant';
import DeviceEventEmitter from '../plugins/DeviceEventEmitter';

const subscriptions = [];

const Settings = {
  _settings: {},

  get(key) {
    return this._settings[key];
  },

  set(settings) {
    this._settings = Object.assign(this._settings, settings);
  },

  watchKeys(keys, callback) {
    let newKeys = keys;
    if (typeof keys === 'string') {
      newKeys = [keys];
    }

    invariant(
      Array.isArray(newKeys),
      'keys should be a string or array of strings'
    );

    const sid = subscriptions.length;
    subscriptions.push({ keys: newKeys, callback });
    return sid;
  },

  clearWatch(watchId) {
    if (watchId < subscriptions.length) {
      subscriptions[watchId] = {
        keys: [],
        callback: null,
      };
    }
  },

  _sendObservations(body) {
    Object.keys(body).forEach((key) => {
      const newValue = body[key];
      const didChange = this._settings[key] !== newValue;
      this._settings[key] = newValue;

      if (didChange) {
        subscriptions.forEach((sub) => {
          if (sub.keys.indexOf(key) !== -1 && sub.callback) {
            sub.callback();
          }
        });
      }
    });
  },

  __emulateDeviceSettingsChange(settings) {
    DeviceEventEmitter.emit('settingsUpdated', settings);
  },
};

DeviceEventEmitter.addListener(
  'settingsUpdated',
  Settings._sendObservations.bind(Settings)
);

module.exports = Settings;
