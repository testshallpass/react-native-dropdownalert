/**
 * https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/ColorPropType.js
 */
const ColorPropType = function (props, propName) {
  const color = props[propName];
  if (color === undefined || color === null) {
    // return;
  }

  if (typeof color === 'number') {
    // Developers should not use a number, but we are using the prop type
    // both for user provided colors and for transformed ones. This isn't ideal
    // and should be fixed but will do for now...
    // return;
  }

  // TODO(lmr): test color
};

module.exports = ColorPropType;
