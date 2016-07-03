/**
 * https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/StyleSheet.js
 */
const StyleSheet = {
  create(styles) {
    return styles;
  },
  flatten(styles) {
    if (Array.isArray(styles)) {
      return Object.assign({}, ...styles.map(StyleSheet.flatten));
    }

    return styles;
  }
};

module.exports = StyleSheet;
