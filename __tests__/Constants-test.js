import { getDefaultStatusBarStyle, getDefaultStatusBarBackgroundColor } from '../constants';

describe('Constants', () => {
  describe('Mock StatusBar with no _defaultProps property', () => {
    beforeEach(() => {
      jest.mock('StatusBar', () => {
        return {};
      });
    });
    test('StatusBarDefaultBarStyle to be default', () => {
      const barStyle = getDefaultStatusBarStyle();
      expect(barStyle).toBe('default');
    });
    test('StatusBarDefaultBackgroundColor to be black', () => {
      const backgroundColor = getDefaultStatusBarBackgroundColor();
      expect(backgroundColor).toBe('black');
    });
  });
  describe('StatusBar with _defaultProps property', () => {
    const { StatusBar } = require('react-native');
    test('StatusBarDefaultBarStyle to be StatusBar._defaultProps.barStyle.value', () => {
      const barStyle = getDefaultStatusBarStyle();
      expect(barStyle).toBe(StatusBar._defaultProps.barStyle.value);
    });
    test('StatusBarDefaultBackgroundColor to be StatusBar._defaultProps.backgroundColor.value', () => {
      const backgroundColor = getDefaultStatusBarBackgroundColor();
      expect(backgroundColor).toBe(StatusBar._defaultProps.backgroundColor.value);
    });
  });
});
