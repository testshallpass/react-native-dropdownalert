/**
 * https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/TransformPropTypes.js
 */
import React from 'react';

const { PropTypes } = React;

const arrayOfNumberPropType = PropTypes.arrayOf(PropTypes.number);

const transformMatrixPropType = function (props, propName, componentName) {
  if (props.transform && props.transformMatrix) {
    return new Error(
      'transformMatrix and transform styles cannot be used on the same ' +
      'component'
    );
  }
  return arrayOfNumberPropType(props, propName, componentName);
};

const transformPropTypes = {
  transform: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ perspective: PropTypes.number }),
      PropTypes.shape({ rotate: PropTypes.string }),
      PropTypes.shape({ rotateX: PropTypes.string }),
      PropTypes.shape({ rotateY: PropTypes.string }),
      PropTypes.shape({ rotateZ: PropTypes.string }),
      PropTypes.shape({ scale: PropTypes.number }),
      PropTypes.shape({ scaleX: PropTypes.number }),
      PropTypes.shape({ scaleY: PropTypes.number }),
      PropTypes.shape({ translateX: PropTypes.number }),
      PropTypes.shape({ translateY: PropTypes.number }),
      PropTypes.shape({ skewX: PropTypes.string }),
      PropTypes.shape({ skewY: PropTypes.string }),
    ])
  ),
  transformMatrix: transformMatrixPropType,
};

module.exports = transformPropTypes;
