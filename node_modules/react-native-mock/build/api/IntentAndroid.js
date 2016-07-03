var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);
var _Linking=require('./Linking');var _Linking2=_interopRequireDefault(_Linking);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var 

IntentAndroid=function(){function IntentAndroid(){_classCallCheck(this,IntentAndroid);}_createClass(IntentAndroid,null,[{key:'openURL',

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
   */value:function(){function openURL(
url){
console.warn(
'"IntentAndroid" is deprecated. Use the promise based "Linking" instead.');

_Linking2['default'].openURL(url);}return openURL;}()


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
   */},{key:'canOpenURL',value:function(){function canOpenURL(
url,callback){
(0,_invariant2['default'])(
typeof callback==='function',
'A valid callback function is required');

_Linking2['default'].canOpenURL(url).then(callback);}return canOpenURL;}()


/**
   * If the app launch was triggered by an app link with {@code Intent.ACTION_VIEW},
   * it will give the link url, otherwise it will give `null`
   *
   * Refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents
   *
   * @deprecated
   */},{key:'getInitialURL',value:function(){function getInitialURL(
callback){
(0,_invariant2['default'])(
typeof callback==='function',
'A valid callback function is required');

_Linking2['default'].getInitialURL().then(callback);}return getInitialURL;}()}]);return IntentAndroid;}();



module.exports=IntentAndroid;