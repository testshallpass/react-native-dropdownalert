import { StatusBar, Platform, Dimensions } from 'react-native';

export const DEFAULT_IMAGE_DIMENSIONS = 36;
export const WINDOW = Dimensions.get('window');
export const HEIGHT = WINDOW.height;
export const WIDTH = WINDOW.width;
export const IS_ANDROID = Platform.OS == 'android';
const IS_IOS = Platform.OS == 'ios';
const PLATFORM_VERSION = parseInt(Platform.Version, 10);
export const IS_IOS_BELOW_11 = IS_IOS && PLATFORM_VERSION < 11;
export const TYPE = {
  info: 'info',
  warn: 'warn',
  error: 'error',
  success: 'success',
  custom: 'custom',
};
export const ACTION = {
  automatic: 'automatic',
  cancel: 'cancel',
  pan: 'pan',
  programmatic: 'programmatic',
  tap: 'tap',
};
export function getDefaultStatusBarStyle() {
  if (StatusBar._defaultProps) {
    return StatusBar._defaultProps.barStyle.value;
  }
  return 'default';
};
export function getDefaultStatusBarBackgroundColor() {
  if (StatusBar._defaultProps) {
    return StatusBar._defaultProps.backgroundColor.value;
  }
  return 'black';
};
