var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _cubicBezier=require('cubic-bezier');var _cubicBezier2=_interopRequireDefault(_cubicBezier);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var _ease=function(){function _ease(){}return _ease;}();

var EPSILON=1000/60/500/4;

/**
 * This class implements common easing functions. The math is pretty obscure,
 * but this cool website has nice visual illustrations of what they represent:
 * http://xaedes.de/dev/transitions/
 */var 
Easing=function(){function Easing(){_classCallCheck(this,Easing);}_createClass(Easing,null,[{key:'step0',value:function(){function step0(
n){
return n>0?1:0;}return step0;}()},{key:'step1',value:function(){function step1(


n){
return n>=1?1:0;}return step1;}()},{key:'linear',value:function(){function linear(


t){
return t;}return linear;}()},{key:'ease',value:function(){function ease(


t){
return _ease(t);}return ease;}()},{key:'quad',value:function(){function quad(


t){
return t*t;}return quad;}()},{key:'cubic',value:function(){function cubic(


t){
return t*t*t;}return cubic;}()},{key:'poly',value:function(){function poly(


n){
return function(t){return Math.pow(t,n);};}return poly;}()},{key:'sin',value:function(){function sin(


t){
return 1-Math.cos(t*Math.PI/2);}return sin;}()},{key:'circle',value:function(){function circle(


t){
return 1-Math.sqrt(1-t*t);}return circle;}()},{key:'exp',value:function(){function exp(


t){
return Math.pow(2,10*(t-1));}return exp;}()


/**
   * A simple elastic interaction, similar to a spring.  Default bounciness
   * is 1, which overshoots a little bit once.  0 bounciness doesn't overshoot
   * at all, and bounciness of N > 1 will overshoot about N times.
   *
   * Wolfram Plots:
   *
   *   http://tiny.cc/elastic_b_1 (default bounciness = 1)
   *   http://tiny.cc/elastic_b_3 (bounciness = 3)
   */},{key:'elastic',value:function(){function elastic()
{var bounciness=arguments.length<=0||arguments[0]===undefined?1:arguments[0];
var p=bounciness*Math.PI;
return function(t){return 1-Math.pow(Math.cos(t*Math.PI/2),3)*Math.cos(t*p);};}return elastic;}()},{key:'back',value:function(){function back()


{var s=arguments.length<=0||arguments[0]===undefined?1.70158:arguments[0];
return function(t){return t*t*((s+1)*t-s);};}return back;}()},{key:'bounce',value:function(){function bounce(


argT){
var t=argT;
if(t<1/2.75){
return 7.5625*t*t;}


if(t<2/2.75){
t-=1.5/2.75;
return 7.5625*t*t+0.75;}


if(t<2.5/2.75){
t-=2.25/2.75;
return 7.5625*t*t+0.9375;}


t-=2.625/2.75;
return 7.5625*t*t+0.984375;}return bounce;}()},{key:'bezier',value:function(){function bezier(


x1,y1,x2,y2){var epsilon=arguments.length<=4||arguments[4]===undefined?EPSILON:arguments[4];
return (0,_cubicBezier2['default'])(x1,y1,x2,y2,epsilon);}return bezier;}()},{key:'in',value:function(){function _in(


easing){
return easing;}return _in;}()


/**
   * Runs an easing function backwards.
   */},{key:'out',value:function(){function out(
easing){
return function(t){return 1-easing(1-t);};}return out;}()


/**
   * Makes any easing function symmetrical.
   */},{key:'inOut',value:function(){function inOut(
easing){
return function(t){
if(t<0.5){
return easing(t*2)/2;}

return 1-easing((1-t)*2)/2;};}return inOut;}()}]);return Easing;}();




_ease=Easing.bezier(0.42,0,1,1);

module.exports=Easing;