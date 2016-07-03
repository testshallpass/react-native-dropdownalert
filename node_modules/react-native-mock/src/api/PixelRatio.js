/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/PixelRatio.js
 */
const PixelRatio = {
  get() {
    return 2;
  },
  getFontScale() {
    return 2;
  },
  getPixelSizeForLayoutSize(layoutSize) {
    return Math.round(layoutSize * PixelRatio.get());
  },
  roundToNearestPixel(layoutSize) {
    const ratio = PixelRatio.get();
    return Math.round(layoutSize * ratio) / ratio;
  },
  startDetecting() {

  },
};

module.exports = PixelRatio;
