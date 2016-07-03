var _react=require('react');var _react2=_interopRequireDefault(_react);



var _EdgeInsetsPropType=require('../propTypes/EdgeInsetsPropType');var _EdgeInsetsPropType2=_interopRequireDefault(_EdgeInsetsPropType);
var _View=require('./View');var _View2=_interopRequireDefault(_View);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var TouchableWithoutFeedback=_react2['default'].createClass({displayName:'TouchableWithoutFeedback',
propTypes:{
accessible:_react2['default'].PropTypes.bool,
accessibilityComponentType:_react2['default'].PropTypes.oneOf(_View2['default'].AccessibilityComponentType),
accessibilityTraits:_react2['default'].PropTypes.oneOfType([
_react2['default'].PropTypes.oneOf(_View2['default'].AccessibilityTraits),
_react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.oneOf(_View2['default'].AccessibilityTraits))]),

/**
     * If true, disable all interactions for this component.
     */
disabled:_react2['default'].PropTypes.bool,
/**
     * Called when the touch is released, but not if cancelled (e.g. by a scroll
     * that steals the responder lock).
     */
onPress:_react2['default'].PropTypes.func,
onPressIn:_react2['default'].PropTypes.func,
onPressOut:_react2['default'].PropTypes.func,
/**
     * Invoked on mount and layout changes with
     *
     *   `{nativeEvent: {layout: {x, y, width, height}}}`
     */
onLayout:_react2['default'].PropTypes.func,

onLongPress:_react2['default'].PropTypes.func,

/**
     * Delay in ms, from the start of the touch, before onPressIn is called.
     */
delayPressIn:_react2['default'].PropTypes.number,
/**
     * Delay in ms, from the release of the touch, before onPressOut is called.
     */
delayPressOut:_react2['default'].PropTypes.number,
/**
     * Delay in ms, from onPressIn, before onLongPress is called.
     */
delayLongPress:_react2['default'].PropTypes.number,
/**
     * When the scroll view is disabled, this defines how far your touch may
     * move off of the button, before deactivating the button. Once deactivated,
     * try moving it back and you'll see that the button is once again
     * reactivated! Move it back and forth several times while the scroll view
     * is disabled. Ensure you pass in a constant to reduce memory allocations.
     */
pressRetentionOffset:_EdgeInsetsPropType2['default'],
/**
     * This defines how far your touch can start away from the button. This is
     * added to `pressRetentionOffset` when moving off of the button.
     * ** NOTE **
     * The touch area never extends past the parent view bounds and the Z-index
     * of sibling views always takes precedence if a touch hits two overlapping
     * views.
     */
hitSlop:_EdgeInsetsPropType2['default']},

render:function(){function render(){
return null;}return render;}()}); /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/Touchable/TouchableWithoutFeedback.js
 */

module.exports=TouchableWithoutFeedback;