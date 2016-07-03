var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);



var _DeviceEventEmitter=require('../plugins/DeviceEventEmitter');var _DeviceEventEmitter2=_interopRequireDefault(_DeviceEventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /**
 * https://github.com/facebook/react-native/blob/master/Libraries/AppState/AppState.js
 */var _eventHandlers={
change:new Map(),
memoryWarning:new Map()};


var AppState={
addEventListener:function(){function addEventListener(type,handler){
(0,_invariant2['default'])(
['change','memoryWarning'].indexOf(type)!==-1,
'Trying to subscribe to unknown event: "%s"',type);

if(type==='change'){
_eventHandlers[type].set(handler,_DeviceEventEmitter2['default'].addListener(
'appStateDidChange',
function(appStateData){return handler(appStateData.appState);}));}else 

if(type==='memoryWarning'){
_eventHandlers[type].set(handler,_DeviceEventEmitter2['default'].addListener(
'memoryWarning',
handler));}}return addEventListener;}(),




removeEventListener:function(){function removeEventListener(type,handler){
(0,_invariant2['default'])(
['change','memoryWarning'].indexOf(type)!==-1,
'Trying to remove listener for unknown event: "%s"',type);

if(!_eventHandlers[type].has(handler)){
return;}

_eventHandlers[type].get(handler).remove();
_eventHandlers[type]['delete'](handler);}return removeEventListener;}(),


currentState:'active',

__setAppState:function(){function __setAppState(appState){
_DeviceEventEmitter2['default'].emit('appStateDidChange',{appState:appState});}return __setAppState;}()};



_DeviceEventEmitter2['default'].addListener(
'appStateDidChange',
function(appStateData){AppState.currentState=appStateData.appState;});


module.exports=AppState;