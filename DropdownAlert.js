import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Animated, StatusBar, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import {
  DEFAULT_IMAGE_DIMENSIONS,
  IS_ANDROID,
  IS_IOS_BELOW_11,
  TYPE,
  ACTION,
  HEIGHT,
  getDefaultStatusBarStyle,
  getDefaultStatusBarBackgroundColor,
} from './constants';
import TextView from './TextView';
import ImageView from './imageview';
import CancelButton from './CancelButton';

export default class DropdownAlert extends Component {
  static propTypes = {
    imageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    infoImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    warnImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    errorImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    successImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    cancelBtnImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    infoColor: PropTypes.string,
    warnColor: PropTypes.string,
    errorColor: PropTypes.string,
    successColor: PropTypes.string,
    closeInterval: PropTypes.number,
    startDelta: PropTypes.number,
    endDelta: PropTypes.number,
    wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    messageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    cancelBtnImageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    titleNumOfLines: PropTypes.number,
    messageNumOfLines: PropTypes.number,
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    showCancel: PropTypes.bool,
    tapToCloseEnabled: PropTypes.bool,
    panResponderEnabled: PropTypes.bool,
    replaceEnabled: PropTypes.bool,
    translucent: PropTypes.bool,
    useNativeDriver: PropTypes.bool,
    isInteraction: PropTypes.bool,
    activeStatusBarStyle: PropTypes.string,
    activeStatusBarBackgroundColor: PropTypes.string,
    inactiveStatusBarStyle: PropTypes.string,
    inactiveStatusBarBackgroundColor: PropTypes.string,
    updateStatusBar: PropTypes.bool,
    elevation: PropTypes.number,
    zIndex: PropTypes.number,
    sensitivity: PropTypes.number,
    defaultContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    defaultTextContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    renderImage: PropTypes.func,
    renderCancel: PropTypes.func,
    renderTitle: PropTypes.func,
    renderMessage: PropTypes.func,
    testID: PropTypes.string,
    accessibilityLabel: PropTypes.string,
    accessible: PropTypes.bool,
    titleTextProps: PropTypes.object,
    messageTextProps: PropTypes.object,
    useAnimationLock: PropTypes.bool,
    onTap: PropTypes.func,
  };
  static defaultProps = {
    onClose: () => {},
    onCancel: () => {},
    closeInterval: 4000,
    startDelta: -100,
    endDelta: 0,
    titleNumOfLines: 1,
    messageNumOfLines: 3,
    imageSrc: null,
    infoImageSrc: require('./assets/info.png'),
    warnImageSrc: require('./assets/warn.png'),
    errorImageSrc: require('./assets/error.png'),
    successImageSrc: require('./assets/success.png'),
    cancelBtnImageSrc: require('./assets/cancel.png'),
    infoColor: '#2B73B6',
    warnColor: '#cd853f',
    errorColor: '#cc3232',
    successColor: '#32A54A',
    showCancel: false,
    tapToCloseEnabled: true,
    panResponderEnabled: true,
    replaceEnabled: true,
    wrapperStyle: null,
    containerStyle: {
      padding: 16,
      flexDirection: 'row',
      backgroundColor: '#202020',
    },
    contentContainerStyle: {
      flex: 1,
      flexDirection: 'row',
    },
    titleStyle: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'transparent',
    },
    messageStyle: {
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: 'transparent',
    },
    imageStyle: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center',
    },
    cancelBtnImageStyle: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center',
    },
    defaultContainer: {
      padding: 8,
      flexDirection: 'row',
    },
    defaultTextContainer: {
      flex: 1,
      padding: 8,
    },
    translucent: false,
    activeStatusBarStyle: 'light-content',
    activeStatusBarBackgroundColor: getDefaultStatusBarBackgroundColor(),
    inactiveStatusBarStyle: getDefaultStatusBarStyle(),
    inactiveStatusBarBackgroundColor: getDefaultStatusBarBackgroundColor(),
    updateStatusBar: true,
    isInteraction: true,
    useNativeDriver: true,
    elevation: 1,
    zIndex: null,
    sensitivity: 20,
    renderImage: undefined,
    renderCancel: undefined,
    renderTitle: undefined,
    renderMessage: undefined,
    testID: undefined,
    accessibilityLabel: undefined,
    accessible: false,
    titleTextProps: undefined,
    messageTextProps: undefined,
    useAnimationLock: true,
    onTap: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
      isOpen: false,
      topValue: 0,
      height: 0,
    };
    this.alertData = {
      type: '',
      message: '',
      title: '',
      payload: {},
      interval: props.closeInterval,
      action: '',
    };
    this.animationLock = false;
    this.panResponder = this.getPanResponder();
  }
  componentWillUnmount() {
    if (this.state.isOpen) {
      this.closeAction(ACTION.programmatic);
    }
  }
  getPanResponder = () => {
    return PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => this._onShouldStartPan(event, gestureState),
      onMoveShouldSetPanResponder: (event, gestureState) => this._onShouldMovePan(event, gestureState),
      onPanResponderMove: (event, gestureState) => this._onMovePan(event, gestureState),
      onPanResponderRelease: (event, gestureState) => this._onDonePan(event, gestureState),
      onPanResponderTerminate: (event, gestureState) => this._onDonePan(event, gestureState),
    });
  };
  _onShouldStartPan = (event, gestureState) => {
    return this.props.panResponderEnabled;
  };
  _onShouldMovePan = (event, gestureState) => {
    const { sensitivity, panResponderEnabled } = this.props;
    const dx = Math.abs(gestureState.dx);
    const dy = Math.abs(gestureState.dy);
    const isDxSensitivity = dx < sensitivity;
    const isDySensitivity = dy >= sensitivity;
    return isDxSensitivity && isDySensitivity && panResponderEnabled;
  };
  _onMovePan = (event, gestureState) => {
    if (gestureState.dy < 0) {
      this.setState({ topValue: gestureState.dy });
    }
  };
  _onDonePan = (event, gestureState) => {
    const start = this.getStartDelta(this.state.height, this.props.startDelta);
    const delta = start / 5;
    if (gestureState.dy < delta) {
      this.closeAction(ACTION.pan);
    }
  };
  getStringValue(value) {
    try {
      if (typeof value !== 'string') {
        if (Array.isArray(value)) {
          return value.join(' ');
        }
        if (typeof value == 'object') {
          return `${JSON.stringify(value)}`;
        }
        return `${value}`;
      }
      return value;
    } catch (error) {
      return error.toString();
    }
  }
  alertWithType = (type = '', title = '', message = '', payload = {}, interval = 1) => {
    if (this.animationLock) {
      return;
    }
    // type is not validated so unexpected types will render alert with default styles.
    // these default styles can be overridden with style props. (like containerStyle)
    const { closeInterval, replaceEnabled } = this.props;
    let duration = closeInterval;
    // closeInterval prop is overridden if interval is provided
    if (typeof interval === 'number' && interval > 1) {
      duration = interval;
    }
    // title and message are converted to strings
    const data = {
      type,
      title: this.getStringValue(title),
      message: this.getStringValue(message),
      payload,
      interval: duration,
    };
    // replaceEnabled
    // True: alert is closed then replaced by another alert. (default)
    // False: alert state change is immediate if open.
    const { isOpen } = this.state;
    if (!replaceEnabled && isOpen) {
      this.alertData = data;
      this.setState({ isOpen: true });
      if (duration > 0) {
        this.closeAutomatic(duration);
      }
      return;
    }
    if (isOpen) {
      this.closeAction(ACTION.programmatic, () => {
        this.open(data, duration);
      });
      return;
    }
    this.open(data, duration);
  };
  open = (data = {}, duration) => {
    this.alertData = data;
    this.setState({ isOpen: true });
    this.animate(1, 450, () => {
      this.animationLock = false;
      if (duration > 0) {
        this.closeAutomatic(duration);
      }
    });
  };
  closeAction = (action = ACTION.programmatic, onDone = () => {}) => {
    // action is how the alert was closed.
    // alert currently closes itself by:
    // tap, pan, cancel, programmatic or automatic
    this.clearCloseTimeoutID();
    this.close(action, onDone);
  };
  closeAutomatic = duration => {
    this.clearCloseTimeoutID();
    this.closeTimeoutID = setTimeout(() => {
      this.close(ACTION.automatic);
    }, duration);
  };
  close = (action, onDone = () => {}) => {
    this.animate(0, 250, () => {
      const { onClose, updateStatusBar, onCancel, onTap } = this.props;
      this.updateStatusBar(updateStatusBar, false);
      this.alertData.action = action;
      if (action == ACTION.cancel) {
        onCancel(this.alertData);
      } else {
        if (action == ACTION.tap) {
          onTap(this.alertData);
        }
        onClose(this.alertData);
      }
      this.setState({ isOpen: false, topValue: 0, height: 0 });
      this.animationLock = false;
      onDone();
    });
  };
  updateStatusBar = (shouldUpdate = true, active = false) => {
    if (shouldUpdate) {
      if (IS_ANDROID) {
        const { inactiveStatusBarBackgroundColor, activeStatusBarBackgroundColor, translucent } = this.props;
        if (active) {
          let backgroundColor = activeStatusBarBackgroundColor;
          const type = this.alertData.type;
          if (type !== TYPE.custom) {
            backgroundColor = this.getBackgroundColorForType(type);
          }
          StatusBar.setBackgroundColor(backgroundColor, true);
          StatusBar.setTranslucent(translucent);
        } else {
          StatusBar.setBackgroundColor(inactiveStatusBarBackgroundColor, true);
        }
      }
      const { inactiveStatusBarStyle, activeStatusBarStyle } = this.props;
      if (active) {
        StatusBar.setBarStyle(activeStatusBarStyle, true);
      } else {
        StatusBar.setBarStyle(inactiveStatusBarStyle, true);
      }
    }
  };
  clearCloseTimeoutID = () => {
    if (this.closeTimeoutID) {
      clearTimeout(this.closeTimeoutID);
    }
  };
  animate = (toValue, duration = 450, onComplete = () => {}) => {
    const { useAnimationLock, useNativeDriver, isInteraction } = this.props;
    if (useAnimationLock) {
      this.animationLock = true;
    }
    Animated.spring(this.state.animationValue, {
      toValue: toValue,
      duration: duration,
      friction: 9,
      useNativeDriver,
      isInteraction,
    }).start(onComplete);
  };
  getStartDelta = (height, start) => {
    const windowHeight = HEIGHT;
    const startMin = 0 - height;
    const startMax = windowHeight + height;
    if (start < 0 && start != startMin) {
      return startMin;
    } else if (start > startMax) {
      return startMax;
    }
    return start;
  };
  getEndDelta = (height, end) => {
    const windowHeight = HEIGHT;
    const endMin = 0;
    const endMax = windowHeight;
    if (end < endMin) {
      return endMin;
    } else if (end >= endMax) {
      return endMax - height;
    }
    return end;
  };
  getOutputRange = (height, startDelta, endDelta) => {
    if (!height) {
      return [startDelta, endDelta];
    }
    const start = this.getStartDelta(height, startDelta);
    const end = this.getEndDelta(height, endDelta);
    return [start, end];
  };
  getStyleForType(type) {
    const { defaultContainer } = this.props;
    switch (type) {
      case TYPE.info:
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.infoColor }];
      case TYPE.warn:
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.warnColor }];
      case TYPE.error:
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.errorColor }];
      case TYPE.success:
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.successColor }];
      default:
        return [StyleSheet.flatten(defaultContainer), StyleSheet.flatten(this.props.containerStyle)];
    }
  }
  getSourceForType(type) {
    switch (type) {
      case TYPE.info:
        return this.props.infoImageSrc;
      case TYPE.warn:
        return this.props.warnImageSrc;
      case TYPE.error:
        return this.props.errorImageSrc;
      case TYPE.success:
        return this.props.successImageSrc;
      default:
        return this.props.imageSrc;
    }
  }
  getBackgroundColorForType(type) {
    switch (type) {
      case TYPE.info:
        return this.props.infoColor;
      case TYPE.warn:
        return this.props.warnColor;
      case TYPE.error:
        return this.props.errorColor;
      case TYPE.success:
        return this.props.successColor;
      default:
        return this.props.containerStyle.backgroundColor;
    }
  }
  _onLayoutEvent(event) {
    const { height } = event.nativeEvent.layout;
    if (height > this.state.height) {
      const { startDelta, endDelta } = this.props;
      const start = this.getStartDelta(height, startDelta);
      const end = this.getEndDelta(height, endDelta);
      if (startDelta != start || endDelta != end) {
        this.setState({ height });
      }
    }
  }
  _renderImage(source) {
    if (this.props.renderImage) {
      return this.props.renderImage(this.props, this.alertData);
    }
    return <ImageView style={StyleSheet.flatten(this.props.imageStyle)} source={source} />;
  }
  _renderTitle() {
    if (this.props.renderTitle) {
      return this.props.renderTitle(this.props, this.alertData);
    }
    const { titleTextProps, titleStyle, titleNumOfLines } = this.props;
    return <TextView {...titleTextProps} style={StyleSheet.flatten(titleStyle)} numberOfLines={titleNumOfLines} text={this.alertData.title} />;
  }
  _renderMessage() {
    if (this.props.renderMessage) {
      return this.props.renderMessage(this.props, this.alertData);
    }
    const { messageTextProps, messageStyle, messageNumOfLines } = this.props;
    return <TextView {...messageTextProps} style={StyleSheet.flatten(messageStyle)} numberOfLines={messageNumOfLines} text={this.alertData.message} />;
  }
  _renderCancel(show = false) {
    if (!show) {
      return null;
    }
    if (this.props.renderCancel) {
      return this.props.renderCancel(this.props, this.alertData);
    } else {
      const { cancelBtnImageSrc, cancelBtnImageStyle } = this.props;
      return <CancelButton imageStyle={cancelBtnImageStyle} imageSrc={cancelBtnImageSrc} onPress={() => this.closeAction(ACTION.cancel)} />;
    }
  }
  render() {
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }
    const {
      elevation,
      zIndex,
      wrapperStyle,
      tapToCloseEnabled,
      accessibilityLabel,
      testID,
      accessible,
      contentContainerStyle,
      defaultTextContainer,
      startDelta,
      endDelta,
      translucent,
      updateStatusBar,
      showCancel,
    } = this.props;
    const { animationValue, topValue, height } = this.state;
    const { type, payload } = this.alertData;
    let style = this.getStyleForType(type);
    let imageSrc = this.getSourceForType(type);
    // imageSrc is overridden when payload has source property
    // other than it existing and not an object there is no validation to ensure it is image source expected by Image
    if (payload && payload.hasOwnProperty('source') && payload.source && typeof payload.source !== 'object') {
      imageSrc = payload.source;
    }
    if (IS_ANDROID && translucent) {
      style = [style, { paddingTop: StatusBar.currentHeight }];
    }
    this.updateStatusBar(updateStatusBar, true);
    const outputRange = this.getOutputRange(height, startDelta, endDelta);
    let wrapperAnimStyle = {
      transform: [
        {
          translateY: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange,
          }),
        },
      ],
      position: 'absolute',
      top: topValue,
      left: 0,
      right: 0,
      elevation: elevation,
    };
    if (zIndex != null) {
      wrapperAnimStyle['zIndex'] = zIndex;
    }
    let ContentView = SafeAreaView;
    if (IS_IOS_BELOW_11 || IS_ANDROID) {
      ContentView = View;
    }
    const activeOpacity = !tapToCloseEnabled || showCancel ? 1 : 0.95;
    const onPress = !tapToCloseEnabled ? null : () => this.closeAction(ACTION.tap);
    return (
      <Animated.View ref={ref => this.mainView = ref} {...this.panResponder.panHandlers} style={[wrapperAnimStyle, wrapperStyle]}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPress}
          disabled={!tapToCloseEnabled}
          onLayout={event => this._onLayoutEvent(event)}
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          accessible={accessible}
        >
          <View style={style}>
            <ContentView style={StyleSheet.flatten(contentContainerStyle)}>
              {this._renderImage(imageSrc)}
              <View style={StyleSheet.flatten(defaultTextContainer)}>
                {this._renderTitle()}
                {this._renderMessage()}
              </View>
            </ContentView>
            {this._renderCancel(showCancel)}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
