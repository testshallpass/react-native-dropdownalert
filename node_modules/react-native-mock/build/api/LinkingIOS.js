var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _LinkingManager=require('../NativeModules/LinkingManager');var _LinkingManager2=_interopRequireDefault(_LinkingManager);
var _Linking=require('./Linking');var _Linking2=_interopRequireDefault(_Linking);
var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var _initialURL=_LinkingManager2['default']&&_LinkingManager2['default'].initialURL;var 

LinkingIOS=function(){function LinkingIOS(){_classCallCheck(this,LinkingIOS);}_createClass(LinkingIOS,null,[{key:'addEventListener',
/**
   * Add a handler to LinkingIOS changes by listening to the `url` event type
   * and providing the handler
   *
   * @deprecated
   */value:function(){function addEventListener(
type,handler){
console.warn(
'"LinkingIOS.addEventListener" is deprecated. Use "Linking.addEventListener" instead.');

_Linking2['default'].addEventListener(type,handler);}return addEventListener;}()


/**
   * Remove a handler by passing the `url` event type and the handler
   *
   * @deprecated
   */},{key:'removeEventListener',value:function(){function removeEventListener(
type,handler){
console.warn(
'"LinkingIOS.removeEventListener" is deprecated. Use "Linking.removeEventListener" instead.');

_Linking2['default'].removeEventListener(type,handler);}return removeEventListener;}()


/**
   * Try to open the given `url` with any of the installed apps.
   *
   * @deprecated
   */},{key:'openURL',value:function(){function openURL(
url){
console.warn(
'"LinkingIOS.openURL" is deprecated. Use the promise based "Linking.openURL" instead.');

_Linking2['default'].openURL(url);}return openURL;}()


/**
   * Determine whether or not an installed app can handle a given URL.
   * The callback function will be called with `bool supported` as the only argument
   *
   * NOTE: As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key
   * inside `Info.plist`.
   *
   * @deprecated
   */},{key:'canOpenURL',value:function(){function canOpenURL(
url,callback){
console.warn(
'"LinkingIOS.canOpenURL" is deprecated. Use the promise based "Linking.canOpenURL" instead.');

(0,_invariant2['default'])(
typeof callback==='function',
'A valid callback function is required');

_Linking2['default'].canOpenURL(url).then(callback);}return canOpenURL;}()


/**
   * If the app launch was triggered by an app link, it will pop the link url,
   * otherwise it will return `null`
   *
   * @deprecated
   */},{key:'popInitialURL',value:function(){function popInitialURL()
{
var initialURL=_initialURL;
_initialURL=null;
return initialURL;}return popInitialURL;}()}]);return LinkingIOS;}();



module.exports=LinkingIOS;