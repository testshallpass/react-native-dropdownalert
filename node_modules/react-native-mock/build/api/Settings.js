var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);
var _DeviceEventEmitter=require('../plugins/DeviceEventEmitter');var _DeviceEventEmitter2=_interopRequireDefault(_DeviceEventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var subscriptions=[];

var Settings={
_settings:{},

get:function(){function get(key){
return this._settings[key];}return get;}(),


set:function(){function set(settings){
this._settings=_extends(this._settings,settings);}return set;}(),


watchKeys:function(){function watchKeys(keys,callback){
var newKeys=keys;
if(typeof keys==='string'){
newKeys=[keys];}


(0,_invariant2['default'])(
Array.isArray(newKeys),
'keys should be a string or array of strings');


var sid=subscriptions.length;
subscriptions.push({keys:newKeys,callback:callback});
return sid;}return watchKeys;}(),


clearWatch:function(){function clearWatch(watchId){
if(watchId<subscriptions.length){
subscriptions[watchId]={
keys:[],
callback:null};}}return clearWatch;}(),




_sendObservations:function(){function _sendObservations(body){var _this=this;
Object.keys(body).forEach(function(key){
var newValue=body[key];
var didChange=_this._settings[key]!==newValue;
_this._settings[key]=newValue;

if(didChange){
subscriptions.forEach(function(sub){
if(sub.keys.indexOf(key)!==-1&&sub.callback){
sub.callback();}});}});}return _sendObservations;}(),






__emulateDeviceSettingsChange:function(){function __emulateDeviceSettingsChange(settings){
_DeviceEventEmitter2['default'].emit('settingsUpdated',settings);}return __emulateDeviceSettingsChange;}()};



_DeviceEventEmitter2['default'].addListener(
'settingsUpdated',
Settings._sendObservations.bind(Settings));


module.exports=Settings;