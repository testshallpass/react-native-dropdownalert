import React, {useState, useRef, useMemo, ReactNode} from 'react';
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
  ViewProps,
  TouchableOpacityProps,
  ImageProps,
  useWindowDimensions,
} from 'react-native';
import Queue from './Queue';

export enum DropdownAlertType {
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Success = 'success',
}

export enum DropdownAlertDismissAction {
  Automatic = 'automatic',
  Cancel = 'cancel',
  Pan = 'pan',
  Programmatic = 'programmatic',
  Press = 'press',
}

export enum DropdownAlertColor {
  Info = '#2b73b6',
  Warn = '#cd853f',
  Error = '#cc3232',
  Success = '#32a54a',
  Default = '#000000',
}

export type DropdownAlertData = {
  type?: string | DropdownAlertType;
  title?: string;
  message?: string;
  source?: ImageSourcePropType;
  interval?: number;
  resolve?: (_value: DropdownAlertData) => void;
};

export enum DropdownAlertToValue {
  Alert = 1,
  Dismiss = 0,
}

export enum DropDownAlertImage {
  Info = require('./assets/info.png'),
  Warn = require('./assets/warn.png'),
  Error = require('./assets/error.png'),
  Success = require('./assets/success.png'),
  Cancel = require('./assets/cancel.png'),
}

export const DropDownAlertTestID = {
  AnimatedView: 'animatedView',
  SafeView: 'safeView',
  TextView: 'textView',
  Alert: 'alert',
  Image: 'image',
  Title: 'title',
  Message: 'message',
  Cancel: 'cancel',
  CancelImage: 'cancelImage',
};

export enum DropdownAlertPosition {
  Top = 'top',
  Bottom = 'bottom',
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
  imageSrc?: ImageSourcePropType;
  infoImageSrc?: ImageSourcePropType;
  warnImageSrc?: ImageSourcePropType;
  errorImageSrc?: ImageSourcePropType;
  successImageSrc?: ImageSourcePropType;
  cancelImageSrc?: ImageSourcePropType;
  infoColor?: ColorValue;
  warnColor?: ColorValue;
  errorColor?: ColorValue;
  successColor?: ColorValue;
  // Android: StatusBar background color when alert is visible and updateStatusBar is true
  activeStatusBarBackgroundColor?: ColorValue;
  // Android: StatusBar background color when alert is dismissed and updateStatusBar is true
  inactiveStatusBarBackgroundColor?: ColorValue;
  dismissInterval?: number;
  titleNumberOfLines?: number;
  messageNumberOfLines?: number;
  // Android: it is used in the Animated.View style so alert is above other UI components
  elevation?: number;
  // It is used in the Animated.View style so alert is above other UI components
  zIndex?: number;
  // Distance on the Y-axis for the alert to be dismissed by pan gesture
  // panResponderEnabled must be true as well
  panResponderDismissDistance?: number;
  animatedViewStyle?: ViewStyle;
  alertViewStyle?: ViewStyle;
  safeViewStyle?: ViewStyle;
  textViewStyle?: ViewStyle;
  cancelViewStyle?: ViewStyle;
  titleTextStyle?: TextStyle;
  messageTextStyle?: TextStyle;
  imageStyle?: ImageStyle;
  cancelImageStyle?: ImageStyle;
  onDismissAutomatic?: (data: DropdownAlertData) => void;
  onDismissCancel?: (data: DropdownAlertData) => void;
  onDismissPress?: (data: DropdownAlertData) => void;
  onDismissPanResponder?: (data: DropdownAlertData) => void;
  onDismissProgrammatic?: (data: DropdownAlertData) => void;
  showCancel?: boolean;
  onDismissPressDisabled?: boolean;
  panResponderEnabled?: boolean;
  // Android: used to set status bar translucent property when update status bar function is called
  //  if it is true it also sets the marginTop on TouchableOpacity component
  translucent?: boolean;
  // Whether or not to update status bar style, translucent or backgroundColor
  updateStatusBar?: boolean;
  // StatusBarStyle when alert is open and updateStatusBar must be true
  activeStatusBarStyle?: StatusBarStyle;
  // StatusBarStyle when alert is dismissed and updateStatusBar must be true
  inactiveStatusBarStyle?: StatusBarStyle;
  renderImage?: (data: DropdownAlertData) => JSX.Element;
  renderCancel?: (data: DropdownAlertData, onCancel: () => void) => JSX.Element;
  renderTitle?: (data: DropdownAlertData) => JSX.Element;
  renderMessage?: (data: DropdownAlertData) => JSX.Element;
  titleTextProps?: TextProps;
  messageTextProps?: TextProps;
  animatedViewProps?: ViewProps;
  alertTouchableOpacityProps?: TouchableOpacityProps;
  safeViewProps?: ViewProps;
  textViewProps?: ViewProps;
  imageProps?: ImageProps;
  cancelTouchableOpacityProps?: TouchableOpacityProps;
  cancelImageProps?: ImageProps;
  alert?: (
    func: (data?: DropdownAlertData) => Promise<DropdownAlertData>,
  ) => void;
  dismiss?: (func: () => void) => void;
  springAnimationConfig?: Animated.SpringAnimationConfig;
  children?: ReactNode;
  alertPosition?: 'top' | 'bottom';
};

const DropdownAlert: React.FunctionComponent<DropdownAlertProps> = ({
  onDismissAutomatic = () => {},
  onDismissPress = () => {},
  onDismissPanResponder = () => {},
  onDismissProgrammatic = () => {},
  onDismissCancel = () => {},
  dismissInterval = 4000,
  titleNumberOfLines = 1,
  messageNumberOfLines = 3,
  imageSrc = undefined,
  infoImageSrc = DropDownAlertImage.Info,
  warnImageSrc = DropDownAlertImage.Warn,
  errorImageSrc = DropDownAlertImage.Error,
  successImageSrc = DropDownAlertImage.Success,
  cancelImageSrc = DropDownAlertImage.Cancel,
  infoColor = DropdownAlertColor.Info,
  warnColor = DropdownAlertColor.Warn,
  errorColor = DropdownAlertColor.Error,
  successColor = DropdownAlertColor.Success,
  showCancel = false,
  onDismissPressDisabled = false,
  panResponderEnabled = true,
  animatedViewStyle = undefined,
  alertViewStyle = {
    padding: 8,
    backgroundColor: DropdownAlertColor.Default,
  },
  safeViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextStyle = {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  messageTextStyle = {
    fontSize: 16,
    color: 'white',
  },
  imageStyle = {
    height: 36,
    width: 36,
  },
  cancelImageStyle = {
    height: 36,
    width: 36,
  },
  cancelViewStyle = undefined,
  textViewStyle = {
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
  renderImage = undefined,
  renderCancel = undefined,
  renderTitle = undefined,
  renderMessage = undefined,
  titleTextProps = undefined,
  messageTextProps = undefined,
  animatedViewProps = undefined,
  alertTouchableOpacityProps = undefined,
  safeViewProps = undefined,
  textViewProps = undefined,
  imageProps = undefined,
  cancelTouchableOpacityProps = undefined,
  cancelImageProps = undefined,
  alert = () => {},
  dismiss = () => {},
  springAnimationConfig = {
    toValue: 0,
    friction: 9,
    useNativeDriver: false,
    isInteraction: false,
  },
  panResponderDismissDistance = -10,
  children = undefined,
  alertPosition = DropdownAlertPosition.Top,
}) => {
  const windowDimensions = useWindowDimensions();
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const isBelowIOS11 = isIOS && Number(Platform.Version) < 11;
  const [dimValue, setDimValue] = useState(0);
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
  const activeOpacity = onDismissPressDisabled || showCancel ? 1 : 0.95;
  const onPress = onDismissPressDisabled
    ? () => {}
    : () => _dismiss(DropdownAlertDismissAction.Press);

  function _getPanResponder() {
    function _onDonePan(
      _event: GestureResponderEvent,
      gestureState: PanResponderGestureState,
    ) {
      if (panResponderEnabled) {
        switch (alertPosition) {
          case DropdownAlertPosition.Bottom:
            if (gestureState.dy >= Math.abs(panResponderDismissDistance)) {
              _dismiss(DropdownAlertDismissAction.Pan);
            }
            break;

          default:
            if (gestureState.dy <= panResponderDismissDistance) {
              _dismiss(DropdownAlertDismissAction.Pan);
            }
            break;
        }
      }
    }
    return PanResponder.create({
      onStartShouldSetPanResponder: () => panResponderEnabled,
      onMoveShouldSetPanResponder: () => panResponderEnabled,
      onPanResponderMove: (_event, gestureState) => {
        if (panResponderEnabled) {
          switch (alertPosition) {
            case DropdownAlertPosition.Bottom:
              if (gestureState.dy > 0) {
                setDimValue(0 - gestureState.dy);
              }
              break;

            default:
              if (gestureState.dy < 0) {
                setDimValue(gestureState.dy);
              }
              break;
          }
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
    alertPosition,
  ]);

  function _alertWithData(data?: DropdownAlertData) {
    const dropdownAlertData: DropdownAlertData = {
      source: data?.source ? data.source : _getSourceForType(data?.type),
      interval: data?.interval ? data.interval : dismissInterval,
      ...data,
    };
    const promise = new Promise<DropdownAlertData>(
      resolve => (dropdownAlertData.resolve = resolve),
    );
    queue.current.enqueue(dropdownAlertData);
    if (queue.current.size === 1) {
      _alert(queue.current.first);
    }
    return promise;
  }
  alert(_alertWithData);

  async function _alert(data: DropdownAlertData) {
    setAlertData(data);
    alertDataRef.current = data;
    _updateStatusBar(true, data.type);
    await _animate(DropdownAlertToValue.Alert);
    if (data.interval && data.interval > 0) {
      _clearDismissTimeoutID();
      const timeout = setTimeout(() => {
        _dismiss(DropdownAlertDismissAction.Automatic);
      }, data.interval);
      dismissTimeoutID.current = Number(timeout);
    }
  }

  async function _dismiss(action = DropdownAlertDismissAction.Programmatic) {
    if (!queue.current.isEmpty && !isLockRef.current) {
      _clearDismissTimeoutID();
      _updateStatusBar(false);
      isLockRef.current = true;
      await _animate(DropdownAlertToValue.Dismiss);
      if (alertDataRef.current.resolve) {
        alertDataRef.current.resolve(alertDataRef.current);
      }
      switch (action) {
        case DropdownAlertDismissAction.Automatic:
          onDismissAutomatic(alertDataRef.current);
          break;
        case DropdownAlertDismissAction.Programmatic:
          onDismissProgrammatic(alertDataRef.current);
          break;
        case DropdownAlertDismissAction.Cancel:
          onDismissCancel(alertDataRef.current);
          break;
        case DropdownAlertDismissAction.Pan:
          onDismissPanResponder(alertDataRef.current);
          break;
        case DropdownAlertDismissAction.Press:
          onDismissPress(alertDataRef.current);
          break;
      }
      setDimValue(0);
      queue.current.dequeue();
      if (!queue.current.isEmpty) {
        _alert(queue.current.first);
      }
      isLockRef.current = false;
    }
  }
  dismiss(_dismiss);

  function _updateStatusBar(active = false, type = '') {
    if (updateStatusBar && alertPosition === DropdownAlertPosition.Top) {
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
      dismissTimeoutID.current = 0;
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
        return alertViewStyle.backgroundColor;
    }
  }

  function _onLayout(event: LayoutChangeEvent) {
    const eventHeight = event.nativeEvent.layout.height;
    if (eventHeight > height) {
      setHeight(eventHeight);
    }
  }

  function _renderImage(source: ImageSourcePropType | undefined) {
    if (renderImage) {
      return renderImage(alertData);
    }
    if (!source) {
      return null;
    }
    return (
      <Image
        testID={DropDownAlertTestID.Image}
        style={imageStyle}
        source={source}
        {...imageProps}
      />
    );
  }

  function _renderTitle(title?: string) {
    if (renderTitle) {
      return renderTitle(alertData);
    }
    if (!title || title.length === 0) {
      return null;
    }
    return (
      <Text
        style={titleTextStyle}
        numberOfLines={titleNumberOfLines}
        testID={DropDownAlertTestID.Title}
        {...titleTextProps}>
        {title}
      </Text>
    );
  }

  function _renderMessage(message?: string) {
    if (renderMessage) {
      return renderMessage(alertData);
    }
    if (!message || message.length === 0) {
      return null;
    }
    return (
      <Text
        style={messageTextStyle}
        numberOfLines={messageNumberOfLines}
        testID={DropDownAlertTestID.Title}
        {...messageTextProps}>
        {message}
      </Text>
    );
  }

  function _renderCancel() {
    const _onCancel = () => _dismiss(DropdownAlertDismissAction.Cancel);
    if (renderCancel) {
      return renderCancel(alertData, _onCancel);
    }
    return (
      <TouchableOpacity
        testID={DropDownAlertTestID.Cancel}
        style={cancelViewStyle}
        onPress={_onCancel}
        {...cancelTouchableOpacityProps}>
        {cancelImageSrc && (
          <Image
            testID={DropDownAlertTestID.CancelImage}
            style={cancelImageStyle}
            source={cancelImageSrc}
            {...cancelImageProps}
          />
        )}
      </TouchableOpacity>
    );
  }

  function _getViewAnimatedStyle() {
    let viewStyle: ViewStyle = {
      // https://github.com/microsoft/TypeScript/issues/11465
      position: 'absolute' as 'absolute',
      top: dimValue,
      left: 0,
      right: 0,
      elevation,
      zIndex,
    };
    let animatedInterpolateConfig = {
      inputRange: [0, 1],
      outputRange: [0 - height, 0],
    };
    if (alertPosition === DropdownAlertPosition.Bottom) {
      viewStyle.top = undefined;
      viewStyle.bottom = dimValue;
      animatedInterpolateConfig.outputRange[0] =
        windowDimensions.height - height;
    }
    return [
      viewStyle,
      {
        transform: [
          {
            translateY: animatedValue.current.interpolate(
              animatedInterpolateConfig,
            ),
          },
        ],
      },
      animatedViewStyle,
    ];
  }

  function _renderAlert() {
    if (children) {
      return children;
    }
    let additionalAlertViewStyle: ViewStyle = {
      backgroundColor: _getBackgroundColorForType(alertData.type),
    };
    if (isAndroid && translucent) {
      additionalAlertViewStyle.marginTop = StatusBar.currentHeight;
    }
    let SafeView = SafeAreaView;
    if (isBelowIOS11 || isAndroid) {
      SafeView = View;
    }
    return (
      <TouchableOpacity
        testID={DropDownAlertTestID.Alert}
        style={[alertViewStyle, additionalAlertViewStyle]}
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={onDismissPressDisabled}
        {...alertTouchableOpacityProps}>
        <SafeView
          testID={DropDownAlertTestID.SafeView}
          style={safeViewStyle}
          {...safeViewProps}>
          {_renderImage(alertData.source)}
          <View
            testID={DropDownAlertTestID.TextView}
            style={textViewStyle}
            {...textViewProps}>
            {_renderTitle(alertData.title)}
            {_renderMessage(alertData.message)}
          </View>
          {showCancel && _renderCancel()}
        </SafeView>
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={_getViewAnimatedStyle()}
      onLayout={event => _onLayout(event)}
      testID={DropDownAlertTestID.AnimatedView}
      {...animatedViewProps}>
      {_renderAlert()}
    </Animated.View>
  );
};

export default DropdownAlert;
