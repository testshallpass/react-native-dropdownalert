import React from 'react';

function createAnimatedComponent(Component) {
  const refName = 'node';

  class AnimatedComponent extends React.Component {
    render() {
      return (
        <Component
          {...this._propsAnimated.__getValue()}
          ref={refName}
        />
      );
    }
  }

  return AnimatedComponent;
}

module.exports = createAnimatedComponent;
