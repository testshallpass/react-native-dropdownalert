import { StatusBarDefaultBarStyle, StatusBarDefaultBackgroundColor } from '../constants';

test('StatusBarDefaultBarStyle to be default', () => {
  expect(StatusBarDefaultBarStyle).toBe('default');
});
test('StatusBarDefaultBackgroundColor to be black', () => {
  expect(StatusBarDefaultBackgroundColor).toBe('black');
});
test('StatusBarDefaultBarStyle to be StatusBar._defaultProps.barStyle.value', () => {
  const { StatusBar } = require('react-native');
  expect(StatusBarDefaultBarStyle).toBe(StatusBar._defaultProps.barStyle.value);
});
test('StatusBarDefaultBackgroundColor to be StatusBar._defaultProps.backgroundColor.value', () => {
  const { StatusBar } = require('react-native');
  expect(StatusBarDefaultBackgroundColor).toBe(StatusBar._defaultProps.backgroundColor.value);
});
