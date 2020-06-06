import * as ReactNative from 'react-native';

export const Animated = {
  ...ReactNative.Animated,
};

export const Dimensions = {
  get: jest.fn().mockReturnValue({
    width: ReactNative.Dimensions.get('window').width,
    height: ReactNative.Dimensions.get('window').height,
  }),
};

export const Text = 'Text';
export const Image = 'Image';
export const SafeAreaView = 'SafeAreaView';
export const View = 'View';
export const TouchableOpacity = 'TouchableOpacity';

export const PanResponder = {
  ...ReactNative.PanResponder,
};

export const Platform = {
  ...ReactNative.Platform,
  OS: 'ios',
  Version: 123,
  isTesting: true,
  select: objs => objs['ios'],
};

export const StatusBar = {
  ...ReactNative.StatusBar,
  setBarStyle: () => {},
};

export const StyleSheet = {
  ...ReactNative.StyleSheet,
};

export default Object.setPrototypeOf(
  {
    Animated,
    Dimensions,
    Platform,
    StatusBar,
    Text,
    PanResponder,
    Image,
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
  },
  ReactNative,
);
