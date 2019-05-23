import { StatusBar, Platform, Dimensions } from 'react-native';

const StatusBarDefaultBarStyle = StatusBar._defaultProps ? StatusBar._defaultProps.barStyle.value : 'default';
const StatusBarDefaultBackgroundColor = StatusBar._defaultProps ? StatusBar._defaultProps.backgroundColor.value : 'black';
const DEFAULT_IMAGE_DIMENSIONS = 36;
const DEFAULT_ICON_COLOR = "white";
const DEFAULT_ICON_SIZE = 30;
const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height;
const WIDTH = WINDOW.width;
const IS_IOS = Platform.OS == 'ios';
const IS_ANDROID = Platform.OS == 'android';
const IS_IOS_BELOW_11 = IS_IOS && parseInt(Platform.Version, 10) < 11;

module.exports = {
  StatusBarDefaultBarStyle,
  StatusBarDefaultBackgroundColor,
  DEFAULT_IMAGE_DIMENSIONS,
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  WINDOW,
  HEIGHT,
  WIDTH,
  IS_IOS,
  IS_ANDROID,
  IS_IOS_BELOW_11,
};
