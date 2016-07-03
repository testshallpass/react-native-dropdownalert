var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/View/ViewStylePropTypes.js
 */
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _ColorPropType=require('./ColorPropType');var _ColorPropType2=_interopRequireDefault(_ColorPropType);
var _LayoutPropTypes=require('./LayoutPropTypes');var _LayoutPropTypes2=_interopRequireDefault(_LayoutPropTypes);
var _ShadowPropTypesIOS=require('./ShadowPropTypesIOS');var _ShadowPropTypesIOS2=_interopRequireDefault(_ShadowPropTypesIOS);
var _TransformPropTypes=require('./TransformPropTypes');var _TransformPropTypes2=_interopRequireDefault(_TransformPropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

/**
 * Warning: Some of these properties may not be supported in all releases.
 */
var ViewStylePropTypes=_extends({},_LayoutPropTypes2['default'],_ShadowPropTypesIOS2['default'],_TransformPropTypes2['default'],{



backfaceVisibility:PropTypes.oneOf(['visible','hidden']),
backgroundColor:_ColorPropType2['default'],
borderColor:_ColorPropType2['default'],
borderTopColor:_ColorPropType2['default'],
borderRightColor:_ColorPropType2['default'],
borderBottomColor:_ColorPropType2['default'],
borderLeftColor:_ColorPropType2['default'],
borderRadius:PropTypes.number,
borderTopLeftRadius:PropTypes.number,
borderTopRightRadius:PropTypes.number,
borderBottomLeftRadius:PropTypes.number,
borderBottomRightRadius:PropTypes.number,
borderStyle:PropTypes.oneOf(['solid','dotted','dashed']),
borderWidth:PropTypes.number,
borderTopWidth:PropTypes.number,
borderRightWidth:PropTypes.number,
borderBottomWidth:PropTypes.number,
borderLeftWidth:PropTypes.number,
opacity:PropTypes.number,
overflow:PropTypes.oneOf(['visible','hidden']),
/**
   * (Android-only) Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   * @platform android
   */
elevation:PropTypes.number});


module.exports=ViewStylePropTypes;