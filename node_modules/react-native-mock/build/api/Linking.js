var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);
var _Platform=require('../plugins/Platform');var _Platform2=_interopRequireDefault(_Platform);
var _DeviceEventEmitter=require('../plugins/DeviceEventEmitter');var _DeviceEventEmitter2=_interopRequireDefault(_DeviceEventEmitter);
var _LinkingManager=require('../NativeModules/LinkingManager');var _LinkingManager2=_interopRequireDefault(_LinkingManager);
var _IntentAndroid=require('./IntentAndroid');var _IntentAndroid2=_interopRequireDefault(_IntentAndroid);
var _LinkingIOS=require('./LinkingIOS');var _LinkingIOS2=_interopRequireDefault(_LinkingIOS);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var _notifHandlers=new Map();

var DEVICE_NOTIF_EVENT='openURL';

// TODO(lmr):
var Linking=function(){function Linking(){_classCallCheck(this,Linking);}_createClass(Linking,null,[{key:'addEventListener',
/**
   * Add a handler to Linking changes by listening to the `url` event type
   * and providing the handler
   *
   * @platform ios
   */value:function(){function addEventListener(
type,handler){
if(_Platform2['default'].OS==='android'){
console.warn(
'Linking.addEventListener is not supported on Android');}else 

{
(0,_invariant2['default'])(
type==='url',
'Linking only supports `url` events');

var listener=_DeviceEventEmitter2['default'].addListener(
DEVICE_NOTIF_EVENT,
handler);

_notifHandlers.set(handler,listener);}}return addEventListener;}()



/**
   * Remove a handler by passing the `url` event type and the handler
   *
   * @platform ios
   */},{key:'removeEventListener',value:function(){function removeEventListener(
type,handler){
if(_Platform2['default'].OS==='android'){
console.warn(
'Linking.removeEventListener is not supported on Android');}else 

{
(0,_invariant2['default'])(
type==='url',
'Linking only supports `url` events');

var listener=_notifHandlers.get(handler);
if(!listener){
return;}

listener.removeListener(
DEVICE_NOTIF_EVENT,
handler);

_notifHandlers['delete'](handler);}}return removeEventListener;}()



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
   */},{key:'openURL',value:function(){function openURL(
url){
this._validateURL(url);
return _LinkingManager2['default'].openURL(url);}return openURL;}()


/**
   * Determine whether or not an installed app can handle a given URL.
   *
   * NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!
   *
   * NOTE: As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key
   * inside `Info.plist`.
   *
   * @param URL the URL to open
   */},{key:'canOpenURL',value:function(){function canOpenURL(
url){
this._validateURL(url);
return _LinkingManager2['default'].canOpenURL(url);}return canOpenURL;}()


/**
   * If the app launch was triggered by an app link with,
   * it will give the link url, otherwise it will give `null`
   *
   * NOTE: To support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents
   */},{key:'getInitialURL',value:function(){function getInitialURL()
{
if(_Platform2['default'].OS==='android'){
return _IntentAndroid2['default'].getInitialURL();}

return Promise.resolve(_LinkingIOS2['default'].initialURL);}return getInitialURL;}()},{key:'_validateURL',value:function(){function _validateURL(


url){
(0,_invariant2['default'])(
typeof url==='string','Invalid URL: should be a string. Was: '+
url);

(0,_invariant2['default'])(
url,
'Invalid URL: cannot be empty');}return _validateURL;}()}]);return Linking;}();




module.exports=Linking;