import DeviceEventEmitter from '../plugins/DeviceEventEmitter';

let _appState = 'active';

DeviceEventEmitter.on('appStateDidChange', data => {
  _appState = data._appState;
});

const AppState = {
  getCurrentAppState(callback, error) {
    Promise.resolve({ _appState }).then(callback);
  },

  __setAppState(appState) {
    DeviceEventEmitter.emit('appStateDidChange', { _appState: appState });
  },
};

module.exports = AppState;
