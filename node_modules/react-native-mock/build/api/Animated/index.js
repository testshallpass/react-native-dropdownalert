var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _View=require('../../components/View');var _View2=_interopRequireDefault(_View);
var _Text=require('../../components/Text');var _Text2=_interopRequireDefault(_Text);
var _Image=require('../../components/Image');var _Image2=_interopRequireDefault(_Image);
var _createAnimatedComponent=require('./createAnimatedComponent');var _createAnimatedComponent2=_interopRequireDefault(_createAnimatedComponent);
var _AnimatedImplementation=require('./AnimatedImplementation');var _AnimatedImplementation2=_interopRequireDefault(_AnimatedImplementation);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

module.exports=_extends({},_AnimatedImplementation2['default'],{

createAnimatedComponent:_createAnimatedComponent2['default'],
View:(0,_createAnimatedComponent2['default'])(_View2['default']),
Text:(0,_createAnimatedComponent2['default'])(_Text2['default']),
Image:(0,_createAnimatedComponent2['default'])(_Image2['default'])});