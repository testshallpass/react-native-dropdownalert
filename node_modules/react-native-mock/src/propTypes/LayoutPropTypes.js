/**
 * https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/LayoutPropTypes.js
 */
import React from 'react';

const { PropTypes } = React;

/**
 * React Native's layout system is based on Flexbox and is powered both
 * on iOS and Android by an open source project called css-layout:
 * https://github.com/facebook/css-layout
 *
 * The implementation in css-layout is slightly different from what the
 * Flexbox spec defines - for example, we chose more sensible default
 * values. Please refer to the css-layout README for details.
 *
 * These properties are a subset of our styles that are consumed by the layout
 * algorithm and affect the positioning and sizing of views.
 */
const LayoutPropTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  margin: PropTypes.number,
  marginVertical: PropTypes.number,
  marginHorizontal: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  padding: PropTypes.number,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  borderWidth: PropTypes.number,
  borderTopWidth: PropTypes.number,
  borderRightWidth: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderLeftWidth: PropTypes.number,

  position: PropTypes.oneOf([
    'absolute',
    'relative'
  ]),

  // https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
  flexDirection: PropTypes.oneOf([
    'row',
    'column'
  ]),

  // https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
  flexWrap: PropTypes.oneOf([
    'wrap',
    'nowrap'
  ]),

  // How to align children in the main direction
  // https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around'
  ]),

  // How to align children in the cross direction
  // https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
  alignItems: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'stretch'
  ]),

  // How to align the element in the cross direction
  // https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
  alignSelf: PropTypes.oneOf([
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch'
  ]),

  // https://developer.mozilla.org/en-US/docs/Web/CSS/flex
  flex: PropTypes.number,
};

module.exports = LayoutPropTypes;
