/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/StatusBar/StatusBar.js
 */
import React from 'react';
import ColorPropType from '../propTypes/ColorPropType';


let _backgroundColor = '';
let _barStyle = {};
let _hidden = false;
let _networkActivityIndicatorVisible = false;
let _translucent = false;

const StatusBar = React.createClass({
  propTypes: {
    animated: React.PropTypes.bool,
    barStyle: React.PropTypes.oneOf(['default', 'light-content']),
    backgroundColor: ColorPropType,
    hidden: React.PropTypes.bool,
    networkActivityIndicatorVisible: React.PropTypes.bool,
    showHideTransition: React.PropTypes.oneOf(['fade', 'slide']),
    translucent: React.PropTypes.bool
  },

  statics: {
    setBackgroundColor(backgroundColor, animated) {
      _backgroundColor = backgroundColor;
    },

    setBarStyle(barStyle, animated) {
      _barStyle = barStyle;
    },

    setHidden(hidden, animated) {
      _hidden = hidden;
    },

    setNetworkActivityIndicatorVisible(visible) {
      _networkActivityIndicatorVisible = visible;
    },

    setTranslucent(translucent) {
      _translucent = translucent;
    },

    __getBackgroundColor() {
      return _backgroundColor;
    },

    __getBarStyle() {
      return _barStyle;
    },

    __getHidden() {
      return _hidden;
    },

    __getNetworkActivityIndicatorVisible() {
      return _networkActivityIndicatorVisible;
    },

    __getTranslucent() {
      return _translucent;
    }
  },

  render() {
    return null;
  }
});

module.exports = StatusBar;
