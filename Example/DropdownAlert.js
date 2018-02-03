import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
  Image,
  PanResponder,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { StatusBarDefaultBarStyle, StatusBarDefaultBackgroundColor, DEFAULT_IMAGE_DIMENSIONS, WINDOW, IS_IOS, IS_ANDROID } from './constants';
import { validateType } from './functions';
import Label from './label';
import ImageView from './imageview';

export default class DropdownAlert extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,

    containerStyle: ViewPropTypes.style,
    backgroundColor: PropTypes.string,

    titleStyle: Text.propTypes.style,
    messageStyle: Text.propTypes.style,
    textContainerStyle: ViewPropTypes.style,
    imageStyle: Image.propTypes.style,

    closeInterval: PropTypes.number,
    onClose: PropTypes.func,

    imageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    startDelta: PropTypes.number,
    endDelta: PropTypes.number,

    titleNumOfLines: PropTypes.number,
    messageNumOfLines: PropTypes.number,

    tapToCloseEnabled: PropTypes.bool,
    panResponderEnabled: PropTypes.bool,
    replaceEnabled: PropTypes.bool,

    translucent: PropTypes.bool,
    elevation: PropTypes.number,
    zIndex: PropTypes.number,
    sensitivity: PropTypes.number,

    activeStatusBarStyle: PropTypes.string,
    activeStatusBarBackgroundColor: PropTypes.string,
    inactiveStatusBarStyle: PropTypes.string,
    inactiveStatusBarBackgroundColor: PropTypes.string,

    renderImage: PropTypes.func,
    renderTitle: PropTypes.func,
    renderMessage: PropTypes.func,
    renderStatusBar: PropTypes.func,
  };
  static defaultProps = {
    onClose: null,
    closeInterval: 4000,
    startDelta: -100,
    endDelta: 0,
    titleNumOfLines: 1,
    messageNumOfLines: 3,
    imageSrc: null,
    tapToCloseEnabled: true,
    panResponderEnabled: true,
    replaceEnabled: true,
    containerStyle: {
      padding: 8,
      flexDirection: 'row',
      paddingTop: IS_ANDROID ? 0 : 20,
      backgroundColor: '#cc3232',
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
    textContainerStyle: {
      flex: 1,
      padding: 8,
    },
    translucent: false,
    activeStatusBarStyle: 'light-content',
    activeStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    inactiveStatusBarStyle: StatusBarDefaultBarStyle,
    inactiveStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    updateStatusBar: true,
    elevation: 1,
    zIndex: null,
    sensitivity: 20,
    visible: false,
    title: 'Default title',
    message: 'Default message',
  };
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
      duration: 450,
      startDelta: props.startDelta,
      endDelta: props.endDelta,
      topValue: 0,
    };
    this.visible = props.visible;
    this.panResponder = null;
  }
  componentWillMount() {
    this.createPanResponder();
  }
  componentWillUnmount() {
    if (this._closeTimeoutId != null) {
      clearTimeout(this._closeTimeoutId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        this.alert(nextProps.title, nextProps.message);
      }
    }
  }
  createPanResponder = () => {
    this.panResponder = PanResponder.create({
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
  alert(title, message) {
    if (typeof title !== 'string') {
      title = title.toString();
      console.warn('DropdownAlert: Title is not a string.');
    }
    if (typeof message !== 'string') {
      message = message.toString();
      console.warn('DropdownAlert: Message is not a string.');
    }
    let delayInMilliSeconds = 0;
    if (this.visible) {
      delayInMilliSeconds = 475;
      this.close();
    }
    const self = this;
    setTimeout(
      function() {
        if (self.visible == false) {
          self.setState({
            topValue: 0,
          });
        }
        this.visible = true;
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
  close = action => {
    if (action == undefined) {
      action = 'programmatic';
    }
    var onClose = this.props.onClose;
    if (this.visible) {
      if (this._closeTimeoutId != null) {
        clearTimeout(this._closeTimeoutId);
      }
      setTimeout(
        function() {
          this.animate(0);
          if (this.visible) {
            if (this.props.updateStatusBar) {
              if (IS_ANDROID) {
                StatusBar.setBackgroundColor(this.props.inactiveStatusBarBackgroundColor, true);
              } else {
                StatusBar.setBarStyle(this.props.inactiveStatusBarStyle, true);
              }
            }
            this.visible = false;
            if (onClose) {
              let data = {
                title: this.state.title,
                message: this.state.message,
                action: action, // !!! How the alert was closed: automatic, programmatic, tap, pan
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
    if (this.visible) {
      this.visible = false;
      if (this._closeTimeoutId != null) {
        clearTimeout(this._closeTimeoutId);
      }
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
      useNativeDriver: IS_IOS,
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
  render() {
    console.log('render');

    let { activeStatusBarBackgroundColor, translucent, updateStatusBar, activeStatusBarStyle, containerStyle, imageSrc } = this.props;
    let style = StyleSheet.flatten(containerStyle);
    const source = imageSrc;
    let backgroundColor = containerStyle.backgroundColor;
    if (this.props.backgroundColor) {
      backgroundColor = this.props.backgroundColor;
    }
    if (IS_ANDROID) {
      if (translucent) {
        style = [style, { paddingTop: StatusBar.currentHeight }];
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
      <Animated.View ref={ref => this.mainView = ref} {...this.panResponder.panHandlers} style={wrapperStyle}>
        <TouchableOpacity
          activeOpacity={!this.props.tapToCloseEnabled ? 1 : 0.95}
          onPress={() => this.close('tap')}
          disabled={!this.props.tapToCloseEnabled}
          onLayout={event => this.onLayoutEvent(event)}
        >
          <View style={[style, { backgroundColor: backgroundColor }]}>
            <ImageView style={this.props.imageStyle} source={source} />
            <View style={this.props.textContainerStyle}>
              <Label style={this.props.titleStyle} numberOfLines={this.props.titleNumOfLines} text={this.props.title} />
              <Label style={this.props.messageStyle} numberOfLines={this.props.messageNumOfLines} text={this.props.message} />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
