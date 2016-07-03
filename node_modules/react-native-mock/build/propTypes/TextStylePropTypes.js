var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Text/TextStylePropTypes.js
 */
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _ColorPropType=require('./ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);
var _ViewStylePropTypes=require('./ViewStylePropTypes');var _ViewStylePropTypes2=_interopRequireDefault(_ViewStylePropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

// TODO: use spread instead of Object.assign/create after #6560135 is fixed
var TextStylePropTypes=_extends(Object.create(_ViewStylePropTypes2['default']),{
color:_ColorPropType2['default'],
fontFamily:PropTypes.string,
fontSize:PropTypes.number,
fontStyle:PropTypes.oneOf(['normal','italic']),
/**
   * Specifies font weight. The values 'normal' and 'bold' are supported for
   * most fonts. Not all fonts have a variant for each of the numeric values,
   * in that case the closest one is chosen.
   */
fontWeight:PropTypes.oneOf(
['normal','bold',
'100','200','300','400','500','600','700','800','900']),

textShadowOffset:PropTypes.shape(
{
width:PropTypes.number,
height:PropTypes.number}),


textShadowRadius:PropTypes.number,
textShadowColor:_ColorPropType2['default'],
/**
   * @platform ios
   */
letterSpacing:PropTypes.number,
lineHeight:PropTypes.number,
/**
   * Specifies text alignment. The value 'justify' is only supported on iOS.
   */
textAlign:PropTypes.oneOf(
['auto','left','right','center','justify']),

/**
   * @platform android
   */
textAlignVertical:PropTypes.oneOf(
['auto','top','bottom','center']),

/**
   * @platform ios
   */
textDecorationLine:PropTypes.oneOf(
['none','underline','line-through','underline line-through']),

/**
   * @platform ios
   */
textDecorationStyle:PropTypes.oneOf(
['solid','double','dotted','dashed']),

/**
   * @platform ios
   */
textDecorationColor:_ColorPropType2['default'],
/**
   * @platform ios
   */
writingDirection:PropTypes.oneOf(
['auto','ltr','rtl'])});



module.exports=TextStylePropTypes;