/**
 * https://github.com/facebook/react-native/blob/master/Libraries/react-native/react-native.js
 */
import React from 'react';

import createMockComponent from './components/createMockComponent';

// Export React, plus some native additions.
const ReactNative = {
  // Components
  ActivityIndicator: require('./components/ActivityIndicator'),
  ActivityIndicatorIOS: require('./components/ActivityIndicatorIOS'),
  ART: require('./components/ART'),
  DatePickerIOS: createMockComponent('DatePickerIOS'),
  DrawerLayoutAndroid: createMockComponent('DrawerLayoutAndroid'),
  Image: require('./components/Image'),
  ImageEditor: createMockComponent('ImageEditor'),
  ImageStore: createMockComponent('ImageStore'),
  ListView: require('./components/ListView'),
  MapView: createMockComponent('MapView'),
  Modal: createMockComponent('Modal'),
  Navigator: require('./components/Navigator'),
  NavigatorIOS: createMockComponent('NavigatorIOS'),
  Picker: createMockComponent('Picker'),
  PickerIOS: createMockComponent('PickerIOS'),
  ProgressBarAndroid: createMockComponent('ProgressBarAndroid'),
  ProgressViewIOS: createMockComponent('ProgressViewIOS'),
  ScrollView: require('./components/ScrollView'),
  SegmentedControlIOS: createMockComponent('SegmentedControlIOS'),
  SliderIOS: createMockComponent('SliderIOS'),
  SnapshotViewIOS: createMockComponent('SnapshotViewIOS'),
  Switch: createMockComponent('Switch'),
  PullToRefreshViewAndroid: createMockComponent('PullToRefreshViewAndroid'),
  RecyclerViewBackedScrollView: createMockComponent('RecyclerViewBackedScrollView'),
  RefreshControl: createMockComponent('RefreshControl'),
  StatusBar: require('./components/StatusBar'),
  SwitchAndroid: createMockComponent('SwitchAndroid'),
  SwitchIOS: createMockComponent('SwitchIOS'),
  TabBarIOS: {
    ...createMockComponent('TabBarIOS'),
    Item: createMockComponent('TabBarIOS.Item')
  },
  Text: require('./components/Text'),
  TextInput: require('./components/TextInput'),
  ToastAndroid: createMockComponent('ToastAndroid'),
  ToolbarAndroid: createMockComponent('ToolbarAndroid'),
  Touchable: createMockComponent('Touchable'),
  TouchableHighlight: createMockComponent('TouchableHighlight'),
  TouchableNativeFeedback: createMockComponent('TouchableNativeFeedback'),
  TouchableOpacity: require('./components/TouchableOpacity'),
  TouchableWithoutFeedback: require('./components/TouchableWithoutFeedback'),
  View: require('./components/View'),
  ViewPagerAndroid: createMockComponent('ViewPagerAndroid'),
  WebView: require('./components/WebView'),

  // APIs
  ActionSheetIOS: require('./api/ActionSheetIOS'),
  Alert: require('./api/Alert'),
  AlertIOS: require('./api/AlertIOS'),
  Animated: require('./api/Animated'),
  AppRegistry: require('./api/AppRegistry'),
  AppState: require('./api/AppState'),
  AppStateIOS: require('./api/AppStateIOS'),
  AsyncStorage: require('./api/AsyncStorage'),
  BackAndroid: require('./api/BackAndroid'),
  CameraRoll: require('./api/CameraRoll'),
  Clipboard: require('./NativeModules/Clipboard'),
  DatePickerAndroid: require('./api/DatePickerAndroid'),
  Dimensions: require('./api/Dimensions'),
  Easing: require('./api/Animated/Easing'),
  ImagePickerIOS: require('./api/ImagePickerIOS'),
  IntentAndroid: require('./api/IntentAndroid'),
  InteractionManager: require('./api/InteractionManager'),
  LayoutAnimation: require('./api/LayoutAnimation'),
  Linking: require('./api/Linking'),
  LinkingIOS: require('./api/LinkingIOS'),
  NetInfo: require('./api/NetInfo'),
  PanResponder: require('./api/PanResponder'),
  PixelRatio: require('./api/PixelRatio'),
  PushNotificationIOS: require('./api/PushNotificationIOS'),
  Settings: require('./api/Settings'),
  StatusBarIOS: require('./api/StatusBarIOS'),
  StyleSheet: require('./api/StyleSheet'),
  TimePickerAndroid: require('./api/TimePickerAndroid'),
  UIManager: require('./NativeModules/UIManager'),
  VibrationIOS: require('./api/VibrationIOS'),

  // Plugins
  DeviceEventEmitter: require('./plugins/DeviceEventEmitter'),
  NativeAppEventEmitter: require('./plugins/NativeAppEventEmitter'),
  NativeModules: require('./NativeModules'),
  Platform: require('./plugins/Platform'),
  processColor: require('./plugins/processColor'),
  requireNativeComponent: require('./plugins/requireNativeComponent'),

  // Prop Types
  ColorPropType: require('./propTypes/ColorPropType'),
  EdgeInsetsPropType: require('./propTypes/EdgeInsetsPropType'),
  PointPropType: require('./propTypes/PointPropType'),
};

// See http://facebook.github.io/react/docs/addons.html
const ReactNativeAddons = {
  LinkedStateMixin: require('react-addons-linked-state-mixin'),
  Perf: require('react-addons-perf'),
  PureRenderMixin: require('react-addons-pure-render-mixin'),
  TestModule: require('./NativeModules/TestModule'),
  TestUtils: require('react-addons-test-utils'),
  // TODO(lmr): not sure where to find this
  // batchedUpdates: require('ReactUpdates').batchedUpdates, deprecated
  // cloneWithProps: require('react-addons-clone-with-props'), deprecated
  createFragment: require('react-addons-create-fragment'),
  update: require('react-addons-update'),
};

Object.assign(ReactNative, React, { addons: ReactNativeAddons });

module.exports = ReactNative;
