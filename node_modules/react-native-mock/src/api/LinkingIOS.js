import LinkingManager from '../NativeModules/LinkingManager';
import Linking from './Linking';
import invariant from 'invariant';

let _initialURL = LinkingManager && LinkingManager.initialURL;

class LinkingIOS {
  /**
   * Add a handler to LinkingIOS changes by listening to the `url` event type
   * and providing the handler
   *
   * @deprecated
   */
  static addEventListener(type, handler) {
    console.warn(
      '"LinkingIOS.addEventListener" is deprecated. Use "Linking.addEventListener" instead.'
    );
    Linking.addEventListener(type, handler);
  }

  /**
   * Remove a handler by passing the `url` event type and the handler
   *
   * @deprecated
   */
  static removeEventListener(type, handler) {
    console.warn(
      '"LinkingIOS.removeEventListener" is deprecated. Use "Linking.removeEventListener" instead.'
    );
    Linking.removeEventListener(type, handler);
  }

  /**
   * Try to open the given `url` with any of the installed apps.
   *
   * @deprecated
   */
  static openURL(url) {
    console.warn(
      '"LinkingIOS.openURL" is deprecated. Use the promise based "Linking.openURL" instead.'
    );
    Linking.openURL(url);
  }

  /**
   * Determine whether or not an installed app can handle a given URL.
   * The callback function will be called with `bool supported` as the only argument
   *
   * NOTE: As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key
   * inside `Info.plist`.
   *
   * @deprecated
   */
  static canOpenURL(url, callback) {
    console.warn(
      '"LinkingIOS.canOpenURL" is deprecated. Use the promise based "Linking.canOpenURL" instead.'
    );
    invariant(
      typeof callback === 'function',
      'A valid callback function is required'
    );
    Linking.canOpenURL(url).then(callback);
  }

  /**
   * If the app launch was triggered by an app link, it will pop the link url,
   * otherwise it will return `null`
   *
   * @deprecated
   */
  static popInitialURL() {
    const initialURL = _initialURL;
    _initialURL = null;
    return initialURL;
  }
}

module.exports = LinkingIOS;
