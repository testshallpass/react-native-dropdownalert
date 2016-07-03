import invariant from 'invariant';
import DeviceEventEmitter from '../plugins/DeviceEventEmitter';

const _notifHandlers = new Map();
let _initialNotification = null;

const DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';
const NOTIF_REGISTER_EVENT = 'remoteNotificationsRegistered';

class PushNotificationIOS {
  /**
   * Schedules the localNotification for immediate presentation.
   *
   * details is an object containing:
   *
   * - `alertBody` : The message displayed in the notification alert.
   * - `soundName` : The sound played when the notification is fired (optional).
   *
   */
  static presentLocalNotification(details) {

  }

  /**
   * Schedules the localNotification for future presentation.
   *
   * details is an object containing:
   *
   * - `fireDate` : The date and time when the system should deliver the notification.
   * - `alertBody` : The message displayed in the notification alert.
   * - `soundName` : The sound played when the notification is fired (optional).
   *
   */
  static scheduleLocalNotification(details) {

  }

  /**
   * Cancels all scheduled localNotifications
   */
  static cancelAllLocalNotifications() {

  }

  /**
   * Sets the badge number for the app icon on the home screen
   */
  static setApplicationIconBadgeNumber(number) {

  }

  /**
   * Gets the current badge number for the app icon on the home screen
   */
  static getApplicationIconBadgeNumber(callback) {

  }

  /**
   * Attaches a listener to remote notification events while the app is running
   * in the foreground or the background.
   *
   * Valid events are:
   *
   * - `notification` : Fired when a remote notification is received. The
   *   handler will be invoked with an instance of `PushNotificationIOS`.
   * - `register`: Fired when the user registers for remote notifications. The
   *   handler will be invoked with a hex string representing the deviceToken.
   */
  static addEventListener(type, handler) {
    invariant(
      type === 'notification' || type === 'register',
      'PushNotificationIOS only supports `notification` and `register` events'
    );
    let listener;
    if (type === 'notification') {
      listener = DeviceEventEmitter.addListener(
        DEVICE_NOTIF_EVENT,
        (notifData) => {
          handler(new PushNotificationIOS(notifData));
        }
      );
    } else if (type === 'register') {
      listener = DeviceEventEmitter.addListener(
        NOTIF_REGISTER_EVENT,
        (registrationInfo) => {
          handler(registrationInfo.deviceToken);
        }
      );
    }
    _notifHandlers.set(handler, listener);
  }

  /**
   * Requests notification permissions from iOS, prompting the user's
   * dialog box. By default, it will request all notification permissions, but
   * a subset of these can be requested by passing a map of requested
   * permissions.
   * The following permissions are supported:
   *
   *   - `alert`
   *   - `badge`
   *   - `sound`
   *
   * If a map is provided to the method, only the permissions with truthy values
   * will be requested.
   */
  static requestPermissions(permissions) {

  }

  /**
   * Unregister for all remote notifications received via Apple Push Notification service.
   *
   * You should call this method in rare circumstances only, such as when a new version of
   * the app removes support for all types of remote notifications. Users can temporarily
   * prevent apps from receiving remote notifications through the Notifications section of
   * the Settings app. Apps unregistered through this method can always re-register.
   */
  static abandonPermissions() {

  }

  /**
   * See what push permissions are currently enabled. `callback` will be
   * invoked with a `permissions` object:
   *
   *  - `alert` :boolean
   *  - `badge` :boolean
   *  - `sound` :boolean
   */
  static checkPermissions(callback) {
    invariant(
      typeof callback === 'function',
      'Must provide a valid callback'
    );
  }

  /**
   * Removes the event listener. Do this in `componentWillUnmount` to prevent
   * memory leaks
   */
  static removeEventListener(type, handler) {
    invariant(
      type === 'notification' || type === 'register',
      'PushNotificationIOS only supports `notification` and `register` events'
    );
    const listener = _notifHandlers.get(handler);
    if (!listener) {
      return;
    }
    listener.remove();
    _notifHandlers.delete(handler);
  }

  /**
   * An initial notification will be available if the app was cold-launched
   * from a notification.
   *
   * The first caller of `popInitialNotification` will get the initial
   * notification object, or `null`. Subsequent invocations will return null.
   */
  static popInitialNotification() {
    const initialNotification = _initialNotification &&
      new PushNotificationIOS(_initialNotification);
    _initialNotification = null;
    return initialNotification;
  }

  /**
   * You will never need to instantiate `PushNotificationIOS` yourself.
   * Listening to the `notification` event and invoking
   * `popInitialNotification` is sufficient
   */
  constructor(nativeNotif) {
    this._data = {};

    // Extract data from Apple's `aps` dict as defined:

    // https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html

    Object.keys(nativeNotif).forEach((notifKey) => {
      const notifVal = nativeNotif[notifKey];
      if (notifKey === 'aps') {
        this._alert = notifVal.alert;
        this._sound = notifVal.sound;
        this._badgeCount = notifVal.badge;
      } else {
        this._data[notifKey] = notifVal;
      }
    });
  }

  /**
   * An alias for `getAlert` to get the notification's main message string
   */
  getMessage() {
    // alias because "alert" is an ambiguous name
    return this._alert;
  }

  /**
   * Gets the sound string from the `aps` object
   */
  getSound() {
    return this._sound;
  }

  /**
   * Gets the notification's main message from the `aps` object
   */
  getAlert() {
    return this._alert;
  }

  /**
   * Gets the badge count number from the `aps` object
   */
  getBadgeCount() {
    return this._badgeCount;
  }

  /**
   * Gets the data object on the notif
   */
  getData() {
    return this._data;
  }
}

module.exports = PushNotificationIOS;
