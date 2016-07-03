/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/View/ViewStylePropTypes.js
 */
import React from 'react';
import ColorPropType from './ColorPropType';
import LayoutPropTypes from './LayoutPropTypes';
import ShadowPropTypesIOS from './ShadowPropTypesIOS';
import TransformPropTypes from './TransformPropTypes';

const { PropTypes } = React;

/**
 * Warning: Some of these properties may not be supported in all releases.
 */
const ViewStylePropTypes = {
  ...LayoutPropTypes,
  ...ShadowPropTypesIOS,
  ...TransformPropTypes,
  backfaceVisibility: PropTypes.oneOf(['visible', 'hidden']),
  backgroundColor: ColorPropType,
  borderColor: ColorPropType,
  borderTopColor: ColorPropType,
  borderRightColor: ColorPropType,
  borderBottomColor: ColorPropType,
  borderLeftColor: ColorPropType,
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
  borderStyle: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
  borderWidth: PropTypes.number,
  borderTopWidth: PropTypes.number,
  borderRightWidth: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderLeftWidth: PropTypes.number,
  opacity: PropTypes.number,
  overflow: PropTypes.oneOf(['visible', 'hidden']),
  /**
   * (Android-only) Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   * @platform android
   */
  elevation: PropTypes.number,
};

module.exports = ViewStylePropTypes;
