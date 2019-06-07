import { StatusBar, Platform, Dimensions } from 'react-native';

const DEFAULT_IMAGE_DIMENSIONS = 36;
const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height;
const WIDTH = WINDOW.width;
const IS_IOS = Platform.OS == 'ios';
const IS_ANDROID = Platform.OS == 'android';
const IS_IOS_BELOW_11 = IS_IOS && parseInt(Platform.Version, 10) < 11;
const TYPE = {
  info: 'info',
  warn: 'warn',
  error: 'error',
  success: 'success',
  custom: 'custom',
};
const ACTION = {
  automatic: 'automatic',
  cancel: 'cancel',
  pan: 'pan',
  programmatic: 'programmatic',
  tap: 'tap',
};
const getDefaultStatusBarStyle = () => {
  if (StatusBar._defaultProps) {
    return StatusBar._defaultProps.barStyle.value;
  }
  return 'default';
};
const getDefaultStatusBarBackgroundColor = () => {
  if (StatusBar._defaultProps) {
    return StatusBar._defaultProps.backgroundColor.value;
  }
  return 'black';
};

module.exports = {
  DEFAULT_IMAGE_DIMENSIONS,
  WINDOW,
  HEIGHT,
  WIDTH,
  IS_IOS,
  IS_ANDROID,
  IS_IOS_BELOW_11,
  TYPE,
  ACTION,
  getDefaultStatusBarStyle,
  getDefaultStatusBarBackgroundColor,
};
