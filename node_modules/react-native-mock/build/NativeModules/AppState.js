var _DeviceEventEmitter=require('../plugins/DeviceEventEmitter');var _DeviceEventEmitter2=_interopRequireDefault(_DeviceEventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var _appState='active';

_DeviceEventEmitter2['default'].on('appStateDidChange',function(data){
_appState=data._appState;});


var AppState={
getCurrentAppState:function(){function getCurrentAppState(callback,error){
Promise.resolve({_appState:_appState}).then(callback);}return getCurrentAppState;}(),


__setAppState:function(){function __setAppState(appState){
_DeviceEventEmitter2['default'].emit('appStateDidChange',{_appState:appState});}return __setAppState;}()};



module.exports=AppState;