var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Network/NetInfo.js
 */
var _Platform=require('../plugins/Platform');var _Platform2=_interopRequireDefault(_Platform);
var _DeviceEventEmitter=require('../plugins/DeviceEventEmitter');var _DeviceEventEmitter2=_interopRequireDefault(_DeviceEventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var DEVICE_CONNECTIVITY_EVENT='networkStatusDidChange';
var _subscriptions=new Map();

var isExpensive=false;
var networkInfo={
connected:true};



var NetInfo={
addEventListener:function(){function addEventListener(eventname,handler){
var listener=_DeviceEventEmitter2['default'].addListener(
DEVICE_CONNECTIVITY_EVENT,
function(_ref){var network_info=_ref.network_info;return handler(network_info);});

_subscriptions.set(handler,listener);}return addEventListener;}(),


removeEventListener:function(){function removeEventListener(eventName,handler){
var listener=_subscriptions.get(handler);
if(!listener){
return;}

listener.remove();
_subscriptions['delete'](handler);}return removeEventListener;}(),


fetch:function(){function fetch(){
return Promise.resolve(networkInfo);}return fetch;}(),


isConnected:{
addEventListener:function(){function addEventListener(eventname,handler){}return addEventListener;}(),



removeEventListener:function(){function removeEventListener(eventName,handler){}return removeEventListener;}(),


fetch:function(){function fetch(){
return NetInfo.fetch().then(function(info){return info.connected;});}return fetch;}()},



isConnectionExpensive:function(){function isConnectionExpensive(callback){
if(_Platform2['default'].OS==='android'){
callback(isExpensive);}else 
{
callback(null,'Unsupported');}}return isConnectionExpensive;}(),



// TODO(lmr): figure out a good way to expose setters here.
__setNetworkInfo:function(){function __setNetworkInfo(info){
networkInfo=info;}return __setNetworkInfo;}(),

__setIsConnectionExpensive:function(){function __setIsConnectionExpensive(expensive){
isExpensive=expensive;}return __setIsConnectionExpensive;}(),

__setIsConnected:function(){function __setIsConnected(connected){
networkInfo=_extends({},networkInfo,{connected:connected});}return __setIsConnected;}()};



module.exports=NetInfo;