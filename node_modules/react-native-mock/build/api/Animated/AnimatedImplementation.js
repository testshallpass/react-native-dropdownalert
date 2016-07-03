var _typeof=typeof Symbol==="function"&&typeof (typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);
var _Interpolation=require('./Interpolation');var _Interpolation2=_interopRequireDefault(_Interpolation);
var _Easing=require('./Easing');var _Easing2=_interopRequireDefault(_Easing);
var _InteractionManager=require('../InteractionManager');var _InteractionManager2=_interopRequireDefault(_InteractionManager);
var _SpringConfig=require('./SpringConfig');var _SpringConfig2=_interopRequireDefault(_SpringConfig);
var _raf=require('raf');var _raf2=_interopRequireDefault(_raf);
var _flattenStyle=require('../../propTypes/flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var 

Animated=function(){function Animated(){_classCallCheck(this,Animated);}_createClass(Animated,[{key:'__attach',value:function(){function __attach()
{}return __attach;}()},{key:'__detach',value:function(){function __detach()
{}return __detach;}()},{key:'__getValue',value:function(){function __getValue()
{}return __getValue;}()},{key:'__getAnimatedValue',value:function(){function __getAnimatedValue()
{return this.__getValue();}return __getAnimatedValue;}()},{key:'__addChild',value:function(){function __addChild(
child){}return __addChild;}()},{key:'__removeChild',value:function(){function __removeChild(
child){}return __removeChild;}()},{key:'__getChildren',value:function(){function __getChildren()
{return [];}return __getChildren;}()}]);return Animated;}();var 


Animation=function(){function Animation(){_classCallCheck(this,Animation);}_createClass(Animation,[{key:'start',value:function(){function start(
fromValue,onUpdate,onEnd,previousAnimation){}return start;}()},{key:'stop',value:function(){function stop()
{}return stop;}()},{key:'__debouncedOnEnd',value:function(){function __debouncedOnEnd(
result){
var onEnd=this.__onEnd;
this.__onEnd=null;
if(onEnd){
onEnd(result);}}return __debouncedOnEnd;}()}]);return Animation;}();var 




AnimatedWithChildren=function(_Animated){_inherits(AnimatedWithChildren,_Animated);
function AnimatedWithChildren(){_classCallCheck(this,AnimatedWithChildren);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedWithChildren).call(this));

_this._children=[];return _this;}_createClass(AnimatedWithChildren,[{key:'__addChild',value:function(){function __addChild(


child){
if(this._children.length===0){
this.__attach();}

this._children.push(child);}return __addChild;}()},{key:'__removeChild',value:function(){function __removeChild(


child){
var index=this._children.indexOf(child);
if(index===-1){
console.warn(
'Trying to remove a child that doesn\'t exist');

return;}

this._children.splice(index,1);
if(this._children.length===0){
this.__detach();}}return __removeChild;}()},{key:'__getChildren',value:function(){function __getChildren()



{
return this._children;}return __getChildren;}()}]);return AnimatedWithChildren;}(Animated);



/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an Animated.Value is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */
function _flush(rootNode){
var animatedStyles=new Set();
function findAnimatedStyles(node){
if(typeof node.update==='function'){
animatedStyles.add(node);}else 
{
node.__getChildren().forEach(findAnimatedStyles);}}


findAnimatedStyles(rootNode);
animatedStyles.forEach(function(animatedStyle){return animatedStyle.update();});}


var easeInOut=_Easing2['default'].inOut(_Easing2['default'].ease);var 

TimingAnimation=function(_Animation){_inherits(TimingAnimation,_Animation);
function TimingAnimation(config){_classCallCheck(this,TimingAnimation);var _this2=_possibleConstructorReturn(this,Object.getPrototypeOf(TimingAnimation).call(this));

_this2._toValue=config.toValue;
_this2._easing=config.easing||easeInOut;
_this2._duration=config.duration!==undefined?config.duration:500;
_this2._delay=config.delay||0;
_this2.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this2;}_createClass(TimingAnimation,[{key:'start',value:function(){function start(


fromValue,onUpdate,onEnd){var _this3=this;
this.__active=true;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;

var start=function(){function start(){
if(_this3._duration===0){
_this3._onUpdate(_this3._toValue);
_this3.__debouncedOnEnd({finished:true});}else 
{
_this3._startTime=Date.now();
_this3._animationFrame=(0,_raf2['default'])(_this3.onUpdate.bind(_this3));}}return start;}();


if(this._delay){
this._timeout=setTimeout(start,this._delay);}else 
{
start();}}return start;}()},{key:'onUpdate',value:function(){function onUpdate()



{
var now=Date.now();
if(now>=this._startTime+this._duration){
if(this._duration===0){
this._onUpdate(this._toValue);}else 
{
this._onUpdate(
this._fromValue+this._easing(1)*(this._toValue-this._fromValue));}


this.__debouncedOnEnd({finished:true});
return;}


this._onUpdate(
this._fromValue+
this._easing((now-this._startTime)/this._duration)*(
this._toValue-this._fromValue));

if(this.__active){
this._animationFrame=(0,_raf2['default'])(this.onUpdate.bind(this));}}return onUpdate;}()},{key:'stop',value:function(){function stop()



{
this.__active=false;
clearTimeout(this._timeout);
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}return stop;}()}]);return TimingAnimation;}(Animation);var 



DecayAnimation=function(_Animation2){_inherits(DecayAnimation,_Animation2);
function DecayAnimation(config){_classCallCheck(this,DecayAnimation);var _this4=_possibleConstructorReturn(this,Object.getPrototypeOf(DecayAnimation).call(this));

_this4._deceleration=config.deceleration||0.998;
_this4._velocity=config.velocity;
_this4.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this4;}_createClass(DecayAnimation,[{key:'start',value:function(){function start(


fromValue,onUpdate,onEnd){
this.__active=true;
this._lastValue=fromValue;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._startTime=Date.now();
this._animationFrame=(0,_raf2['default'])(this.onUpdate.bind(this));}return start;}()},{key:'onUpdate',value:function(){function onUpdate()


{
var now=Date.now();

var value=this._fromValue+
this._velocity/(1-this._deceleration)*(
1-Math.exp(-(1-this._deceleration)*(now-this._startTime)));

this._onUpdate(value);

if(Math.abs(this._lastValue-value)<0.1){
this.__debouncedOnEnd({finished:true});
return;}


this._lastValue=value;
if(this.__active){
this._animationFrame=(0,_raf2['default'])(this.onUpdate.bind(this));}}return onUpdate;}()},{key:'stop',value:function(){function stop()



{
this.__active=false;
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}return stop;}()}]);return DecayAnimation;}(Animation);



function withDefault(value,defaultValue){
if(value===undefined||value===null){
return defaultValue;}

return value;}var 


SpringAnimation=function(_Animation3){_inherits(SpringAnimation,_Animation3);
function SpringAnimation(config){_classCallCheck(this,SpringAnimation);var _this5=_possibleConstructorReturn(this,Object.getPrototypeOf(SpringAnimation).call(this));


_this5._overshootClamping=withDefault(config.overshootClamping,false);
_this5._restDisplacementThreshold=withDefault(config.restDisplacementThreshold,0.001);
_this5._restSpeedThreshold=withDefault(config.restSpeedThreshold,0.001);
_this5._initialVelocity=config.velocity;
_this5._lastVelocity=withDefault(config.velocity,0);
_this5._toValue=config.toValue;
_this5.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;

var springConfig=void 0;
if(config.bounciness!==undefined||config.speed!==undefined){
(0,_invariant2['default'])(
config.tension===undefined&&config.friction===undefined,
'You can only define bounciness/speed or tension/friction but not both');

springConfig=_SpringConfig2['default'].fromBouncinessAndSpeed(
withDefault(config.bounciness,8),
withDefault(config.speed,12));}else 

{
springConfig=_SpringConfig2['default'].fromOrigamiTensionAndFriction(
withDefault(config.tension,40),
withDefault(config.friction,7));}


_this5._tension=springConfig.tension;
_this5._friction=springConfig.friction;return _this5;}_createClass(SpringAnimation,[{key:'start',value:function(){function start(


fromValue,onUpdate,onEnd,previousAnimation){
this.__active=true;
this._startPosition=fromValue;
this._lastPosition=this._startPosition;

this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._lastTime=Date.now();

if(previousAnimation instanceof SpringAnimation){
var internalState=previousAnimation.getInternalState();
this._lastPosition=internalState.lastPosition;
this._lastVelocity=internalState.lastVelocity;
this._lastTime=internalState.lastTime;}

if(this._initialVelocity!==undefined&&this._initialVelocity!==null){
this._lastVelocity=this._initialVelocity;}

this.onUpdate();}return start;}()},{key:'getInternalState',value:function(){function getInternalState()


{
return {
lastPosition:this._lastPosition,
lastVelocity:this._lastVelocity,
lastTime:this._lastTime};}return getInternalState;}()},{key:'onUpdate',value:function(){function onUpdate()



{
var position=this._lastPosition;
var velocity=this._lastVelocity;

var tempPosition=this._lastPosition;
var tempVelocity=this._lastVelocity;

// If for some reason we lost a lot of frames (e.g. process large payload or
// stopped in the debugger), we only advance by 4 frames worth of
// computation and will continue on the next frame. It's better to have it
// running at faster speed than jumping to the end.
var MAX_STEPS=64;
var now=Date.now();
if(now>this._lastTime+MAX_STEPS){
now=this._lastTime+MAX_STEPS;}


// We are using a fixed time step and a maximum number of iterations.
// The following post provides a lot of thoughts into how to build this
// loop: http://gafferongames.com/game-physics/fix-your-timestep/
var TIMESTEP_MSEC=1;
var numSteps=Math.floor((now-this._lastTime)/TIMESTEP_MSEC);

for(var i=0;i<numSteps;++i){
// Velocity is based on seconds instead of milliseconds
var step=TIMESTEP_MSEC/1000;

// This is using RK4. A good blog post to understand how it works:
// http://gafferongames.com/game-physics/integration-basics/
var aVelocity=velocity;
var aAcceleration=
this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+aVelocity*step/2;
tempVelocity=velocity+aAcceleration*step/2;

var bVelocity=tempVelocity;
var bAcceleration=
this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+bVelocity*step/2;
tempVelocity=velocity+bAcceleration*step/2;

var cVelocity=tempVelocity;
var cAcceleration=
this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dVelocity=tempVelocity;
var dAcceleration=
this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dxdt=(aVelocity+2*(bVelocity+cVelocity)+dVelocity)/6;
var dvdt=(aAcceleration+2*(bAcceleration+cAcceleration)+dAcceleration)/6;

position+=dxdt*step;
velocity+=dvdt*step;}


this._lastTime=now;
this._lastPosition=position;
this._lastVelocity=velocity;

this._onUpdate(position);
if(!this.__active){ // a listener might have stopped us in _onUpdate
return;}


// Conditions for stopping the spring animation
var isOvershooting=false;
if(this._overshootClamping&&this._tension!==0){
if(this._startPosition<this._toValue){
isOvershooting=position>this._toValue;}else 
{
isOvershooting=position<this._toValue;}}



var isVelocity=Math.abs(velocity)<=this._restSpeedThreshold;
var isDisplacement=true;
if(this._tension!==0){
isDisplacement=Math.abs(this._toValue-position)<=this._restDisplacementThreshold;}


if(isOvershooting||isVelocity&&isDisplacement){
if(this._tension!==0){
// Ensure that we end up with a round value
this._onUpdate(this._toValue);}


this.__debouncedOnEnd({finished:true});
return;}

this._animationFrame=(0,_raf2['default'])(this.onUpdate.bind(this));}return onUpdate;}()},{key:'stop',value:function(){function stop()


{
this.__active=false;
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}return stop;}()}]);return SpringAnimation;}(Animation);



var _uniqueId=1;var 

AnimatedInterpolation=function(_AnimatedWithChildren){_inherits(AnimatedInterpolation,_AnimatedWithChildren);
function AnimatedInterpolation(parent,interpolation){_classCallCheck(this,AnimatedInterpolation);var _this6=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedInterpolation).call(this));

_this6._parent=parent;
_this6._interpolation=interpolation;return _this6;}_createClass(AnimatedInterpolation,[{key:'__getValue',value:function(){function __getValue()


{
var parentValue=this._parent.__getValue();
(0,_invariant2['default'])(
typeof parentValue==='number',
'Cannot interpolate an input which is not a number.');

return this._interpolation(parentValue);}return __getValue;}()},{key:'interpolate',value:function(){function interpolate(


config){
return new AnimatedInterpolation(this,_Interpolation2['default'].create(config));}return interpolate;}()},{key:'__attach',value:function(){function __attach()


{
this._parent.__addChild(this);}return __attach;}()},{key:'__detach',value:function(){function __detach()


{
this._parent.__removeChild(this);}return __detach;}()}]);return AnimatedInterpolation;}(AnimatedWithChildren);var 




AnimatedValue=function(_AnimatedWithChildren2){_inherits(AnimatedValue,_AnimatedWithChildren2);
function AnimatedValue(value){_classCallCheck(this,AnimatedValue);var _this7=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValue).call(this));

_this7._value=value;
_this7._offset=0;
_this7._animation=null;
_this7._listeners={};return _this7;}_createClass(AnimatedValue,[{key:'__detach',value:function(){function __detach()


{
this.stopAnimation();}return __detach;}()},{key:'__getValue',value:function(){function __getValue()


{
return this._value+this._offset;}return __getValue;}()


/**
   * Directly set the value.  This will stop any animations running on the value
   * and update all the bound properties.
   */},{key:'setValue',value:function(){function setValue(
value){
if(this._animation){
this._animation.stop();
this._animation=null;}

this._updateValue(value);}return setValue;}()


/**
   * Sets an offset that is applied on top of whatever value is set, whether via
   * `setValue`, an animation, or `Animated.event`.  Useful for compensating
   * things like the start of a pan gesture.
   */},{key:'setOffset',value:function(){function setOffset(
offset){
this._offset=offset;}return setOffset;}()


/**
   * Merges the offset value into the base value and resets the offset to zero.
   * The final output of the value is unchanged.
   */},{key:'flattenOffset',value:function(){function flattenOffset()
{
this._value+=this._offset;
this._offset=0;}return flattenOffset;}()


/**
   * Adds an asynchronous listener to the value so you can observe updates from
   * animations.  This is useful because there is no way to
   * synchronously read the value because it might be driven natively.
   */},{key:'addListener',value:function(){function addListener(
callback){
var id=String(_uniqueId++);
this._listeners[id]=callback;
return id;}return addListener;}()},{key:'removeListener',value:function(){function removeListener(


id){
delete this._listeners[id];}return removeListener;}()},{key:'removeAllListeners',value:function(){function removeAllListeners()


{
this._listeners={};}return removeAllListeners;}()


/**
   * Stops any running animation or tracking.  `callback` is invoked with the
   * final value after stopping the animation, which is useful for updating
   * state to match the animation position with layout.
   */},{key:'stopAnimation',value:function(){function stopAnimation(
callback){
this.stopTracking();
if(this._animation){
this._animation.stop();}

this._animation=null;
if(callback){
callback(this.__getValue());}}return stopAnimation;}()



/**
   * Interpolates the value before updating the property, e.g. mapping 0-1 to
   * 0-10.
   */},{key:'interpolate',value:function(){function interpolate(
config){
return new AnimatedInterpolation(this,_Interpolation2['default'].create(config));}return interpolate;}()


/**
   * Typically only used internally, but could be used by a custom Animation
   * class.
   */},{key:'animate',value:function(){function animate(
animation,callback){var _this8=this;
var handle=null;
if(animation.__isInteraction){
handle=_InteractionManager2['default'].createInteractionHandle();}

var previousAnimation=this._animation;
if(this._animation){
this._animation.stop();}

this._animation=animation;
animation.start(
this._value,
function(value){
_this8._updateValue(value);},

function(result){
_this8._animation=null;
if(handle!==null){
_InteractionManager2['default'].clearInteractionHandle(handle);}

if(callback){
callback(result);}},


previousAnimation);}return animate;}()



/**
   * Typically only used internally.
   */},{key:'stopTracking',value:function(){function stopTracking()
{
if(this._tracking){
this._tracking.__detach();}

this._tracking=null;}return stopTracking;}()


/**
   * Typically only used internally.
   */},{key:'track',value:function(){function track(
tracking){
this.stopTracking();
this._tracking=tracking;}return track;}()},{key:'_updateValue',value:function(){function _updateValue(


value){
this._value=value;
_flush(this);
for(var key in this._listeners){
this._listeners[key]({value:this.__getValue()});}}return _updateValue;}()}]);return AnimatedValue;}(AnimatedWithChildren);var 





AnimatedValueXY=function(_AnimatedWithChildren3){_inherits(AnimatedValueXY,_AnimatedWithChildren3);
function AnimatedValueXY(valueIn){_classCallCheck(this,AnimatedValueXY);var _this9=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValueXY).call(this));

var value=valueIn||{x:0,y:0}; // fixme: shouldn't need `: any`
if(typeof value.x==='number'&&typeof value.y==='number'){
_this9.x=new AnimatedValue(value.x);
_this9.y=new AnimatedValue(value.y);}else 
{
(0,_invariant2['default'])(
value.x instanceof AnimatedValue&&
value.y instanceof AnimatedValue,
'AnimatedValueXY must be initalized with an object of numbers or '+
'AnimatedValues.');

_this9.x=value.x;
_this9.y=value.y;}

_this9._listeners={};return _this9;}_createClass(AnimatedValueXY,[{key:'setValue',value:function(){function setValue(


value){
this.x.setValue(value.x);
this.y.setValue(value.y);}return setValue;}()},{key:'setOffset',value:function(){function setOffset(


offset){
this.x.setOffset(offset.x);
this.y.setOffset(offset.y);}return setOffset;}()},{key:'flattenOffset',value:function(){function flattenOffset()


{
this.x.flattenOffset();
this.y.flattenOffset();}return flattenOffset;}()},{key:'__getValue',value:function(){function __getValue()


{
return {
x:this.x.__getValue(),
y:this.y.__getValue()};}return __getValue;}()},{key:'stopAnimation',value:function(){function stopAnimation(



callback){
this.x.stopAnimation();
this.y.stopAnimation();
if(callback){
callback(this.__getValue());}}return stopAnimation;}()},{key:'addListener',value:function(){function addListener(



callback){var _this10=this;
var id=String(_uniqueId++);
var jointCallback=function(){function jointCallback(_ref){var value=_ref.value;
callback(_this10.__getValue());}return jointCallback;}();

this._listeners[id]={
x:this.x.addListener(jointCallback),
y:this.y.addListener(jointCallback)};

return id;}return addListener;}()},{key:'removeListener',value:function(){function removeListener(


id){
this.x.removeListener(this._listeners[id].x);
this.y.removeListener(this._listeners[id].y);
delete this._listeners[id];}return removeListener;}()


/**
   * Converts `{x, y}` into `{left, top}` for use in style, e.g.
   *
   *```javascript
   *  style={this.state.anim.getLayout()}
   *```
   */},{key:'getLayout',value:function(){function getLayout()
{
return {
left:this.x,
top:this.y};}return getLayout;}()



/**
   * Converts `{x, y}` into a useable translation transform, e.g.
   *
   *```javascript
   *  style={{
     *    transform: this.state.anim.getTranslateTransform()
     *  }}
   *```
   */},{key:'getTranslateTransform',value:function(){function getTranslateTransform()
{
return [
{translateX:this.x},
{translateY:this.y}];}return getTranslateTransform;}()}]);return AnimatedValueXY;}(AnimatedWithChildren);var 





AnimatedAddition=function(_AnimatedWithChildren4){_inherits(AnimatedAddition,_AnimatedWithChildren4);
function AnimatedAddition(a,b){_classCallCheck(this,AnimatedAddition);var _this11=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedAddition).call(this));

_this11._a=a;
_this11._b=b;return _this11;}_createClass(AnimatedAddition,[{key:'__getValue',value:function(){function __getValue()


{
return this._a.__getValue()+this._b.__getValue();}return __getValue;}()},{key:'interpolate',value:function(){function interpolate(


config){
return new AnimatedInterpolation(this,_Interpolation2['default'].create(config));}return interpolate;}()},{key:'__attach',value:function(){function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}return __attach;}()},{key:'__detach',value:function(){function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);}return __detach;}()}]);return AnimatedAddition;}(AnimatedWithChildren);var 



AnimatedMultiplication=function(_AnimatedWithChildren5){_inherits(AnimatedMultiplication,_AnimatedWithChildren5);
function AnimatedMultiplication(a,b){_classCallCheck(this,AnimatedMultiplication);var _this12=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedMultiplication).call(this));

_this12._a=a;
_this12._b=b;return _this12;}_createClass(AnimatedMultiplication,[{key:'__getValue',value:function(){function __getValue()


{
return this._a.__getValue()*this._b.__getValue();}return __getValue;}()},{key:'interpolate',value:function(){function interpolate(


config){
return new AnimatedInterpolation(this,_Interpolation2['default'].create(config));}return interpolate;}()},{key:'__attach',value:function(){function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}return __attach;}()},{key:'__detach',value:function(){function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);}return __detach;}()}]);return AnimatedMultiplication;}(AnimatedWithChildren);var 



AnimatedTransform=function(_AnimatedWithChildren6){_inherits(AnimatedTransform,_AnimatedWithChildren6);
function AnimatedTransform(transforms){_classCallCheck(this,AnimatedTransform);var _this13=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTransform).call(this));

_this13._transforms=transforms;return _this13;}_createClass(AnimatedTransform,[{key:'__getValue',value:function(){function __getValue()


{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getValue();}else 
{
result[key]=value;}}


return result;});}return __getValue;}()},{key:'__getAnimatedValue',value:function(){function __getAnimatedValue()



{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getAnimatedValue();}else 
{
// All transform components needed to recompose matrix
result[key]=value;}}


return result;});}return __getAnimatedValue;}()},{key:'__attach',value:function(){function __attach()



{var _this14=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__addChild(_this14);}}});}return __attach;}()},{key:'__detach',value:function(){function __detach()





{var _this15=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__removeChild(_this15);}}});}return __detach;}()}]);return AnimatedTransform;}(AnimatedWithChildren);var 






AnimatedStyle=function(_AnimatedWithChildren7){_inherits(AnimatedStyle,_AnimatedWithChildren7);
function AnimatedStyle(style){_classCallCheck(this,AnimatedStyle);var _this16=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedStyle).call(this));

var newStyle=void 0;
newStyle=(0,_flattenStyle2['default'])(style)||{};
if(newStyle.transform){
newStyle=_extends({},
newStyle,{
transform:new AnimatedTransform(newStyle.transform)});}


_this16._style=newStyle;return _this16;}_createClass(AnimatedStyle,[{key:'__getValue',value:function(){function __getValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getValue();}else 
{
style[key]=value;}}


return style;}return __getValue;}()},{key:'__getAnimatedValue',value:function(){function __getAnimatedValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getAnimatedValue();}}


return style;}return __getAnimatedValue;}()},{key:'__attach',value:function(){function __attach()


{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__addChild(this);}}}return __attach;}()},{key:'__detach',value:function(){function __detach()




{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__removeChild(this);}}}return __detach;}()}]);return AnimatedStyle;}(AnimatedWithChildren);var 





AnimatedProps=function(_Animated2){_inherits(AnimatedProps,_Animated2);
function AnimatedProps(props,callback){_classCallCheck(this,AnimatedProps);var _this17=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedProps).call(this));

_this17._props=props;
if(_this17._props.style){
_this17._props=_extends({},
_this17._props,{
style:new AnimatedStyle(_this17._props.style)});}


_this17._callback=callback;
_this17.__attach();return _this17;}_createClass(AnimatedProps,[{key:'__getValue',value:function(){function __getValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getValue();}else 
{
props[key]=value;}}


return props;}return __getValue;}()},{key:'__getAnimatedValue',value:function(){function __getAnimatedValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getAnimatedValue();}}


return props;}return __getAnimatedValue;}()},{key:'__attach',value:function(){function __attach()


{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__addChild(this);}}}return __attach;}()},{key:'__detach',value:function(){function __detach()




{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__removeChild(this);}}}return __detach;}()},{key:'update',value:function(){function update()




{
this._callback();}return update;}()}]);return AnimatedProps;}(Animated);var 



AnimatedTracking=function(_Animated3){_inherits(AnimatedTracking,_Animated3);
function AnimatedTracking(value,parent,animationClass,animationConfig,callback){_classCallCheck(this,AnimatedTracking);var _this18=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTracking).call(this));

_this18._value=value;
_this18._parent=parent;
_this18._animationClass=animationClass;
_this18._animationConfig=animationConfig;
_this18._callback=callback;
_this18.__attach();return _this18;}_createClass(AnimatedTracking,[{key:'__getValue',value:function(){function __getValue()


{
return this._parent.__getValue();}return __getValue;}()},{key:'__attach',value:function(){function __attach()


{
this._parent.__addChild(this);}return __attach;}()},{key:'__detach',value:function(){function __detach()


{
this._parent.__removeChild(this);}return __detach;}()},{key:'update',value:function(){function update()


{
this._value.animate(new this._animationClass(_extends({},
this._animationConfig,{
toValue:this._animationConfig.toValue.__getValue()})),
this._callback);}return update;}()}]);return AnimatedTracking;}(Animated);



function add(a,b){
return new AnimatedAddition(a,b);}


function multiply(a,b){
return new AnimatedMultiplication(a,b);}


function parallel(animations,config){
var doneCount=0;
// Make sure we only call stop() at most once for each animation
var hasEnded={};
var stopTogether=!(config&&config.stopTogether===false);

var result={
start:function(){function start(callback){
if(doneCount===animations.length){
if(callback){
callback({finished:true});}

return;}


animations.forEach(function(animation,idx){
var cb=function(){function cb(endResult){
hasEnded[idx]=true;
doneCount++;
if(doneCount===animations.length){
doneCount=0;
if(callback){
callback(endResult);}

return;}


if(!endResult.finished&&stopTogether){
result.stop();}}return cb;}();



if(!animation){
cb({finished:true});}else 
{
animation.start(cb);}});}return start;}(),




stop:function(){function stop(){
animations.forEach(function(animation,idx){
if(!hasEnded[idx]){
animation.stop();}

hasEnded[idx]=true;});}return stop;}()};




return result;}


function maybeVectorAnim(value,config,anim){
if(value instanceof AnimatedValueXY){
var configX=_extends({},config);
var configY=_extends({},config);
for(var key in config){var _config$key=
config[key];var x=_config$key.x;var y=_config$key.y;
if(x!==undefined&&y!==undefined){
configX[key]=x;
configY[key]=y;}}


var aX=anim(value.x,configX);
var aY=anim(value.y,configY);
// We use `stopTogether: false` here because otherwise tracking will break
// because the second animation will get stopped before it can update.
return parallel([aX,aY],{stopTogether:false});}

return null;}


function spring(value,config){
return maybeVectorAnim(value,config,spring)||{
start:function(){function start(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
SpringAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new SpringAnimation(singleConfig),callback);}}return start;}(),



stop:function(){function stop(){
value.stopAnimation();}return stop;}()};}




function timing(value,config){
return maybeVectorAnim(value,config,timing)||{
start:function(){function start(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
TimingAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new TimingAnimation(singleConfig),callback);}}return start;}(),



stop:function(){function stop(){
value.stopAnimation();}return stop;}()};}




function decay(value,config){
return maybeVectorAnim(value,config,decay)||{
start:function(){function start(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
singleValue.animate(new DecayAnimation(singleConfig),callback);}return start;}(),


stop:function(){function stop(){
value.stopAnimation();}return stop;}()};}




function sequence(animations){
var current=0;
return {
start:function(){function start(callback){
var onComplete=function(){function onComplete(result){
if(!result.finished){
if(callback){
callback(result);}

return;}


current++;

if(current===animations.length){
if(callback){
callback(result);}

return;}


animations[current].start(onComplete);}return onComplete;}();


if(animations.length===0){
if(callback){
callback({finished:true});}}else 

{
animations[current].start(onComplete);}}return start;}(),



stop:function(){function stop(){
if(current<animations.length){
animations[current].stop();}}return stop;}()};}





function delay(time){
// Would be nice to make a specialized implementation
return timing(new AnimatedValue(0),{toValue:0,delay:time,duration:0});}


function stagger(time,animations){
return parallel(animations.map(function(animation,i){
return sequence([
delay(time*i),
animation]);}));}




function event(argMapping,config){
return function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
var traverse=function(){function traverse(recMapping,recEvt,key){
if(typeof recEvt==='number'){
(0,_invariant2['default'])(
recMapping instanceof AnimatedValue,
'Bad mapping of type '+(typeof recMapping==='undefined'?'undefined':_typeof(recMapping))+' for key '+key+
', event value must map to AnimatedValue');

recMapping.setValue(recEvt);
return;}

(0,_invariant2['default'])(
(typeof recMapping==='undefined'?'undefined':_typeof(recMapping))==='object',
'Bad mapping of type '+(typeof recMapping==='undefined'?'undefined':_typeof(recMapping))+' for key '+key);

(0,_invariant2['default'])(
(typeof recEvt==='undefined'?'undefined':_typeof(recEvt))==='object',
'Bad event of type '+(typeof recEvt==='undefined'?'undefined':_typeof(recEvt))+' for key '+key);

for(var i in recMapping){
traverse(recMapping[i],recEvt[i],i);}}return traverse;}();


argMapping.forEach(function(mapping,idx){
traverse(mapping,args[idx],'arg'+idx);});

if(config&&config.listener){
config.listener.apply(null,args);}};}




var AnimatedImplementation={
Value:AnimatedValue,
ValueXY:AnimatedValueXY,
decay:decay,
timing:timing,
spring:spring,
add:add,
multiply:multiply,
sequence:sequence,
parallel:parallel,
stagger:stagger,
event:event,

__PropsOnlyForTests:AnimatedProps,
__Animated:Animated,
__Animation:Animation,
__AnimatedWithChildren:AnimatedWithChildren,
__AnimatedStyle:AnimatedStyle};


module.exports=AnimatedImplementation;