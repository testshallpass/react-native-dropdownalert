var _react=require('react');var _react2=_interopRequireDefault(_react);
var _UIManager=require('../NativeModules/UIManager');var _UIManager2=_interopRequireDefault(_UIManager);
var _keymirror=require('keymirror');var _keymirror2=_interopRequireDefault(_keymirror);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

var TypesEnum={
spring:true,
linear:true,
easeInEaseOut:true,
easeIn:true,
easeOut:true,
keyboard:true};


var Types=(0,_keymirror2['default'])(TypesEnum);

var PropertiesEnum={
opacity:true,
scaleXY:true};


var Properties=(0,_keymirror2['default'])(PropertiesEnum);

var animChecker=PropTypes.shape({
duration:PropTypes.number,
delay:PropTypes.number,
springDamping:PropTypes.number,
initialVelocity:PropTypes.number,
type:PropTypes.oneOf(
Object.keys(Types)),

property:PropTypes.oneOf( // Only applies to create/delete
Object.keys(Properties))});



var configChecker=PropTypes.shape({
duration:PropTypes.number.isRequired,
create:animChecker,
update:animChecker,
'delete':animChecker});


var nop=function(){function nop(){}return nop;}();

function configureNext(config,onAnimationDidEnd){
configChecker({config:config},'config','LayoutAnimation.configureNext');
_UIManager2['default'].configureNextLayoutAnimation(
config,
onAnimationDidEnd||nop,
nop);}



function create(duration,type,creationProp){
return {
duration:duration,
create:{
type:type,
property:creationProp},

update:{
type:type}};}




var Presets={
easeInEaseOut:create(
300,Types.easeInEaseOut,Properties.opacity),

linear:create(
500,Types.linear,Properties.opacity),

spring:{
duration:700,
create:{
type:Types.linear,
property:Properties.opacity},

update:{
type:Types.spring,
springDamping:0.4}}};




var LayoutAnimation={
/**
   * Schedules an animation to happen on the next layout.
   *
   * @param config Specifies animation properties:
   *
   *   - `duration` in milliseconds
   *   - `create`, config for animating in new views (see `Anim` type)
   *   - `update`, config for animating views that have been updated
   * (see `Anim` type)
   *
   * @param onAnimationDidEnd Called when the animation finished.
   * Only supported on iOS.
   * @param onError Called on error. Only supported on iOS.
   */
configureNext:configureNext,
/**
   * Helper for creating a config for `configureNext`.
   */
create:create,
Types:Types,
Properties:Properties,
configChecker:configChecker,
Presets:Presets,
easeInEaseOut:configureNext.bind(
null,Presets.easeInEaseOut),

linear:configureNext.bind(
null,Presets.linear),

spring:configureNext.bind(
null,Presets.spring)};



module.exports=LayoutAnimation;