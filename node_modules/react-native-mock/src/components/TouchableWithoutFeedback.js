/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/Touchable/TouchableWithoutFeedback.js
 */
import React from 'react';
import EdgeInsetsPropType from '../propTypes/EdgeInsetsPropType';
import View from './View';

const TouchableWithoutFeedback = React.createClass({
  propTypes: {
    accessible: React.PropTypes.bool,
    accessibilityComponentType: React.PropTypes.oneOf(View.AccessibilityComponentType),
    accessibilityTraits: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(View.AccessibilityTraits),
      React.PropTypes.arrayOf(React.PropTypes.oneOf(View.AccessibilityTraits)),
    ]),
    /**
     * If true, disable all interactions for this component.
     */
    disabled: React.PropTypes.bool,
    /**
     * Called when the touch is released, but not if cancelled (e.g. by a scroll
     * that steals the responder lock).
     */
    onPress: React.PropTypes.func,
    onPressIn: React.PropTypes.func,
    onPressOut: React.PropTypes.func,
    /**
     * Invoked on mount and layout changes with
     *
     *   `{nativeEvent: {layout: {x, y, width, height}}}`
     */
    onLayout: React.PropTypes.func,

    onLongPress: React.PropTypes.func,

    /**
     * Delay in ms, from the start of the touch, before onPressIn is called.
     */
    delayPressIn: React.PropTypes.number,
    /**
     * Delay in ms, from the release of the touch, before onPressOut is called.
     */
    delayPressOut: React.PropTypes.number,
    /**
     * Delay in ms, from onPressIn, before onLongPress is called.
     */
    delayLongPress: React.PropTypes.number,
    /**
     * When the scroll view is disabled, this defines how far your touch may
     * move off of the button, before deactivating the button. Once deactivated,
     * try moving it back and you'll see that the button is once again
     * reactivated! Move it back and forth several times while the scroll view
     * is disabled. Ensure you pass in a constant to reduce memory allocations.
     */
    pressRetentionOffset: EdgeInsetsPropType,
    /**
     * This defines how far your touch can start away from the button. This is
     * added to `pressRetentionOffset` when moving off of the button.
     * ** NOTE **
     * The touch area never extends past the parent view bounds and the Z-index
     * of sibling views always takes precedence if a touch hits two overlapping
     * views.
     */
    hitSlop: EdgeInsetsPropType,
  },
  render() {
    return null;
  },
});

module.exports = TouchableWithoutFeedback;
