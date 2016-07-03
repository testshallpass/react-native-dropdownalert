var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _TimePickerAndroid=require('../NativeModules/TimePickerAndroid');var _TimePickerAndroid2=_interopRequireDefault(_TimePickerAndroid);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

/**
 * Opens the standard Android time picker dialog.
 *
 * ### Example
 *
 * ```
 * try {
 *   const {action, hour, minute} = await TimePickerAndroid.open({
 *     hour: 14,
 *     minute: 0,
 *     is24Hour: false, // Will display '2 PM'
 *   });
 *   if (action !== DatePickerAndroid.dismissedAction) {
 *     // Selected hour (0-23), minute (0-59)
 *   }
 * } catch ({code, message}) {
 *   console.warn('Cannot open time picker', message);
 * }
 * ```
 */var 
TimePickerAndroid=function(){function TimePickerAndroid(){_classCallCheck(this,TimePickerAndroid);}_createClass(TimePickerAndroid,null,[{key:'open',

/**
   * Opens the standard Android time picker dialog.
   *
   * The available keys for the `options` object are:
   *   * `hour` (0-23) - the hour to show, defaults to the current time
   *   * `minute` (0-59) - the minute to show, defaults to the current time
   *   * `is24Hour` (boolean) - If `true`, the picker uses the 24-hour format. If `false`,
   *     the picker shows an AM/PM chooser. If undefined, the default for the current locale
   *     is used.
   *
   * Returns a Promise which will be invoked an object containing `action`, `hour` (0-23),
   * `minute` (0-59) if the user picked a time. If the user dismissed the dialog, the Promise will
   * still be resolved with action being `TimePickerAndroid.dismissedAction` and all the other keys
   * being undefined. **Always** check whether the `action` before reading the values.
   */value:function(){function open(
options){
return _TimePickerAndroid2['default'].open(options);}return open;}()


/**
   * A time has been selected.
   */},{key:'timeSetAction',get:function(){function get()
{return 'timeSetAction';}return get;}()
/**
   * The dialog has been dismissed.
   */},{key:'dismissedAction',get:function(){function get()
{return 'dismissedAction';}return get;}()}]);return TimePickerAndroid;}();


module.exports=TimePickerAndroid;