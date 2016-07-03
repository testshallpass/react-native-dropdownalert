var _Vibration=require('../NativeModules/Vibration');var _Vibration2=_interopRequireDefault(_Vibration);
var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

/**
 * The Vibration API is exposed at `VibrationIOS.vibrate()`. On iOS, calling this
 * function will trigger a one second vibration. The vibration is asynchronous
 * so this method will return immediately.
 *
 * There will be no effect on devices that do not support Vibration, eg. the iOS
 * simulator.
 *
 * Vibration patterns are currently unsupported.
 */

var Vibration={
vibrate:function(){function vibrate(){
(0,_invariant2['default'])(
arguments[0]===undefined,
'Vibration patterns not supported.');

_Vibration2['default'].vibrate();}return vibrate;}()};



module.exports=Vibration;