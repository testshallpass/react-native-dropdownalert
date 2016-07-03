var _react=require('react');var _react2=_interopRequireDefault(_react);
var _ColorPropType=require('./ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

var ShadowPropTypesIOS={
/**
   * Sets the drop shadow color
   * @platform ios
   */
shadowColor:_ColorPropType2['default'],
/**
   * Sets the drop shadow offset
   * @platform ios
   */
shadowOffset:PropTypes.shape({
width:PropTypes.number,
height:PropTypes.number}),

/**
   * Sets the drop shadow opacity (multiplied by the color's alpha component)
   * @platform ios
   */
shadowOpacity:PropTypes.number,
/**
   * Sets the drop shadow blur radius
   * @platform ios
   */
shadowRadius:PropTypes.number};


module.exports=ShadowPropTypesIOS;