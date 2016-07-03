import invariant from 'invariant';
import Linking from './Linking';

class IntentAndroid {

  /**
   * Starts a corresponding external activity for the given URL.
   *
   * For example, if the URL is "https://www.facebook.com", the system browser will be opened,
   * or the "choose application" dialog will be shown.
   *
   * You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386"), a contact,
   * or any other URL that can be opened with {@code Intent.ACTION_VIEW}.
   *
   * NOTE: This method will fail if the system doesn't know how to open the specified URL.
   * If you're passing in a non-http(s) URL, it's best to check {@code canOpenURL} first.
   *
   * NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!
   *
   * @deprecated
   */
  static openURL(url) {
    console.warn(
      '"IntentAndroid" is deprecated. Use the promise based "Linking" instead.'
    );
    Linking.openURL(url);
  }

  /**
   * Determine whether or not an installed app can handle a given URL.
   *
   * You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386"), a contact,
   * or any other URL that can be opened with {@code Intent.ACTION_VIEW}.
   *
   * NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!
   *
   * @param URL the URL to open
   *
   * @deprecated
   */
  static canOpenURL(url, callback) {
    invariant(
      typeof callback === 'function',
      'A valid callback function is required'
    );
    Linking.canOpenURL(url).then(callback);
  }

  /**
   * If the app launch was triggered by an app link with {@code Intent.ACTION_VIEW},
   * it will give the link url, otherwise it will give `null`
   *
   * Refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents
   *
   * @deprecated
   */
  static getInitialURL(callback) {
    invariant(
      typeof callback === 'function',
      'A valid callback function is required'
    );
    Linking.getInitialURL().then(callback);
  }
}

module.exports = IntentAndroid;
