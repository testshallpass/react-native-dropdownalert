var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageStylePropTypes.js
 */
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _ColorPropType=require('./ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);
var _TransformPropTypes=require('./TransformPropTypes');var _TransformPropTypes2=_interopRequireDefault(_TransformPropTypes);
var _ShadowPropTypesIOS=require('./ShadowPropTypesIOS');var _ShadowPropTypesIOS2=_interopRequireDefault(_ShadowPropTypesIOS);
var _LayoutPropTypes=require('./LayoutPropTypes');var _LayoutPropTypes2=_interopRequireDefault(_LayoutPropTypes);
var _ImageResizeMode=require('./ImageResizeMode');var _ImageResizeMode2=_interopRequireDefault(_ImageResizeMode);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

var ImageStylePropTypes=_extends({},_LayoutPropTypes2['default'],_ShadowPropTypesIOS2['default'],_TransformPropTypes2['default'],{



resizeMode:PropTypes.oneOf(_ImageResizeMode2['default']),
backfaceVisibility:PropTypes.oneOf(['visible','hidden']),
backgroundColor:_ColorPropType2['default'],
borderColor:_ColorPropType2['default'],
borderWidth:PropTypes.number,
borderRadius:PropTypes.number,
overflow:PropTypes.oneOf(['visible','hidden']),

/**
   * iOS-Specific style to "tint" an image.
   * Changes the color of all the non-transparent pixels to the tintColor.
   * @platform ios
   */
tintColor:_ColorPropType2['default'],
opacity:PropTypes.number,
/**
   * When the image has rounded corners, specifying an overlayColor will
   * cause the remaining space in the corners to be filled with a solid color.
   * This is useful in cases which are not supported by the Android
   * implementation of rounded corners:
   *   - Certain resize modes, such as 'contain'
   *   - Animated GIFs
   *
   * A typical way to use this prop is with images displayed on a solid
   * background and setting the `overlayColor` to the same color
   * as the background.
   *
   * For details of how this works under the hood, see
   * http://frescolib.org/docs/rounded-corners-and-circles.html
   *
   * @platform android
   */
overlayColor:PropTypes.string});


module.exports=ImageStylePropTypes;