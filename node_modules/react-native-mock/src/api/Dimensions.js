/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/Dimensions.js
 */
const dimensions = {
  // TODO(lmr): find the other dimensions to put in here...
  window: {
    width: 320,
    height: 768,
    scale: 2,
    fontScale: 2,
  },
};

const Dimensions = {
  set(dims) {
    Object.assign(dimensions, dims);
    return true;
  },
  get(dim) {
    return dimensions[dim];
  },
};

module.exports = Dimensions;
