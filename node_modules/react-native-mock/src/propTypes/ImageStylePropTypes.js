/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageStylePropTypes.js
 */
import React from 'react';
import ColorPropType from './ColorPropType';
import TransformPropTypes from './TransformPropTypes';
import ShadowPropTypesIOS from './ShadowPropTypesIOS';
import LayoutPropTypes from './LayoutPropTypes';
import ImageResizeMode from './ImageResizeMode';

const { PropTypes } = React;

const ImageStylePropTypes = {
  ...LayoutPropTypes,
  ...ShadowPropTypesIOS,
  ...TransformPropTypes,
  resizeMode: PropTypes.oneOf(ImageResizeMode),
  backfaceVisibility: PropTypes.oneOf(['visible', 'hidden']),
  backgroundColor: ColorPropType,
  borderColor: ColorPropType,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  overflow: PropTypes.oneOf(['visible', 'hidden']),

  /**
   * iOS-Specific style to "tint" an image.
   * Changes the color of all the non-transparent pixels to the tintColor.
   * @platform ios
   */
  tintColor: ColorPropType,
  opacity: PropTypes.number,
  /**
   * When the image has rounded corners, specifying an overlayColor will
   * cause the remaining space in the corners to be filled with a solid color.
   * This is useful in cases which are not supported by the Android
   * implementation of rounded corners:
   *   - Certain resize modes, such as 'contain'
   *   - Animated GIFs
   *
   * A typical way to use this prop is with images displayed on a solid
   * background and setting the `overlayColor` to the same color
   * as the background.
   *
   * For details of how this works under the hood, see
   * http://frescolib.org/docs/rounded-corners-and-circles.html
   *
   * @platform android
   */
  overlayColor: PropTypes.string,
};

module.exports = ImageStylePropTypes;
