var _typeof=typeof Symbol==="function"&&typeof (typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _AlertManager=require('../NativeModules/AlertManager');var _AlertManager2=_interopRequireDefault(_AlertManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}
/**
 * The AlertsIOS utility provides two functions: `alert` and `prompt`. All
 * functionality available through `AlertIOS.alert` is also available in the
 * cross-platform `Alert.alert`, which we recommend you use if you don't need
 * iOS-specific functionality.
 *
 * `AlertIOS.prompt` allows you to prompt the user for input inside of an
 * alert popup.
 *
 */var 
AlertIOS=function(){function AlertIOS(){_classCallCheck(this,AlertIOS);}_createClass(AlertIOS,null,[{key:'alert',
/**
   * Creates a popup to alert the user. See
   * [Alert](/react-native/docs/alert.html).
   *
   *  - title: string -- The dialog's title.
   *  - message: string -- An optional message that appears above the text input.
   *  - callbackOrButtons -- This optional argument should be either a
   *    single-argument function or an array of buttons. If passed a function,
   *    it will be called when the user taps 'OK'.
   *
   *    If passed an array of button configurations, each button should include
   *    a `text` key, as well as optional `onPress` and `style` keys.
   *    `style` should be one of 'default', 'cancel' or 'destructive'.
   *  - type -- *deprecated, do not use*
   *
   * Example:
   *
   * ```
   * AlertIOS.alert(
   *  'Sync Complete',
   *  'All your data are belong to us.'
   * );
   * ```
   */value:function(){function alert(
title,message,callbackOrButtons,type){
if(typeof type!=='undefined'){
console.warn(
'AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');

this.prompt(title,message,callbackOrButtons,type);
return;}

this.prompt(title,message,callbackOrButtons,'default');}return alert;}()


/**
   * Prompt the user to enter some text.
   *
   *  - title: string -- The dialog's title.
   *  - message: string -- An optional message that appears above the text input.
   *  - callbackOrButtons -- This optional argument should be either a
   *    single-argument function or an array of buttons. If passed a function,
   *    it will be called with the prompt's value when the user taps 'OK'.
   *
   *    If passed an array of button configurations, each button should include
   *    a `text` key, as well as optional `onPress` and `style` keys (see example).
   *    `style` should be one of 'default', 'cancel' or 'destructive'.
   *  - type: string -- This configures the text input. One of 'plain-text',
   *    'secure-text' or 'login-password'.
   *  - defaultValue: string -- the default value for the text field.
   *
   * Example with custom buttons:
   * ```
   * AlertIOS.prompt(
   *   'Enter password',
   *   'Enter your password to claim your $1.5B in lottery winnings',
   *   [
   *     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
   *     {text: 'OK', onPress: password => console.log('OK Pressed, password: ' + password)},
   *   ],
   *   'secure-text'
   * );
   * ```
   *
   * Example with the default button and a custom callback:
   * ```
   * AlertIOS.prompt(
   *   'Update username',
   *   null,
   *   text => console.log("Your username is "+text),
   *   null,
   *   'default'
   * )
   * ```
   */},{key:'prompt',value:function(){function prompt(
title,message,callbackOrButtons,type,defaultValue){
if(typeof type==='function'){var _ret=function(){
var callback=type;
_AlertManager2['default'].alertWithArgs({
title:title||undefined,
type:'plain-text',
message:message},
function(id,value){
callback(value);});

return {v:void 0};}();if((typeof _ret==='undefined'?'undefined':_typeof(_ret))==="object")return _ret.v;}


var callbacks=[];
var buttons=[];
var cancelButtonKey=void 0;
var destructiveButtonKey=void 0;
if(typeof callbackOrButtons==='function'){
callbacks=[callbackOrButtons];}else 
if(callbackOrButtons instanceof Array){
callbackOrButtons.forEach(function(btn,index){
callbacks[index]=btn.onPress;
if(btn.style==='cancel'){
cancelButtonKey=String(index);}else 
if(btn.style==='destructive'){
destructiveButtonKey=String(index);}

if(btn.text||index<(callbackOrButtons||[]).length-1){
var btnDef={};
btnDef[index]=btn.text||'';
buttons.push(btnDef);}});}




_AlertManager2['default'].alertWithArgs(
{
title:title||undefined,
message:message||undefined,
buttons:buttons,
type:type||undefined,
defaultValue:defaultValue,
cancelButtonKey:cancelButtonKey,
destructiveButtonKey:destructiveButtonKey},

function(id,value){
var cb=callbacks[id];
if(cb){
cb(value);}});}return prompt;}()}]);return AlertIOS;}();






module.exports=AlertIOS;