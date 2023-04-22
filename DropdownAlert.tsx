import React, {useState, useRef, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
  PanResponder,
  Image,
  Text,
  ImageSourcePropType,
  ColorValue,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TextProps,
  StatusBarStyle,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import Queue from './Queue';

export enum DropdownAlertType {
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Success = 'success',
}

export enum DropdownAlertAction {
  Automatic = 'automatic',
  Cancel = 'cancel',
  Pan = 'pan',
  Programmatic = 'programmatic',
  Tap = 'tap',
}

export enum DropdownAlertColor {
  Info = '#2B73B6',
  Warn = '#cd853f',
  Error = '#cc3232',
  Success = '#32A54A',
  Default = 'black',
}

export type DropdownAlertData = {
  type?: string;
  title?: string;
  message?: string;
  source?: ImageSourcePropType;
  interval?: number;
  action?: string;
  resolve?: (_value: unknown) => void;
};

export enum DropdownAlertToValue {
  Alert = 1,
  Dismiss = 0,
}

// References
//  Image source: https://reactnative.dev/docs/image#source
//  Image style: https://reactnative.dev/docs/image#style
//  View style: https://reactnative.dev/docs/view#style
//  Text style: https://reactnative.dev/docs/text#style
//  Text props: https://reactnative.dev/docs/text#props
//  StatusBar https://reactnative.dev/docs/statusbar
//  StatusBar style: https://reactnative.dev/docs/statusbar#statusbarstyle
//  StatusBar setBarStyle: https://reactnative.dev/docs/statusbar#setbarstyle
//  StatusBar setTranslucent: https://reactnative.dev/docs/statusbar#settranslucent-android
//  StatusBar translucent: https://reactnative.dev/docs/statusbar#translucent-android
//  StatusBar backgroundColor: https://reactnative.dev/docs/statusbar#backgroundcolor-android
//  StatusBar setBackgroundColor: https://reactnative.dev/docs/statusbar#setbackgroundcolor-android
//  Colors https://reactnative.dev/docs/colors
//  Pan responder: https://reactnative.dev/docs/panresponder
//  Spring animation: https://reactnative.dev/docs/animated#spring
//  Elevation: https://reactnative.dev/docs/view-style-props#elevation-android
//  zIndex: https://reactnative.dev/docs/layout-props#zindex

export type DropdownAlertProps = {
  // image source when NOT info, warn, success or error types
  // can be overridden by alert function parameter source
  imageSrc?: ImageSourcePropType;
  // image source for info type
  // can be overridden by alert function parameter source
  infoImageSrc?: ImageSourcePropType;
  // image source for warn type
  // can be overridden by alert function parameter source
  warnImageSrc?: ImageSourcePropType;
  // image source for error type
  // can be overridden by alert function parameter source
  errorImageSrc?: ImageSourcePropType;
  // image source for success type
  // can be overridden by alert function parameter source
  successImageSrc?: ImageSourcePropType;
  // image source for cancel button
  cancelBtnImageSrc?: ImageSourcePropType;
  // TouchableOpacity background color for info type and
  // used as the Android status bar background color
  infoColor?: ColorValue;
  // TouchableOpacity background color for warn type and
  // used as the Android status bar background color
  warnColor?: ColorValue;
  // TouchableOpacity background color for error type and
  // used as the Android status bar background color
  errorColor?: ColorValue;
  // TouchableOpacity background color for success type and
  // used as the Android status bar background color
  successColor?: ColorValue;
  // interval to automatically dismiss alert and
  // is overridden if interval passed into alertWithType function
  dismissInterval?: number;
  // Animated.View style and can override pre-defined styles
  wrapperStyle?: ViewStyle;
  // TouchableOpacity style override when NOT info, warn, success or error types
  // also the background color is used when NOT info, warn, success or error types
  containerStyle?: ViewStyle;
  // ContentView style
  contentContainerStyle?: ViewStyle;
  // Text component for title style
  titleStyle?: TextStyle;
  // Text component for message style
  messageStyle?: TextStyle;
  // Image style
  imageStyle?: ImageStyle;
  // Cancel button's image style
  cancelBtnImageStyle?: ImageStyle;
  // Cancel button's TouchableOpacity style
  cancelBtnStyle?: ViewStyle;
  // Text component title number of lines
  titleNumOfLines?: number;
  // Text component message number of lines
  messageNumOfLines?: number;
  // Callback function when alert is dismissed
  onDismiss?: (data: DropdownAlertData) => void;
  // Callback function when alert is cancelled using cancel button
  onCancel?: (data: DropdownAlertData) => void;
  // Whether or not to show the cancel button
  showCancel?: boolean;
  // Whether or not to allow onPress on TouchableOpacity to dismiss alert
  tapToDismissEnabled?: boolean;
  // Whether or not to allow pan gestures
  panResponderEnabled?: boolean;
  // Android exclusive: used to set status bar translucent property when update status bar function is called
  //  if it is true it also sets the marginTop on TouchableOpacity component
  translucent?: boolean;
  // StatusBarStyle when alert is open and updateStatusBar must be true
  activeStatusBarStyle?: StatusBarStyle;
  // Android exclusive: StatusBar background color when alert is open and updateStatusBar must be true
  activeStatusBarBackgroundColor?: ColorValue;
  // StatusBarStyle when alert is dismissed and updateStatusBar must be true
  inactiveStatusBarStyle?: StatusBarStyle;
  // Android exclusive: StatusBar background color when alert is dismissed and updateStatusBar must be true
  inactiveStatusBarBackgroundColor?: ColorValue;
  // Whether or not to update status bar style, translucent or backgroundColor
  updateStatusBar?: boolean;
  // Android exclusive: it is used in the Animated.View style so alert is above other UI components
  elevation?: number;
  // It is used in the Animated.View style so alert is above other UI components
  zIndex?: number;
  // Distance on the Y-axis for alert to move by pan gesture
  // panResponderEnabled must be true as well
  panResponderMoveDistance?: number;
  // TouchableOpacity base style
  defaultContainer?: ViewStyle;
  // View style that holds the title and message components
  defaultTextContainer?: ViewStyle;
  // The following render functions shall override built-in UI components
  renderImage?: (data: DropdownAlertData) => JSX.Element;
  renderCancel?: (data: DropdownAlertData, onCancel: () => void) => JSX.Element;
  renderTitle?: (data: DropdownAlertData) => JSX.Element;
  renderMessage?: (data: DropdownAlertData) => JSX.Element;
  // Animated.View testID
  testID?: string;
  // Animated.View accessibilityLabel
  accessibilityLabel?: string;
  // Animated.View accessible
  accessible?: boolean;
  // Text component props for title
  titleTextProps?: TextProps;
  // Text component props for message
  messageTextProps?: TextProps;
  // Callback when TouchableOpacity's onPress is invoked | is controlled by tapToDismissEnabled
  onTap?: (data: DropdownAlertData) => void;
  // Function to invoke the alert to open
  alertWithType?: (
    func: (
      type?: string,
      title?: string,
      message?: string,
      source?: ImageSourcePropType,
      interval?: number,
    ) => Promise<unknown>,
  ) => void;
  // Function to dismiss alert programmatically
  dismiss?: (func: () => void) => void;
  // Used in the alert's open and dismiss animation sequence
  springAnimationConfig?: Animated.SpringAnimationConfig;
  // Distance on the Y-axis for the alert to be dismissed by pan gesture
  // panResponderEnabled must be true as well
  panResponderDismissDistance?: number;
};

const DropdownAlert: React.FunctionComponent<DropdownAlertProps> = ({
  onDismiss = () => {},
  onCancel = () => {},
  dismissInterval = 4000,
  titleNumOfLines = 1,
  messageNumOfLines = 3,
  imageSrc = undefined,
  infoImageSrc = require('./assets/info.png'),
  warnImageSrc = require('./assets/warn.png'),
  errorImageSrc = require('./assets/error.png'),
  successImageSrc = require('./assets/success.png'),
  cancelBtnImageSrc = require('./assets/cancel.png'),
  infoColor = DropdownAlertColor.Info,
  warnColor = DropdownAlertColor.Warn,
  errorColor = DropdownAlertColor.Error,
  successColor = DropdownAlertColor.Success,
  showCancel = false,
  tapToDismissEnabled = true,
  panResponderEnabled = true,
  wrapperStyle = undefined,
  containerStyle = {
    backgroundColor: DropdownAlertColor.Default,
  },
  contentContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle = {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  messageStyle = {
    fontSize: 16,
    color: 'white',
  },
  imageStyle = {
    height: 36,
    width: 36,
  },
  cancelBtnImageStyle = {
    height: 36,
    width: 36,
  },
  cancelBtnStyle = undefined,
  defaultContainer = {
    padding: 8,
  },
  defaultTextContainer = {
    flex: 1,
    marginHorizontal: 8,
  },
  translucent = false,
  activeStatusBarStyle = 'light-content',
  activeStatusBarBackgroundColor = undefined,
  inactiveStatusBarStyle = 'default',
  inactiveStatusBarBackgroundColor = 'black',
  updateStatusBar = true,
  elevation = 1,
  zIndex = 1,
  panResponderMoveDistance = 0,
  renderImage = undefined,
  renderCancel = undefined,
  renderTitle = undefined,
  renderMessage = undefined,
  testID = 'animatedView',
  accessibilityLabel = undefined,
  accessible = false,
  titleTextProps = undefined,
  messageTextProps = undefined,
  onTap = () => {},
  alertWithType = () => {},
  dismiss = () => {},
  springAnimationConfig = {
    toValue: 0,
    friction: 9,
    useNativeDriver: false,
    isInteraction: false,
  },
  panResponderDismissDistance = -10,
}) => {
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const isBelowIOS11 = isIOS && Number(Platform.Version) < 11;
  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(99);
  const defaultAlertData: DropdownAlertData = {
    type: '',
    title: '',
    message: '',
  };
  const [alertData, setAlertData] = useState(defaultAlertData);
  const alertDataRef = useRef(defaultAlertData);
  const isLockRef = useRef(false);
  const queue = useRef(new Queue());
  const animatedValue = useRef(new Animated.Value(0));
  const dismissTimeoutID = useRef(0);
  const activeOpacity = !tapToDismissEnabled || showCancel ? 1 : 0.95;
  const onPress = !tapToDismissEnabled
    ? () => {}
    : () => _dismiss(DropdownAlertAction.Tap);

  function _getPanResponder() {
    function _onDonePan(
      _event: GestureResponderEvent,
      gestureState: PanResponderGestureState,
    ) {
      if (
        panResponderEnabled &&
        gestureState.dy <= panResponderDismissDistance
      ) {
        _dismiss(DropdownAlertAction.Pan);
      }
    }
    return PanResponder.create({
      onStartShouldSetPanResponder: () => panResponderEnabled,
      onMoveShouldSetPanResponder: (_event, gestureState) => {
        if (panResponderEnabled) {
          return gestureState.dy <= panResponderMoveDistance;
        }
        return panResponderEnabled;
      },
      onPanResponderMove: (_event, gestureState) => {
        if (panResponderEnabled && gestureState.dy < 0) {
          setTop(gestureState.dy);
        }
      },
      onPanResponderRelease: (event, gestureState) =>
        _onDonePan(event, gestureState),
      onPanResponderTerminate: (event, gestureState) =>
        _onDonePan(event, gestureState),
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const panResponder = useMemo(_getPanResponder, [
    panResponderEnabled,
    panResponderDismissDistance,
    panResponderMoveDistance,
  ]);

  function _alertWithType(
    type?: string,
    title?: string,
    message?: string,
    source?: ImageSourcePropType,
    interval?: number,
  ) {
    const data: DropdownAlertData = {
      type,
      title,
      message,
      source: source ? source : _getSourceForType(type),
      interval: interval ? interval : dismissInterval,
    };
    queue.current.enqueue(data);
    if (queue.current.size === 1) {
      _alert(queue.current.first);
    }
    return new Promise(resolve => (data.resolve = resolve));
  }
  alertWithType(_alertWithType);

  async function _alert(data: DropdownAlertData) {
    setAlertData(data);
    alertDataRef.current = data;
    _updateStatusBar(true, data.type);
    await _animate(DropdownAlertToValue.Alert);
    if (data.interval && data.interval > 0) {
      _clearDismissTimeoutID();
      dismissTimeoutID.current = setTimeout(() => {
        _dismiss(DropdownAlertAction.Automatic);
      }, data.interval);
    }
  }

  async function _dismiss(action = DropdownAlertAction.Programmatic) {
    if (!queue.current.isEmpty && !isLockRef.current) {
      _clearDismissTimeoutID();
      _updateStatusBar(false);
      isLockRef.current = true;
      await _animate(DropdownAlertToValue.Dismiss);
      alertDataRef.current.action = action;
      if (action === DropdownAlertAction.Cancel) {
        onCancel(alertDataRef.current);
      } else if (action === DropdownAlertAction.Tap) {
        onTap(alertDataRef.current);
      }
      onDismiss(alertDataRef.current);
      if (alertDataRef.current.resolve) {
        alertDataRef.current.resolve(alertDataRef.current);
      }
      setTop(0);
      queue.current.dequeue();
      if (!queue.current.isEmpty) {
        _alert(queue.current.first);
      }
      isLockRef.current = false;
    }
  }
  dismiss(_dismiss);

  function _updateStatusBar(active = false, type = '') {
    if (updateStatusBar) {
      if (isAndroid) {
        if (active) {
          let backgroundColor = activeStatusBarBackgroundColor;
          if (!backgroundColor) {
            const colorForType = _getBackgroundColorForType(type);
            if (colorForType) {
              backgroundColor = colorForType;
            } else {
              backgroundColor = DropdownAlertColor.Default;
            }
          }
          StatusBar.setBackgroundColor(backgroundColor, true);
          StatusBar.setTranslucent(translucent);
        } else {
          StatusBar.setBackgroundColor(inactiveStatusBarBackgroundColor, true);
        }
      }
      if (active) {
        StatusBar.setBarStyle(activeStatusBarStyle, true);
      } else {
        StatusBar.setBarStyle(inactiveStatusBarStyle, true);
      }
    }
  }

  function _clearDismissTimeoutID() {
    if (dismissTimeoutID.current) {
      clearTimeout(dismissTimeoutID.current);
    }
  }

  function _animate(toValue = 0) {
    springAnimationConfig.toValue = toValue;
    return new Promise(resolve => {
      Animated.spring(animatedValue.current, springAnimationConfig).start(
        resolve,
      );
    });
  }

  function _getStyleForType(type: string | undefined) {
    switch (type) {
      case DropdownAlertType.Info:
      case DropdownAlertType.Warn:
      case DropdownAlertType.Error:
      case DropdownAlertType.Success:
        return [
          defaultContainer,
          {backgroundColor: _getBackgroundColorForType(type)},
        ];
      default:
        return [defaultContainer, containerStyle];
    }
  }

  function _getSourceForType(type: string | undefined) {
    switch (type) {
      case DropdownAlertType.Info:
        return infoImageSrc;
      case DropdownAlertType.Warn:
        return warnImageSrc;
      case DropdownAlertType.Error:
        return errorImageSrc;
      case DropdownAlertType.Success:
        return successImageSrc;
      default:
        return imageSrc;
    }
  }

  function _getBackgroundColorForType(type: string | undefined) {
    switch (type) {
      case DropdownAlertType.Info:
        return infoColor;
      case DropdownAlertType.Warn:
        return warnColor;
      case DropdownAlertType.Error:
        return errorColor;
      case DropdownAlertType.Success:
        return successColor;
      default:
        return containerStyle.backgroundColor;
    }
  }

  function _onLayout(event: LayoutChangeEvent) {
    const eventHeight = event.nativeEvent.layout.height;
    if (eventHeight > height) {
      setHeight(eventHeight);
    }
  }

  function _renderImage(source: ImageSourcePropType) {
    if (renderImage) {
      if (!alertData.source) {
        alertData.source = source;
      }
      return renderImage(alertData);
    }
    return <Image testID={'image'} style={imageStyle} source={source} />;
  }

  function _renderTitle() {
    if (renderTitle) {
      return renderTitle(alertData);
    }
    if (!title || title.length === 0) {
      return null;
    }
    return (
      <Text
        style={titleStyle}
        numberOfLines={titleNumOfLines}
        testID={'title'}
        {...titleTextProps}>
        {title}
      </Text>
    );
  }

  function _renderMessage() {
    if (renderMessage) {
      return renderMessage(alertData);
    }
    if (!message || message.length === 0) {
      return null;
    }
    return (
      <Text
        style={messageStyle}
        numberOfLines={messageNumOfLines}
        testID={'message'}
        {...messageTextProps}>
        {message}
      </Text>
    );
  }

  function _renderCancel() {
    const _onCancel = () => _dismiss(DropdownAlertAction.Cancel);
    if (renderCancel) {
      return renderCancel(alertData, _onCancel);
    }
    return (
      <TouchableOpacity
        testID={'cancelButton'}
        style={cancelBtnStyle}
        onPress={_onCancel}>
        {cancelBtnImageSrc && (
          <Image
            testID={'cancelButtonImage'}
            style={cancelBtnImageStyle}
            source={cancelBtnImageSrc}
          />
        )}
      </TouchableOpacity>
    );
  }

  function _getViewAnimatedStyle() {
    return [
      {
        // https://github.com/microsoft/TypeScript/issues/11465
        position: 'absolute' as 'absolute',
        top,
        left: 0,
        right: 0,
        elevation,
        zIndex,
      },
      {
        transform: [
          {
            translateY: animatedValue.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0 - height, 0],
            }),
          },
        ],
      },
      wrapperStyle,
    ];
  }

  const {type, source, title, message} = alertData;

  let touchableOpacityStyle = _getStyleForType(type);
  if (isAndroid && translucent) {
    touchableOpacityStyle = [
      ...touchableOpacityStyle,
      {marginTop: StatusBar.currentHeight},
    ];
  }

  let ContentView = SafeAreaView;
  if (isBelowIOS11 || isAndroid) {
    ContentView = View;
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={_getViewAnimatedStyle()}
      onLayout={event => _onLayout(event)}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}>
      <TouchableOpacity
        testID={'button'}
        style={touchableOpacityStyle}
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={!tapToDismissEnabled}>
        <ContentView testID={'contentView'} style={contentContainerStyle}>
          {source && _renderImage(source)}
          <View style={defaultTextContainer}>
            {_renderTitle()}
            {_renderMessage()}
          </View>
          {showCancel && _renderCancel()}
        </ContentView>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DropdownAlert;
