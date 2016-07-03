var _DeviceEventEmitter=require('../plugins/DeviceEventEmitter');var _DeviceEventEmitter2=_interopRequireDefault(_DeviceEventEmitter);
var _AppState=require('../NativeModules/AppState');var _AppState2=_interopRequireDefault(_AppState);
var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var logError=function(){function logError(error){return console.error(error);}return logError;}();

var _eventHandlers={
change:new Map(),
memoryWarning:new Map()};


/**
 * `AppStateIOS` can tell you if the app is in the foreground or background,
 * and notify you when the state changes.
 *
 * AppStateIOS is frequently used to determine the intent and proper behavior when
 * handling push notifications.
 *
 * ### iOS App States
 *
 *  - `active` - The app is running in the foreground
 *  - `background` - The app is running in the background. The user is either
 *     in another app or on the home screen
 *  - `inactive` - This is a transition state that currently never happens for
 *     typical React Native apps.
 *
 * For more information, see
 * [Apple's documentation](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html)
 *
 * ### Basic Usage
 *
 * To see the current state, you can check `AppStateIOS.currentState`, which
 * will be kept up-to-date. However, `currentState` will be null at launch
 * while `AppStateIOS` retrieves it over the bridge.
 *
 * ```
 * getInitialState: function() {
 *   return {
 *     currentAppState: AppStateIOS.currentState,
 *   };
 * },
 * componentDidMount: function() {
 *   AppStateIOS.addEventListener('change', this._handleAppStateChange);
 * },
 * componentWillUnmount: function() {
 *   AppStateIOS.removeEventListener('change', this._handleAppStateChange);
 * },
 * _handleAppStateChange: function(currentAppState) {
 *   this.setState({ currentAppState, });
 * },
 * render: function() {
 *   return (
 *     <Text>Current state is: {this.state.currentAppState}</Text>
 *   );
 * },
 * ```
 *
 * This example will only ever appear to say "Current state is: active" because
 * the app is only visible to the user when in the `active` state, and the null
 * state will happen only momentarily.
 */

var AppStateIOS={

/**
   * Add a handler to AppState changes by listening to the `change` event type
   * and providing the handler
   */
addEventListener:function(){function addEventListener(type,handler){
(0,_invariant2['default'])(
['change','memoryWarning'].indexOf(type)!==-1,
'Trying to subscribe to unknown event: "%s"',type);

if(type==='change'){
_eventHandlers[type].set(handler,_DeviceEventEmitter2['default'].addListener(
'appStateDidChange',
function(appStateData){
handler(appStateData.app_state);}));}else 


if(type==='memoryWarning'){
_eventHandlers[type].set(handler,_DeviceEventEmitter2['default'].addListener(
'memoryWarning',
handler));}}return addEventListener;}(),




/**
   * Remove a handler by passing the `change` event type and the handler
   */
removeEventListener:function(){function removeEventListener(type,handler){
(0,_invariant2['default'])(
['change','memoryWarning'].indexOf(type)!==-1,
'Trying to remove listener for unknown event: "%s"',type);

if(!_eventHandlers[type].has(handler)){
return;}

_eventHandlers[type].get(handler).remove();
_eventHandlers[type]['delete'](handler);}return removeEventListener;}(),


// TODO: getCurrentAppState callback seems to be called at a really late stage
// after app launch. Trying to get currentState when mounting App component
// will likely to have the initial value here.
// Initialize to 'active' instead of null.
currentState:'active'};



_DeviceEventEmitter2['default'].addListener(
'appStateDidChange',
function(appStateData){
AppStateIOS.currentState=appStateData.app_state;});



_AppState2['default'].getCurrentAppState(
function(appStateData){
AppStateIOS.currentState=appStateData.app_state;},

logError);


module.exports=AppStateIOS;