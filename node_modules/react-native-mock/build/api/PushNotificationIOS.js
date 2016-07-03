var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);
var _DeviceEventEmitter=require('../plugins/DeviceEventEmitter');var _DeviceEventEmitter2=_interopRequireDefault(_DeviceEventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var _notifHandlers=new Map();
var _initialNotification=null;

var DEVICE_NOTIF_EVENT='remoteNotificationReceived';
var NOTIF_REGISTER_EVENT='remoteNotificationsRegistered';var 

PushNotificationIOS=function(){_createClass(PushNotificationIOS,null,[{key:'presentLocalNotification',
/**
   * Schedules the localNotification for immediate presentation.
   *
   * details is an object containing:
   *
   * - `alertBody` : The message displayed in the notification alert.
   * - `soundName` : The sound played when the notification is fired (optional).
   *
   */value:function(){function presentLocalNotification(
details){}return presentLocalNotification;}()



/**
   * Schedules the localNotification for future presentation.
   *
   * details is an object containing:
   *
   * - `fireDate` : The date and time when the system should deliver the notification.
   * - `alertBody` : The message displayed in the notification alert.
   * - `soundName` : The sound played when the notification is fired (optional).
   *
   */},{key:'scheduleLocalNotification',value:function(){function scheduleLocalNotification(
details){}return scheduleLocalNotification;}()



/**
   * Cancels all scheduled localNotifications
   */},{key:'cancelAllLocalNotifications',value:function(){function cancelAllLocalNotifications()
{}return cancelAllLocalNotifications;}()



/**
   * Sets the badge number for the app icon on the home screen
   */},{key:'setApplicationIconBadgeNumber',value:function(){function setApplicationIconBadgeNumber(
number){}return setApplicationIconBadgeNumber;}()



/**
   * Gets the current badge number for the app icon on the home screen
   */},{key:'getApplicationIconBadgeNumber',value:function(){function getApplicationIconBadgeNumber(
callback){}return getApplicationIconBadgeNumber;}()



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
   */},{key:'addEventListener',value:function(){function addEventListener(
type,handler){
(0,_invariant2['default'])(
type==='notification'||type==='register',
'PushNotificationIOS only supports `notification` and `register` events');

var listener=void 0;
if(type==='notification'){
listener=_DeviceEventEmitter2['default'].addListener(
DEVICE_NOTIF_EVENT,
function(notifData){
handler(new PushNotificationIOS(notifData));});}else 


if(type==='register'){
listener=_DeviceEventEmitter2['default'].addListener(
NOTIF_REGISTER_EVENT,
function(registrationInfo){
handler(registrationInfo.deviceToken);});}



_notifHandlers.set(handler,listener);}return addEventListener;}()


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
   */},{key:'requestPermissions',value:function(){function requestPermissions(
permissions){}return requestPermissions;}()



/**
   * Unregister for all remote notifications received via Apple Push Notification service.
   *
   * You should call this method in rare circumstances only, such as when a new version of
   * the app removes support for all types of remote notifications. Users can temporarily
   * prevent apps from receiving remote notifications through the Notifications section of
   * the Settings app. Apps unregistered through this method can always re-register.
   */},{key:'abandonPermissions',value:function(){function abandonPermissions()
{}return abandonPermissions;}()



/**
   * See what push permissions are currently enabled. `callback` will be
   * invoked with a `permissions` object:
   *
   *  - `alert` :boolean
   *  - `badge` :boolean
   *  - `sound` :boolean
   */},{key:'checkPermissions',value:function(){function checkPermissions(
callback){
(0,_invariant2['default'])(
typeof callback==='function',
'Must provide a valid callback');}return checkPermissions;}()



/**
   * Removes the event listener. Do this in `componentWillUnmount` to prevent
   * memory leaks
   */},{key:'removeEventListener',value:function(){function removeEventListener(
type,handler){
(0,_invariant2['default'])(
type==='notification'||type==='register',
'PushNotificationIOS only supports `notification` and `register` events');

var listener=_notifHandlers.get(handler);
if(!listener){
return;}

listener.remove();
_notifHandlers['delete'](handler);}return removeEventListener;}()


/**
   * An initial notification will be available if the app was cold-launched
   * from a notification.
   *
   * The first caller of `popInitialNotification` will get the initial
   * notification object, or `null`. Subsequent invocations will return null.
   */},{key:'popInitialNotification',value:function(){function popInitialNotification()
{
var initialNotification=_initialNotification&&
new PushNotificationIOS(_initialNotification);
_initialNotification=null;
return initialNotification;}return popInitialNotification;}()


/**
   * You will never need to instantiate `PushNotificationIOS` yourself.
   * Listening to the `notification` event and invoking
   * `popInitialNotification` is sufficient
   */}]);
function PushNotificationIOS(nativeNotif){var _this=this;_classCallCheck(this,PushNotificationIOS);
this._data={};

// Extract data from Apple's `aps` dict as defined:

// https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html

Object.keys(nativeNotif).forEach(function(notifKey){
var notifVal=nativeNotif[notifKey];
if(notifKey==='aps'){
_this._alert=notifVal.alert;
_this._sound=notifVal.sound;
_this._badgeCount=notifVal.badge;}else 
{
_this._data[notifKey]=notifVal;}});}




/**
   * An alias for `getAlert` to get the notification's main message string
   */_createClass(PushNotificationIOS,[{key:'getMessage',value:function(){function getMessage()
{
// alias because "alert" is an ambiguous name
return this._alert;}return getMessage;}()


/**
   * Gets the sound string from the `aps` object
   */},{key:'getSound',value:function(){function getSound()
{
return this._sound;}return getSound;}()


/**
   * Gets the notification's main message from the `aps` object
   */},{key:'getAlert',value:function(){function getAlert()
{
return this._alert;}return getAlert;}()


/**
   * Gets the badge count number from the `aps` object
   */},{key:'getBadgeCount',value:function(){function getBadgeCount()
{
return this._badgeCount;}return getBadgeCount;}()


/**
   * Gets the data object on the notif
   */},{key:'getData',value:function(){function getData()
{
return this._data;}return getData;}()}]);return PushNotificationIOS;}();



module.exports=PushNotificationIOS;