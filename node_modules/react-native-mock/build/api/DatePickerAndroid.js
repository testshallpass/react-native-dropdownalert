var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _typeof=typeof Symbol==="function"&&typeof (typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _DatePickerAndroid=require('../NativeModules/DatePickerAndroid');var _DatePickerAndroid2=_interopRequireDefault(_DatePickerAndroid);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

/**
 * Convert a Date to a timestamp.
 */
function _toMillis(dateVal){
// Is it a Date object?
if((typeof dateVal==='undefined'?'undefined':_typeof(dateVal))==='object'&&typeof dateVal.getMonth==='function'){
return dateVal.getTime();}

return null;}


/**
 * Opens the standard Android date picker dialog.
 *
 * ### Example
 *
 * ```
 * try {
 *   const {action, year, month, day} = await DatePickerAndroid.open({
 *     // Use `new Date()` for current date.
 *     // May 25 2020. Month 0 is January.
 *     date: new Date(2020, 4, 25)
 *   });
 *   if (action !== DatePickerAndroid.dismissedAction) {
 *     // Selected year, month (0-11), day
 *   }
 * } catch ({code, message}) {
 *   console.warn('Cannot open date picker', message);
 * }
 * ```
 */var 
DatePickerAndroid=function(){function DatePickerAndroid(){_classCallCheck(this,DatePickerAndroid);}_createClass(DatePickerAndroid,null,[{key:'open',
/**
   * Opens the standard Android date picker dialog.
   *
   * The available keys for the `options` object are:
   *   * `date` (`Date` object or timestamp in milliseconds) - date to show by default
   *   * `minDate` (`Date` or timestamp in milliseconds) - minimum date that can be selected
   *   * `maxDate` (`Date` object or timestamp in milliseconds) - minimum date that can be selected
   *
   * Returns a Promise which will be invoked an object containing `action`, `year`, `month` (0-11),
   * `day` if the user picked a date. If the user dismissed the dialog, the Promise will
   * still be resolved with action being `DatePickerAndroid.dismissedAction` and all the other keys
   * being undefined. **Always** check whether the `action` before reading the values.
   *
   * Note the native date picker dialog has some UI glitches on Android 4 and lower
   * when using the `minDate` and `maxDate` options.
   */value:function(){function open(
options){
var optionsMs=options;
if(optionsMs){
optionsMs.date=_toMillis(options.date);
optionsMs.minDate=_toMillis(options.minDate);
optionsMs.maxDate=_toMillis(options.maxDate);}

return _DatePickerAndroid2['default'].open(optionsMs);}return open;}()


/**
   * A date has been selected.
   */},{key:'dateSetAction',get:function(){function get()
{return 'dateSetAction';}return get;}()
/**
   * The dialog has been dismissed.
   */},{key:'dismissedAction',get:function(){function get()
{return 'dismissedAction';}return get;}()}]);return DatePickerAndroid;}();


module.exports=DatePickerAndroid;