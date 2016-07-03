var _react=require('react');var _react2=_interopRequireDefault(_react);



var _StyleSheetPropType=require('../propTypes/StyleSheetPropType');var _StyleSheetPropType2=_interopRequireDefault(_StyleSheetPropType);
var _TextStylePropTypes=require('../propTypes/TextStylePropTypes');var _TextStylePropTypes2=_interopRequireDefault(_TextStylePropTypes);
var _NativeMethodsMixin=require('../mixins/NativeMethodsMixin');var _NativeMethodsMixin2=_interopRequireDefault(_NativeMethodsMixin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Text/Text.js
 */var stylePropType=(0,_StyleSheetPropType2['default'])(_TextStylePropTypes2['default']);

var Text=_react2['default'].createClass({displayName:'Text',
propTypes:{
/**
     * Used to truncate the text with an ellipsis after computing the text
     * layout, including line wrapping, such that the total number of lines
     * does not exceed this number.
     */
numberOfLines:_react2['default'].PropTypes.number,
/**
     * Invoked on mount and layout changes with
     *
     *   `{nativeEvent: {layout: {x, y, width, height}}}`
     */
onLayout:_react2['default'].PropTypes.func,
/**
     * This function is called on press.
     */
onPress:_react2['default'].PropTypes.func,
/**
     * When true, no visual change is made when text is pressed down. By
     * default, a gray oval highlights the text on press down.
     * @platform ios
     */
suppressHighlighting:_react2['default'].PropTypes.bool,
style:stylePropType,
/**
     * Used to locate this view in end-to-end tests.
     */
testID:_react2['default'].PropTypes.string,
/**
     * Specifies should fonts scale to respect Text Size accessibility setting on iOS.
     * @platform ios
     */
allowFontScaling:_react2['default'].PropTypes.bool},

mixins:[_NativeMethodsMixin2['default']],

render:function(){function render(){
return null;}return render;}()});



module.exports=Text;