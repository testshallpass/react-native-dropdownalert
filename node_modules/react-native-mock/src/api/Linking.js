import invariant from 'invariant';
import Platform from '../plugins/Platform';
import DeviceEventEmitter from '../plugins/DeviceEventEmitter';
import LinkingManager from '../NativeModules/LinkingManager';
import IntentAndroid from './IntentAndroid';
import LinkingManagerIOS from './LinkingIOS';

const _notifHandlers = new Map();

const DEVICE_NOTIF_EVENT = 'openURL';

// TODO(lmr):
class Linking {
  /**
   * Add a handler to Linking changes by listening to the `url` event type
   * and providing the handler
   *
   * @platform ios
   */
  static addEventListener(type, handler) {
    if (Platform.OS === 'android') {
      console.warn(
        'Linking.addEventListener is not supported on Android'
      );
    } else {
      invariant(
        type === 'url',
        'Linking only supports `url` events'
      );
      const listener = DeviceEventEmitter.addListener(
        DEVICE_NOTIF_EVENT,
        handler
      );
      _notifHandlers.set(handler, listener);
    }
  }

  /**
   * Remove a handler by passing the `url` event type and the handler
   *
   * @platform ios
   */
  static removeEventListener(type, handler) {
    if (Platform.OS === 'android') {
      console.warn(
        'Linking.removeEventListener is not supported on Android'
      );
    } else {
      invariant(
        type === 'url',
        'Linking only supports `url` events'
      );
      const listener = _notifHandlers.get(handler);
      if (!listener) {
        return;
      }
      listener.removeListener(
          DEVICE_NOTIF_EVENT,
          handler
      );
      _notifHandlers.delete(handler);
    }
  }

  /**
   * Try to open the given `url` with any of the installed apps.
   *
   * You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386"), a contact,
   * or any other URL that can be opened with the installed apps.
   *
   * NOTE: This method will fail if the system doesn't know how to open the specified URL.
   * If you're passing in a non-http(s) URL, it's best to check {@code canOpenURL} first.
   *
   * NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!
   */
  static openURL(url) {
    this._validateURL(url);
    return LinkingManager.openURL(url);
  }

  /**
   * Determine whether or not an installed app can handle a given URL.
   *
   * NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!
   *
   * NOTE: As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key
   * inside `Info.plist`.
   *
   * @param URL the URL to open
   */
  static canOpenURL(url) {
    this._validateURL(url);
    return LinkingManager.canOpenURL(url);
  }

  /**
   * If the app launch was triggered by an app link with,
   * it will give the link url, otherwise it will give `null`
   *
   * NOTE: To support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents
   */
  static getInitialURL() {
    if (Platform.OS === 'android') {
      return IntentAndroid.getInitialURL();
    }
    return Promise.resolve(LinkingManagerIOS.initialURL);
  }

  static _validateURL(url) {
    invariant(
      typeof url === 'string',
      `Invalid URL: should be a string. Was: ${url}`
    );
    invariant(
      url,
      'Invalid URL: cannot be empty'
    );
  }
}

module.exports = Linking;
