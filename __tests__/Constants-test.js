import { getDefaultStatusBarStyle, getDefaultStatusBarBackgroundColor } from '../constants';

test('StatusBarDefaultBarStyle to be default', () => {
  const barStyle = getDefaultStatusBarStyle();
  expect(barStyle).toBe('default');
});
test('StatusBarDefaultBackgroundColor to be black', () => {
  const backgroundColor = getDefaultStatusBarBackgroundColor();
  expect(backgroundColor).toBe('black');
});
test('StatusBarDefaultBarStyle to be StatusBar._defaultProps.barStyle.value', () => {
  const { StatusBar } = require('react-native');
  const barStyle = getDefaultStatusBarStyle();
  expect(barStyle).toBe(StatusBar._defaultProps.barStyle.value);
});
test('StatusBarDefaultBackgroundColor to be StatusBar._defaultProps.backgroundColor.value', () => {
  const { StatusBar } = require('react-native');
  const backgroundColor = getDefaultStatusBarBackgroundColor();
  expect(backgroundColor).toBe(StatusBar._defaultProps.backgroundColor.value);
});
