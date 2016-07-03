/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/ActivityIndicator/ActivityIndicator.js
 */
import React from 'react';
import NativeMethodsMixin from '../mixins/NativeMethodsMixin';
import View from './View';
import ColorPropType from '../propTypes/ColorPropType';

const { PropTypes } = React;

const ActivityIndicator = React.createClass({
  propTypes: {
    ...View.propTypes,
    /**
     * Whether to show the indicator (true, the default) or hide it (false).
     */
    animating: PropTypes.bool,
    /**
     * The foreground color of the spinner (default is gray).
     */
    color: ColorPropType,
    /**
     * Whether the indicator should hide when not animating (true by default).
     */
    hidesWhenStopped: PropTypes.bool,
    /**
     * Size of the indicator. Small has a height of 20, large has a height of 36.
     */
    size: PropTypes.oneOf([
      'small',
      'large',
    ]),
    /**
     * Invoked on mount and layout changes with
     *
     *   {nativeEvent: { layout: {x, y, width, height}}}.
     */
    onLayout: PropTypes.func,
  },
  mixins: [NativeMethodsMixin],
  render() {
    return null;
  },
});

module.exports = ActivityIndicator;
