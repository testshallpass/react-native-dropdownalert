import AlertManager from '../NativeModules/AlertManager';
/**
 * The AlertsIOS utility provides two functions: `alert` and `prompt`. All
 * functionality available through `AlertIOS.alert` is also available in the
 * cross-platform `Alert.alert`, which we recommend you use if you don't need
 * iOS-specific functionality.
 *
 * `AlertIOS.prompt` allows you to prompt the user for input inside of an
 * alert popup.
 *
 */
class AlertIOS {
  /**
   * Creates a popup to alert the user. See
   * [Alert](/react-native/docs/alert.html).
   *
   *  - title: string -- The dialog's title.
   *  - message: string -- An optional message that appears above the text input.
   *  - callbackOrButtons -- This optional argument should be either a
   *    single-argument function or an array of buttons. If passed a function,
   *    it will be called when the user taps 'OK'.
   *
   *    If passed an array of button configurations, each button should include
   *    a `text` key, as well as optional `onPress` and `style` keys.
   *    `style` should be one of 'default', 'cancel' or 'destructive'.
   *  - type -- *deprecated, do not use*
   *
   * Example:
   *
   * ```
   * AlertIOS.alert(
   *  'Sync Complete',
   *  'All your data are belong to us.'
   * );
   * ```
   */
  static alert(title, message, callbackOrButtons, type) {
    if (typeof type !== 'undefined') {
      console.warn(
        'AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.'
      );
      this.prompt(title, message, callbackOrButtons, type);
      return;
    }
    this.prompt(title, message, callbackOrButtons, 'default');
  }

  /**
   * Prompt the user to enter some text.
   *
   *  - title: string -- The dialog's title.
   *  - message: string -- An optional message that appears above the text input.
   *  - callbackOrButtons -- This optional argument should be either a
   *    single-argument function or an array of buttons. If passed a function,
   *    it will be called with the prompt's value when the user taps 'OK'.
   *
   *    If passed an array of button configurations, each button should include
   *    a `text` key, as well as optional `onPress` and `style` keys (see example).
   *    `style` should be one of 'default', 'cancel' or 'destructive'.
   *  - type: string -- This configures the text input. One of 'plain-text',
   *    'secure-text' or 'login-password'.
   *  - defaultValue: string -- the default value for the text field.
   *
   * Example with custom buttons:
   * ```
   * AlertIOS.prompt(
   *   'Enter password',
   *   'Enter your password to claim your $1.5B in lottery winnings',
   *   [
   *     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
   *     {text: 'OK', onPress: password => console.log('OK Pressed, password: ' + password)},
   *   ],
   *   'secure-text'
   * );
   * ```
   *
   * Example with the default button and a custom callback:
   * ```
   * AlertIOS.prompt(
   *   'Update username',
   *   null,
   *   text => console.log("Your username is "+text),
   *   null,
   *   'default'
   * )
   * ```
   */
  static prompt(title, message, callbackOrButtons, type, defaultValue) {
    if (typeof type === 'function') {
      const callback = type;
      AlertManager.alertWithArgs({
        title: title || undefined,
        type: 'plain-text',
        message,
      }, (id, value) => {
        callback(value);
      });
      return;
    }

    let callbacks = [];
    const buttons = [];
    let cancelButtonKey;
    let destructiveButtonKey;
    if (typeof callbackOrButtons === 'function') {
      callbacks = [callbackOrButtons];
    } else if (callbackOrButtons instanceof Array) {
      callbackOrButtons.forEach((btn, index) => {
        callbacks[index] = btn.onPress;
        if (btn.style === 'cancel') {
          cancelButtonKey = String(index);
        } else if (btn.style === 'destructive') {
          destructiveButtonKey = String(index);
        }
        if (btn.text || index < (callbackOrButtons || []).length - 1) {
          const btnDef = {};
          btnDef[index] = btn.text || '';
          buttons.push(btnDef);
        }
      });
    }

    AlertManager.alertWithArgs(
      {
        title: title || undefined,
        message: message || undefined,
        buttons,
        type: type || undefined,
        defaultValue,
        cancelButtonKey,
        destructiveButtonKey,
      },
      (id, value) => {
        const cb = callbacks[id];
        if (cb) {
          cb(value);
        }
      }
    );
  }
}

module.exports = AlertIOS;
