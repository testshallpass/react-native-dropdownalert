/**
 * https://github.com/facebook/react-native/blob/master/Libraries/ReactIOS/requireNativeComponent.js
 */
import React from 'react';

function requireNativeComponent(viewName, componentInterface, extraConfig) {
  return React.createClass({
    displayName: viewName,
    render() {
      return null;
    },
  });
}

module.exports = requireNativeComponent;
