import DeviceEventEmitter from '../plugins/DeviceEventEmitter';
import AppState from '../NativeModules/AppState';
import invariant from 'invariant';

const logError = (error) => console.error(error);

const _eventHandlers = {
  change: new Map(),
  memoryWarning: new Map(),
};

/**
 * `AppStateIOS` can tell you if the app is in the foreground or background,
 * and notify you when the state changes.
 *
 * AppStateIOS is frequently used to determine the intent and proper behavior when
 * handling push notifications.
 *
 * ### iOS App States
 *
 *  - `active` - The app is running in the foreground
 *  - `background` - The app is running in the background. The user is either
 *     in another app or on the home screen
 *  - `inactive` - This is a transition state that currently never happens for
 *     typical React Native apps.
 *
 * For more information, see
 * [Apple's documentation](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html)
 *
 * ### Basic Usage
 *
 * To see the current state, you can check `AppStateIOS.currentState`, which
 * will be kept up-to-date. However, `currentState` will be null at launch
 * while `AppStateIOS` retrieves it over the bridge.
 *
 * ```
 * getInitialState: function() {
 *   return {
 *     currentAppState: AppStateIOS.currentState,
 *   };
 * },
 * componentDidMount: function() {
 *   AppStateIOS.addEventListener('change', this._handleAppStateChange);
 * },
 * componentWillUnmount: function() {
 *   AppStateIOS.removeEventListener('change', this._handleAppStateChange);
 * },
 * _handleAppStateChange: function(currentAppState) {
 *   this.setState({ currentAppState, });
 * },
 * render: function() {
 *   return (
 *     <Text>Current state is: {this.state.currentAppState}</Text>
 *   );
 * },
 * ```
 *
 * This example will only ever appear to say "Current state is: active" because
 * the app is only visible to the user when in the `active` state, and the null
 * state will happen only momentarily.
 */

const AppStateIOS = {

  /**
   * Add a handler to AppState changes by listening to the `change` event type
   * and providing the handler
   */
  addEventListener(type, handler) {
    invariant(
      ['change', 'memoryWarning'].indexOf(type) !== -1,
      'Trying to subscribe to unknown event: "%s"', type
    );
    if (type === 'change') {
      _eventHandlers[type].set(handler, DeviceEventEmitter.addListener(
        'appStateDidChange',
        (appStateData) => {
          handler(appStateData.app_state);
        }
      ));
    } else if (type === 'memoryWarning') {
      _eventHandlers[type].set(handler, DeviceEventEmitter.addListener(
        'memoryWarning',
        handler
      ));
    }
  },

  /**
   * Remove a handler by passing the `change` event type and the handler
   */
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

  // TODO: getCurrentAppState callback seems to be called at a really late stage
  // after app launch. Trying to get currentState when mounting App component
  // will likely to have the initial value here.
  // Initialize to 'active' instead of null.
  currentState: 'active',

};

DeviceEventEmitter.addListener(
  'appStateDidChange',
  (appStateData) => {
    AppStateIOS.currentState = appStateData.app_state;
  }
);

AppState.getCurrentAppState(
  (appStateData) => {
    AppStateIOS.currentState = appStateData.app_state;
  },
  logError
);

module.exports = AppStateIOS;
