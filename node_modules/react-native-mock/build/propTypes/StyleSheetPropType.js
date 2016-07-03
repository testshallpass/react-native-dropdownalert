var _react=require('react');var _react2=_interopRequireDefault(_react);



var _flattenStyle=require('./flattenStyle');var _flattenStyle2=_interopRequireDefault(_flattenStyle);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /**
 * https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/StyleSheetPropType.js
 */var PropTypes=_react2['default'].PropTypes;

function StyleSheetPropType(shape){
var shapePropType=PropTypes.shape(shape);
return function(props,propName,componentName,location){
var newProps=props;
if(props[propName]){
// Just make a dummy prop object with only the flattened style
newProps={};
newProps[propName]=(0,_flattenStyle2['default'])(props[propName]);}

return shapePropType(newProps,propName,componentName,location);};}



module.exports=StyleSheetPropType;