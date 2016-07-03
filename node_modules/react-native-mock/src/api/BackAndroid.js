import DeviceEventEmitter from '../plugins/DeviceEventEmitter';
import DeviceEventManager from '../NativeModules/DeviceEventManager';

const DEVICE_BACK_EVENT = 'hardwareBackPress';

const _backPressSubscriptions = new Set();

/**
 * Detect hardware back button presses, and programmatically invoke the default back button
 * functionality to exit the app if there are no listeners or if none of the listeners return true.
 *
 * Example:
 *
 * ```js
 * BackAndroid.addEventListener('hardwareBackPress', function() {
 * 	 if (!this.onMainScreen()) {
 * 	   this.goBack();
 * 	   return true;
 * 	 }
 * 	 return false;
 * });
 * ```
 */
const BackAndroid = {

  exitApp() {
    DeviceEventManager.invokeDefaultBackPressHandler();
  },

  addEventListener(eventName, handler) {
    _backPressSubscriptions.add(handler);
    return {
      remove: () => BackAndroid.removeEventListener(eventName, handler),
    };
  },

  removeEventListener(eventName, handler) {
    _backPressSubscriptions.delete(handler);
  },

};

DeviceEventEmitter.addListener(DEVICE_BACK_EVENT, function () {
  let invokeDefault = true;
  _backPressSubscriptions.forEach((subscription) => {
    if (subscription()) {
      invokeDefault = false;
    }
  });
  if (invokeDefault) {
    BackAndroid.exitApp();
  }
});

module.exports = BackAndroid;
