import React from 'react';

function createMockComponent(displayName) {
  return React.createClass({
    displayName,
    render() {
      return null;
    },
  });
}

module.exports = createMockComponent;
