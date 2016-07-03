var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}




function requireNativeComponent(viewName,componentInterface,extraConfig){
return _react2['default'].createClass({
displayName:viewName,
render:function(){function render(){
return null;}return render;}()});} /**
 * https://github.com/facebook/react-native/blob/master/Libraries/ReactIOS/requireNativeComponent.js
 */


module.exports=requireNativeComponent;