var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _typeof=typeof Symbol==="function"&&typeof (typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _ActionSheetManager=require('../NativeModules/ActionSheetManager');var _ActionSheetManager2=_interopRequireDefault(_ActionSheetManager);
var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);
var _processColor=require('../plugins/processColor');var _processColor2=_interopRequireDefault(_processColor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var ActionSheetIOS={
showActionSheetWithOptions:function(){function showActionSheetWithOptions(options,callback){
(0,_invariant2['default'])(
(typeof options==='undefined'?'undefined':_typeof(options))==='object'&&options!==null,
'Options must a valid object');

(0,_invariant2['default'])(
typeof callback==='function',
'Must provide a valid callback');

_ActionSheetManager2['default'].showActionSheetWithOptions(_extends({},
options,{tintColor:(0,_processColor2['default'])(options.tintColor)}),
callback);}return showActionSheetWithOptions;}(),



showShareActionSheetWithOptions:function(){function showShareActionSheetWithOptions(
options,
failureCallback,
successCallback)
{
(0,_invariant2['default'])(
(typeof options==='undefined'?'undefined':_typeof(options))==='object'&&options!==null,
'Options must a valid object');

(0,_invariant2['default'])(
typeof failureCallback==='function',
'Must provide a valid failureCallback');

(0,_invariant2['default'])(
typeof successCallback==='function',
'Must provide a valid successCallback');

_ActionSheetManager2['default'].showShareActionSheetWithOptions(_extends({},
options,{tintColor:(0,_processColor2['default'])(options.tintColor)}),
failureCallback,
successCallback);}return showShareActionSheetWithOptions;}()};




module.exports=ActionSheetIOS;