import {
  getDefaultStatusBarStyle,
  getDefaultStatusBarBackgroundColor,
} from '../constants';
import {StatusBar} from 'react-native';

describe('Constants', () => {
  describe('Mock StatusBar with no _defaultProps property', () => {
    StatusBar._defaultProps = undefined;
    test('StatusBarDefaultBarStyle to be default', () => {
      const barStyle = getDefaultStatusBarStyle();
      expect(barStyle).toBe('default');
    });
    test('StatusBarDefaultBackgroundColor to be black', () => {
      const backgroundColor = getDefaultStatusBarBackgroundColor();
      expect(backgroundColor).toBe('black');
    });
  });
});
