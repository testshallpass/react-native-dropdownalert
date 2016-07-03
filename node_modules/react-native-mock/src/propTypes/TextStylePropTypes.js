/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Text/TextStylePropTypes.js
 */
import React from 'react';
import ColorPropType from './ColorPropType';
import ViewStylePropTypes from './ViewStylePropTypes';

const { PropTypes } = React;

// TODO: use spread instead of Object.assign/create after #6560135 is fixed
const TextStylePropTypes = Object.assign(Object.create(ViewStylePropTypes), {
  color: ColorPropType,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fontStyle: PropTypes.oneOf(['normal', 'italic']),
  /**
   * Specifies font weight. The values 'normal' and 'bold' are supported for
   * most fonts. Not all fonts have a variant for each of the numeric values,
   * in that case the closest one is chosen.
   */
  fontWeight: PropTypes.oneOf(
    ['normal', 'bold',
     '100', '200', '300', '400', '500', '600', '700', '800', '900']
  ),
  textShadowOffset: PropTypes.shape(
    {
      width: PropTypes.number,
      height: PropTypes.number
    }
  ),
  textShadowRadius: PropTypes.number,
  textShadowColor: ColorPropType,
  /**
   * @platform ios
   */
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  /**
   * Specifies text alignment. The value 'justify' is only supported on iOS.
   */
  textAlign: PropTypes.oneOf(
    ['auto', 'left', 'right', 'center', 'justify']
  ),
  /**
   * @platform android
   */
  textAlignVertical: PropTypes.oneOf(
    ['auto', 'top', 'bottom', 'center']
  ),
  /**
   * @platform ios
   */
  textDecorationLine: PropTypes.oneOf(
    ['none', 'underline', 'line-through', 'underline line-through']
  ),
  /**
   * @platform ios
   */
  textDecorationStyle: PropTypes.oneOf(
    ['solid', 'double', 'dotted', 'dashed']
  ),
  /**
   * @platform ios
   */
  textDecorationColor: ColorPropType,
  /**
   * @platform ios
   */
  writingDirection: PropTypes.oneOf(
    ['auto', 'ltr', 'rtl']
  ),
});

module.exports = TextStylePropTypes;
