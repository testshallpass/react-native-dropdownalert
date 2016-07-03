var _react=require('react');var _react2=_interopRequireDefault(_react);



var _ColorPropType=require('../propTypes/ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/StatusBar/StatusBar.js
 */
var _backgroundColor='';
var _barStyle={};
var _hidden=false;
var _networkActivityIndicatorVisible=false;
var _translucent=false;

var StatusBar=_react2['default'].createClass({displayName:'StatusBar',
propTypes:{
animated:_react2['default'].PropTypes.bool,
barStyle:_react2['default'].PropTypes.oneOf(['default','light-content']),
backgroundColor:_ColorPropType2['default'],
hidden:_react2['default'].PropTypes.bool,
networkActivityIndicatorVisible:_react2['default'].PropTypes.bool,
showHideTransition:_react2['default'].PropTypes.oneOf(['fade','slide']),
translucent:_react2['default'].PropTypes.bool},


statics:{
setBackgroundColor:function(){function setBackgroundColor(backgroundColor,animated){
_backgroundColor=backgroundColor;}return setBackgroundColor;}(),


setBarStyle:function(){function setBarStyle(barStyle,animated){
_barStyle=barStyle;}return setBarStyle;}(),


setHidden:function(){function setHidden(hidden,animated){
_hidden=hidden;}return setHidden;}(),


setNetworkActivityIndicatorVisible:function(){function setNetworkActivityIndicatorVisible(visible){
_networkActivityIndicatorVisible=visible;}return setNetworkActivityIndicatorVisible;}(),


setTranslucent:function(){function setTranslucent(translucent){
_translucent=translucent;}return setTranslucent;}(),


__getBackgroundColor:function(){function __getBackgroundColor(){
return _backgroundColor;}return __getBackgroundColor;}(),


__getBarStyle:function(){function __getBarStyle(){
return _barStyle;}return __getBarStyle;}(),


__getHidden:function(){function __getHidden(){
return _hidden;}return __getHidden;}(),


__getNetworkActivityIndicatorVisible:function(){function __getNetworkActivityIndicatorVisible(){
return _networkActivityIndicatorVisible;}return __getNetworkActivityIndicatorVisible;}(),


__getTranslucent:function(){function __getTranslucent(){
return _translucent;}return __getTranslucent;}()},



render:function(){function render(){
return null;}return render;}()});



module.exports=StatusBar;