var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

function createMockComponent(displayName){
return _react2['default'].createClass({
displayName:displayName,
render:function(){function render(){
return null;}return render;}()});}




module.exports=createMockComponent;