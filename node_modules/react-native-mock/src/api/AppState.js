/**
 * https://github.com/facebook/react-native/blob/master/Libraries/AppState/AppState.js
 */
import invariant from 'invariant';
import DeviceEventEmitter from '../plugins/DeviceEventEmitter';

const _eventHandlers = {
  change: new Map(),
  memoryWarning: new Map(),
};

const AppState = {
  addEventListener(type, handler) {
    invariant(
      ['change', 'memoryWarning'].indexOf(type) !== -1,
      'Trying to subscribe to unknown event: "%s"', type
    );
    if (type === 'change') {
      _eventHandlers[type].set(handler, DeviceEventEmitter.addListener(
        'appStateDidChange',
        (appStateData) => handler(appStateData.appState)
      ));
    } else if (type === 'memoryWarning') {
      _eventHandlers[type].set(handler, DeviceEventEmitter.addListener(
        'memoryWarning',
        handler
      ));
    }
  },

  removeEventListener(type, handler) {
    invariant(
      ['change', 'memoryWarning'].indexOf(type) !== -1,
      'Trying to remove listener for unknown event: "%s"', type
    );
    if (!_eventHandlers[type].has(handler)) {
      return;
    }
    _eventHandlers[type].get(handler).remove();
    _eventHandlers[type].delete(handler);
  },

  currentState: 'active',

  __setAppState(appState) {
    DeviceEventEmitter.emit('appStateDidChange', { appState });
  },
};

DeviceEventEmitter.addListener(
  'appStateDidChange',
  (appStateData) => { AppState.currentState = appStateData.appState; }
);

module.exports = AppState;
