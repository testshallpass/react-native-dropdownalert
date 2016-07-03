var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _EdgeInsetsPropType=require('../propTypes/EdgeInsetsPropType');var _EdgeInsetsPropType2=_interopRequireDefault(_EdgeInsetsPropType);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _View=require('./View');var _View2=_interopRequireDefault(_View);
var _ScrollView=require('./ScrollView');var _ScrollView2=_interopRequireDefault(_ScrollView);
var _WebViewManager=require('../NativeModules/WebViewManager');var _WebViewManager2=_interopRequireDefault(_WebViewManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

var RCT_WEBVIEW_REF='webview';

var NavigationType={
click:_WebViewManager2['default'].NavigationType.LinkClicked,
formsubmit:_WebViewManager2['default'].NavigationType.FormSubmitted,
backforward:_WebViewManager2['default'].NavigationType.BackForward,
reload:_WebViewManager2['default'].NavigationType.Reload,
formresubmit:_WebViewManager2['default'].NavigationType.FormResubmitted,
other:_WebViewManager2['default'].NavigationType.Other};


var JSNavigationScheme=_WebViewManager2['default'].JSNavigationScheme;

var WebView=_react2['default'].createClass({displayName:'WebView',
propTypes:_extends({},
_View2['default'].propTypes,{
url:PropTypes.string,
html:PropTypes.string,
/**
     * Function that returns a view to show if there's an error.
     */
renderError:PropTypes.func, // view to show if there's an error
/**
     * Function that returns a loading indicator.
     */
renderLoading:PropTypes.func,
/**
     * Invoked when load finish
     */
onLoad:PropTypes.func,
/**
     * Invoked when load either succeeds or fails
     */
onLoadEnd:PropTypes.func,
/**
     * Invoked on load start
     */
onLoadStart:PropTypes.func,
/**
     * Invoked when load fails
     */
onError:PropTypes.func,
/**
     * @platform ios
     */
bounces:PropTypes.bool,
/**
     * A floating-point number that determines how quickly the scroll view
     * decelerates after the user lifts their finger. You may also use string
     * shortcuts `"normal"` and `"fast"` which match the underlying iOS settings
     * for `UIScrollViewDecelerationRateNormal` and
     * `UIScrollViewDecelerationRateFast` respectively.
     *   - Normal: 0.998
     *   - Fast: 0.9 (the default for iOS WebView)
     * @platform ios
     */
decelerationRate:_ScrollView2['default'].propTypes.decelerationRate,
/**
     * @platform ios
     */
scrollEnabled:PropTypes.bool,
automaticallyAdjustContentInsets:PropTypes.bool,
contentInset:_EdgeInsetsPropType2['default'],
onNavigationStateChange:PropTypes.func,
startInLoadingState:PropTypes.bool, // force WebView to show loadingView on first load
style:_View2['default'].propTypes.style,

/**
     * Used on Android only, JS is enabled by default for WebView on iOS
     * @platform android
     */
javaScriptEnabled:PropTypes.bool,

/**
     * Used on Android only, controls whether DOM Storage is enabled or not
     * @platform android
     */
domStorageEnabled:PropTypes.bool,

/**
     * Sets the JS to be injected when the webpage loads.
     */
injectedJavaScript:PropTypes.string,

/**
     * Sets whether the webpage scales to fit the view and the user can change the scale.
     * @platform ios
     */
scalesPageToFit:PropTypes.bool,

/**
     * Allows custom handling of any webview requests by a JS handler. Return true
     * or false from this method to continue loading the request.
     * @platform ios
     */
onShouldStartLoadWithRequest:PropTypes.func,

/**
     * Determines whether HTML5 videos play inline or use the native full-screen
     * controller.
     * default value `false`
     * **NOTE** : "In order for video to play inline, not only does this
     * property need to be set to true, but the video element in the HTML
     * document must also include the webkit-playsinline attribute."
     * @platform ios
     */
allowsInlineMediaPlayback:PropTypes.bool}),


statics:{
JSNavigationScheme:JSNavigationScheme,
NavigationType:NavigationType},


getWebViewHandle:function(){function getWebViewHandle(){
// TODO(lmr): React.findNodeHandle
return _react2['default'].findNodeHandle(this.refs[RCT_WEBVIEW_REF]);}return getWebViewHandle;}(),


reload:function(){function reload(){
// do nothing
}return reload;}(),

goForward:function(){function goForward(){
// do nothing
}return goForward;}(),

goBack:function(){function goBack(){
// do nothing
}return goBack;}(),

render:function(){function render(){
return null;}return render;}()});



module.exports=WebView;