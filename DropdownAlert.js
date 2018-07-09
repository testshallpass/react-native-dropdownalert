import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Animated, StatusBar, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { StatusBarDefaultBarStyle, StatusBarDefaultBackgroundColor, DEFAULT_IMAGE_DIMENSIONS, WINDOW, IS_IOS, IS_ANDROID } from './constants';
import { validateType } from './functions';
import Label from './label';
import ImageView from './imageview';

export default class DropdownAlert extends Component {
  static propTypes = {
    imageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    infoImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    warnImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errorImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    successImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cancelBtnImageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    infoColor: PropTypes.string,
    warnColor: PropTypes.string,
    errorColor: PropTypes.string,
    successColor: PropTypes.string,
    closeInterval: PropTypes.number,
    startDelta: PropTypes.number,
    endDelta: PropTypes.number,
    containerStyle: PropTypes.object,
    safeAreaStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    messageStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    cancelBtnImageStyle: PropTypes.object,
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
    activeStatusBarStyle: PropTypes.string,
    activeStatusBarBackgroundColor: PropTypes.string,
    inactiveStatusBarStyle: PropTypes.string,
    inactiveStatusBarBackgroundColor: PropTypes.string,
    updateStatusBar: PropTypes.bool,
    elevation: PropTypes.number,
    zIndex: PropTypes.number,
    sensitivity: PropTypes.number,
    defaultContainer: PropTypes.object,
    defaultTextContainer: PropTypes.object,
    renderImage: PropTypes.func,
    renderCancel: PropTypes.func,
    renderTitle: PropTypes.func,
    renderMessage: PropTypes.func,
  };
  static defaultProps = {
    onClose: null,
    onCancel: null,
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
    containerStyle: {
      padding: 16,
      flexDirection: 'row',
    },
    safeAreaStyle: {
      flexDirection: 'row',
      flex: 1,
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
      paddingTop: IS_ANDROID ? 0 : 20,
      flexDirection: 'row',
    },
    defaultTextContainer: {
      flex: 1,
      padding: 8,
    },
    translucent: false,
    activeStatusBarStyle: 'light-content',
    activeStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    inactiveStatusBarStyle: StatusBarDefaultBarStyle,
    inactiveStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    updateStatusBar: true,
    useNativeDriver: IS_IOS,
    elevation: 1,
    zIndex: null,
    sensitivity: 20,
    renderImage: undefined,
    renderCancel: undefined,
    renderTitle: undefined,
    renderMessage: undefined,
  };
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
      duration: 450,
      type: '',
      message: '',
      title: '',
      isOpen: false,
      startDelta: props.startDelta,
      endDelta: props.endDelta,
      topValue: 0,
    };
  }
  componentWillMount() {
    this.createPanResponder();
  }
  componentWillUnmount() {
    if (this._closeTimeoutId != null) {
      clearTimeout(this._closeTimeoutId);
    }
  }
  createPanResponder = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return this.props.panResponderEnabled;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) < this.props.sensitivity && Math.abs(gestureState.dy) >= this.props.sensitivity && this.props.panResponderEnabled;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          this.setState({
            topValue: gestureState.dy,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const delta = this.state.startDelta / 5;
        if (gestureState.dy < delta) {
          this.close('pan');
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        const delta = this.state.startDelta / 5;
        if (gestureState.dy < delta) {
          this.close('pan');
        }
      },
    });
  };
  alertWithType = (type, title, message) => {
    if (validateType(type) == false) {
      return;
    }
    if (typeof title !== 'string') {
      title = title.toString();
      console.warn('DropdownAlert: Title is not a string.');
    }
    if (typeof message !== 'string') {
      message = message.toString();
      console.warn('DropdownAlert: Message is not a string.');
    }
    if (this.props.replaceEnabled == false) {
      this.setState({
        type: type,
        message: message,
        title: title,
        isOpen: true,
        topValue: 0,
      });
      if (this.state.isOpen == false) {
        this.animate(1);
      }
      if (this.props.closeInterval > 1) {
        if (this._closeTimeoutId != null) {
          clearTimeout(this._closeTimeoutId);
        }
        this._closeTimeoutId = setTimeout(
          function() {
            this.close('automatic');
          }.bind(this),
          this.props.closeInterval
        );
      }
    } else {
      var delayInMilliSeconds = 0;
      if (this.state.isOpen == true) {
        delayInMilliSeconds = 475;
        this.close();
      }
      var self = this;
      setTimeout(
        function() {
          if (self.state.isOpen == false) {
            self.setState({
              type: type,
              message: message,
              title: title,
              isOpen: true,
              topValue: 0,
            });
          }
          self.animate(1);
          if (self.props.closeInterval > 1) {
            this._closeTimeoutId = setTimeout(
              function() {
                self.close('automatic');
              }.bind(self),
              self.props.closeInterval
            );
          }
        }.bind(this),
        delayInMilliSeconds
      );
    }
  };
  close = action => {
    if (action == undefined) {
      action = 'programmatic';
    }
    var onClose = this.props.onClose;
    if (action == 'cancel') {
      onClose = this.props.onCancel;
    }
    if (this.state.isOpen) {
      if (this._closeTimeoutId != null) {
        clearTimeout(this._closeTimeoutId);
      }
      this.animate(0);
      setTimeout(
        function() {
          if (this.state.isOpen) {
            this.setState({
              isOpen: false,
            });
            if (this.props.updateStatusBar) {
              if (IS_ANDROID) {
                StatusBar.setBackgroundColor(this.props.inactiveStatusBarBackgroundColor, true);
              } else {
                StatusBar.setBarStyle(this.props.inactiveStatusBarStyle, true);
              }
            }
            if (onClose) {
              var data = {
                type: this.state.type,
                title: this.state.title,
                message: this.state.message,
                action: action, // !!! How the alert was closed: automatic, programmatic, tap, pan or cancel
              };
              onClose(data);
            }
          }
        }.bind(this),
        this.state.duration
      );
    }
  };
  closeDirectly() {
    if (this.state.isOpen) {
      if (this._closeTimeoutId != null) {
        clearTimeout(this._closeTimeoutId);
      }
      this.setState({
        isOpen: false,
      });
      if (this.props.updateStatusBar) {
        if (IS_ANDROID) {
          StatusBar.setBackgroundColor(this.props.inactiveStatusBarBackgroundColor, true);
        } else {
          StatusBar.setBarStyle(this.props.inactiveStatusBarStyle, true);
        }
      }
    }
  }
  animate = toValue => {
    Animated.spring(this.state.animationValue, {
      toValue: toValue,
      duration: this.state.duration,
      friction: 9,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
  };
  onLayoutEvent(event) {
    const { x, y, width, height } = event.nativeEvent.layout;
    var actualStartDelta = this.state.startDelta;
    var actualEndDelta = this.state.endDelta;
    const { startDelta, endDelta } = this.props;
    if (startDelta < 0) {
      const delta = 0 - height;
      if (delta != startDelta) {
        actualStartDelta = delta;
      }
    } else if (startDelta > WINDOW.height) {
      actualStartDelta = WINDOW.height + height;
    }
    if (endDelta < 0) {
      actualEndDelta = 0;
    } else if (endDelta > WINDOW.height) {
      actualEndDelta = WINDOW.height - height;
    }
    const heightDelta = WINDOW.height - endDelta - height;
    if (heightDelta < 0) {
      actualEndDelta = endDelta + heightDelta;
    }
    if (actualStartDelta != this.state.startDelta || actualEndDelta != this.state.endDelta) {
      this.setState({
        startDelta: actualStartDelta,
        endDelta: actualEndDelta,
      });
    }
  }
  getStyleForType(type) {
    const { defaultContainer } = this.props;
    switch (type) {
      case 'info':
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.infoColor }];
      case 'warn':
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.warnColor }];
      case 'error':
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.errorColor }];
      case 'success':
        return [StyleSheet.flatten(defaultContainer), { backgroundColor: this.props.successColor }];
      default:
        return [StyleSheet.flatten(defaultContainer), StyleSheet.flatten(this.props.containerStyle)];
    }
  }
  getSourceForType(type) {
    switch (type) {
      case 'info':
        return this.props.infoImageSrc;
      case 'warn':
        return this.props.warnImageSrc;
      case 'error':
        return this.props.errorImageSrc;
      case 'success':
        return this.props.successImageSrc;
      default:
        return this.props.imageSrc;
    }
  }
  getBackgroundColorForType(type) {
    switch (type) {
      case 'info':
        return this.props.infoColor;
      case 'warn':
        return this.props.warnColor;
      case 'error':
        return this.props.errorColor;
      case 'success':
        return this.props.successColor;
      default:
        return this.props.containerStyle.backgroundColor;
    }
  }
  renderImage(source) {
    if (this.props.renderImage) {
      return this.props.renderImage(this.props);
    }
    return <ImageView style={StyleSheet.flatten(this.props.imageStyle)} source={source} />;
  }
  renderCancel(show) {
    if (show) {
      if (this.props.renderCancel) {
        return this.props.renderCancel(this.props);
      } else {
        return (
          <TouchableOpacity
            style={{
              alignSelf: this.props.cancelBtnImageStyle.alignSelf,
              width: this.props.cancelBtnImageStyle.width,
              height: this.props.cancelBtnImageStyle.height,
            }}
            onPress={() => this.close('cancel')}
          >
            <ImageView style={this.props.cancelBtnImageStyle} source={this.props.cancelBtnImageSrc} />
          </TouchableOpacity>
        );
      }
    }
    return null;
  }
  renderTitle() {
    if (this.props.renderTitle) {
      return this.props.renderTitle(this.props);
    } else {
      return <Label style={StyleSheet.flatten(this.props.titleStyle)} numberOfLines={this.props.titleNumOfLines} text={this.state.title} />;
    }
  }
  renderMessage() {
    if (this.props.renderMessage) {
      return this.props.renderMessage(this.props);
    } else {
      return <Label style={StyleSheet.flatten(this.props.messageStyle)} numberOfLines={this.props.messageNumOfLines} text={this.state.message} />;
    }
  }
  render() {
    const { isOpen, type } = this.state;
    if (isOpen) {
      let style = this.getStyleForType(type);
      const source = this.getSourceForType(type);
      const backgroundColor = this.getBackgroundColorForType(type);
      let { activeStatusBarBackgroundColor, translucent, updateStatusBar, activeStatusBarStyle, cancelBtnImageSrc, showCancel } = this.props;
      if (IS_ANDROID) {
        if (translucent) {
          style = [style, { paddingTop: StatusBar.currentHeight }];
        }
        if (type !== 'custom') {
          activeStatusBarBackgroundColor = backgroundColor;
        }
      }
      if (updateStatusBar) {
        if (IS_ANDROID) {
          StatusBar.setBackgroundColor(activeStatusBarBackgroundColor, true);
          StatusBar.setTranslucent(translucent);
        } else if (IS_IOS) {
          StatusBar.setBarStyle(activeStatusBarStyle, true);
        }
      }
      let wrapperStyle = {
        transform: [
          {
            translateY: this.state.animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.startDelta, this.state.endDelta],
            }),
          },
        ],
        position: 'absolute',
        top: this.state.topValue,
        left: 0,
        right: 0,
        elevation: this.props.elevation,
      };
      if (this.props.zIndex != null) wrapperStyle['zIndex'] = this.props.zIndex;
      return (
        <Animated.View ref={ref => this.mainView = ref} {...this._panResponder.panHandlers} style={wrapperStyle}>
          <TouchableOpacity
            activeOpacity={!this.props.tapToCloseEnabled || showCancel ? 1 : 0.95}
            onPress={!this.props.tapToCloseEnabled ? null : () => this.close('tap')}
            disabled={!this.props.tapToCloseEnabled}
            onLayout={event => this.onLayoutEvent(event)}
          >
            <View style={style}>
              <SafeAreaView style={StyleSheet.flatten(this.props.safeAreaStyle)}>
                {this.renderImage(source)}
                <View style={StyleSheet.flatten(this.props.defaultTextContainer)}>
                  {this.renderTitle()}
                  {this.renderMessage()}
                </View>
              </SafeAreaView>
              {this.renderCancel(showCancel)}
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }
    return null;
  }
}
