import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar, Platform, Dimensions, Image, PanResponder} from "react-native"
import PropTypes from 'prop-types';
import Label from './Label'
import Icon from './Icon'
import Cancel from './Cancel'
const StatusBarDefaultBarStyle = StatusBar._defaultProps.barStyle.value
const StatusBarDefaultBackgroundColor = StatusBar._defaultProps.backgroundColor.value
const DEFAULT_IMAGE_DIMENSIONS = 36
const WINDOW = Dimensions.get('window');
var closeTimeoutId = null
var panResponder

export default class DropdownAlert extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    imageSrc: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    cancelBtnImageSrc: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    infoColor: PropTypes.string,
    warnColor: PropTypes.string,
    errorColor: PropTypes.string,
    successColor: PropTypes.string,
    closeInterval: PropTypes.number,
    startDelta: PropTypes.number,
    endDelta: PropTypes.number,
    containerStyle: View.propTypes.style,
    titleStyle: Text.propTypes.style,
    messageStyle: Text.propTypes.style,
    imageStyle: Image.propTypes.style,
    cancelBtnImageStyle: Image.propTypes.style,
    titleNumOfLines: PropTypes.number,
    messageNumOfLines: PropTypes.number,
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    showCancel: PropTypes.bool,
    tapToCloseEnabled: PropTypes.bool,
    panResponderEnabled: PropTypes.bool,
    replaceEnabled: PropTypes.bool,
    translucent: PropTypes.bool,
    activeStatusBarStyle: PropTypes.string,
    activeStatusBarBackgroundColor: PropTypes.string,
    inactiveStatusBarStyle: PropTypes.string,
    inactiveStatusBarBackgroundColor: PropTypes.string,
    activeOpacity: PropTypes.number
  }
  static defaultProps =  {
    onClose: null,
    onCancel: null,
    closeInterval: 4000,
    startDelta: -100,
    endDelta: 0,
    titleNumOfLines: 1,
    messageNumOfLines: 3,
    imageSrc: null,
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
      flexDirection: 'row'
    },
    titleStyle: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'transparent'
    },
    messageStyle: {
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: 'transparent'
    },
    imageStyle: {
      padding: 8,
      width: 30,
      height: 30,
      alignSelf: 'center'
    },
    cancelBtnImageStyle: {
      padding: 8,
      width: 30,
      height: 30,
      alignSelf: 'center'
    },
    translucent: false,
    visible: false,
    type: '',
    title: '',
    message: '',
    activeStatusBarStyle: 'light-content',
    activeStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    inactiveStatusBarStyle: StatusBarDefaultBarStyle,
    inactiveStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    activeOpacity: 0.95
  }
  constructor(props) {
    super(props)
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
    }
  }
  componentWillMount() {
    this.createPanResponder()
    const {visible, type, title, message} = this.props
    if (visible) {
      this.alertWithType(type, title, message)
    }
  }
  componentWillReceiveProps(nextProps) {
    const {visible, type} = this.props
    if (nextProps.visible !== visible) {
      if (nextProps.visible) {
        this.alertWithType(nextProps.type, nextProps.title, nextProps.message)
      } else {
        if (nextProps.type !== type) {
          if (nextProps.replaceEnabled) {
            this.dismiss(nextProps.onClose)
          }
          this.alertWithType(nextProps.type, nextProps.title, nextProps.message)
        } else {
          this.dismiss(nextProps.onClose)
        }
      }
    }
  }
  createPanResponder = () => {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return this.props.panResponderEnabled
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx !== 0 && gestureState.dy !== 0 && this.props.panResponderEnabled
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          this.setState({
            topValue: gestureState.dy
          })
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const delta = this.state.startDelta / 5
        if (gestureState.dy < delta) {
          this.dismiss(this.props.onClose, 'pan')
        }        
      },
      onPanResponderTerminate: (evt, gestureState) => {
        const delta = this.state.startDelta / 5
        if (gestureState.dy < delta) {
          this.dismiss(this.props.onClose, 'pan')
        }  
      },
    })    
  }
  alert(title, message) {
    if (title == undefined) {
      title = null
    }
    if (message == undefined) {
      message = null
    }
    this.alertWithType('custom', title, message)
  }
  alertWithType = (type, title, message) => {
    if (this.validateType(type) == false) {
      return
    }
    title = this.validateLabel('title', title)
    message = this.validateLabel('message', message)
    const {replaceEnabled, closeInterval, onClose} = this.props
    const {isOpen} = this.state
    if (replaceEnabled == false) {
      this.setState({
        type: type,
        message: message,
        title: title,
        isOpen: true,
        topValue: 0
      })
      console.log(isOpen);
      if (isOpen == false) {
        this.animate(1)
      }
      if (closeInterval > 1) {
        if (closeTimeoutId != null) {
          clearTimeout(closeTimeoutId)
       }
       closeTimeoutId = setTimeout(function() {
         this.dismiss(onClose, 'automatic')
       }.bind(this), closeInterval)
     }
   } else {
     var delayInMilliSeconds = 0
     if (isOpen == true) {
       delayInMilliSeconds = 475
       this.dismiss()
     }
      var self = this
      setTimeout(function() {
        if (self.state.isOpen == false) {
          self.setState({
            type: type,
            message: message,
            title: title,
            isOpen: true,
            topValue: 0
          })
        }
        self.animate(1)
        if (self.props.closeInterval > 1) {
         closeTimeoutId = setTimeout(function() {
           self.dismiss(self.props.onClose, 'automatic')
         }.bind(self), self.props.closeInterval)
       }
      }.bind(this), delayInMilliSeconds)
   }
  }
  dismiss = (onDismiss, action) => {
    if (action == undefined || action == null) {
      action = 'programmatic'
    }
    if (onDismiss == undefined || onDismiss == null) {
      onDismiss = this.props.onClose
    }
    if (this.state.isOpen) {
      if (closeTimeoutId != null) {
        clearTimeout(closeTimeoutId)
      }
      this.animate(0)
      setTimeout(function() {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          })
          if (this.props.updateStatusBar) {
            if (Platform.OS == 'android') {
              StatusBar.setBackgroundColor(this.props.inactiveStatusBarBackgroundColor, true)
            } else {
              StatusBar.setBarStyle(this.props.inactiveStatusBarStyle, true)
            }
          }
          if (onDismiss) {
            var data = {
              type: this.state.type,
              title: this.state.title,
              message: this.state.message,
              action: action // !!! How the alert was dismissed: automatic, programmatic, tap, pan or cancel
            }
            onDismiss(data)
          }
        }
      }.bind(this), (this.state.duration))
    }
  }
  animate = (toValue) => {
    Animated.spring (
      this.state.animationValue, {
        toValue: toValue,
        duration: this.state.duration,
        friction: 9,
        useNativeDriver: (Platform.OS === 'ios')
      }
    ).start()
  }
  validateType(type) {
    if (type === null || type.length === 0) {
      console.warn('Warning: You are missing the DropdownAlert type. Available types: info, warn, error, success, or custom')
      return false
    }
    if (type != 'info' && type != 'warn' && type != 'error' && type != 'custom' && type != 'success') {
      console.warn('Warning: DropdownAlert type you provided is invalid. Available types: info, warn, error, success, or custom')
      return false
    }
    return true
  }
  validateLabel(label, value) {
    if (value == null || typeof value !== 'string') {
      const warn = 'Warning: DropdownAlert ' + label + ' prop is not a string or null.'
      console.warn(warn)
      if (value == null) {
        value = ''
      }
      return value.toString()
    }
    return value    
  }
  onLayoutEvent(event) {
    var {x, y, width, height} = event.nativeEvent.layout
    var actualStartDelta = this.state.startDelta
    var actualEndDelta = this.state.endDelta
    if (this.props.startDelta < 0) {
      var delta = 0 - height
      if (delta != this.props.startDelta) {
        actualStartDelta = delta
      }
    } else if (this.props.startDelta > WINDOW.height) {
      actualStartDelta = WINDOW.height + height
    }
    if (this.props.endDelta < 0) {
      actualEndDelta = 0
    } else if (this.props.endDelta > WINDOW.height) {
      actualEndDelta = WINDOW.height - height
    }
    var heightDelta = WINDOW.height - this.props.endDelta - height
    if (heightDelta < 0) {
      actualEndDelta = this.props.endDelta + heightDelta
    }
    if (actualStartDelta != this.state.startDelta || actualEndDelta != this.state.endDelta) {
      this.setState({
        startDelta: actualStartDelta,
        endDelta: actualEndDelta
      })
    }
  }
  renderStatusBar(backgroundColor, barStyle, translucent) {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor, true)
      StatusBar.setTranslucent(translucent)
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(barStyle, true)
    }
  }
  render() {
    const {containerStyle, imageSrc, infoColor, warnColor, errorColor, successColor} = this.props
    const {type, isOpen} = this.state
    var style = [styles.defaultContainer, containerStyle]
    var source = imageSrc
    var backgroundColor = containerStyle.backgroundColor
    switch (type) {
      case 'info':
        style = [styles.defaultContainer, {backgroundColor: infoColor}]
        source = require('./assets/info.png')
        backgroundColor = this.props.infoColor
        break;
      case 'warn':
        style = [styles.defaultContainer, {backgroundColor: warnColor}]
        source = require('./assets/warn.png')
        backgroundColor = this.props.warnColor
        break;
      case 'error':
        style = [styles.defaultContainer, {backgroundColor: errorColor}]
        source = require('./assets/error.png')
        backgroundColor = this.props.errorColor
        break;
      case 'success':
        style = [styles.defaultContainer, {backgroundColor: successColor}]
        source = require('./assets/success.png')
        backgroundColor = this.props.successColor
        break;
    }
    var {activeStatusBarBackgroundColor} = this.props
    const {translucent, activeStatusBarStyle} = this.props
    if (Platform.OS === 'android') {
      if (translucent) {
        style = [style, {paddingTop: StatusBar.currentHeight}]
      }
      if (type !== 'custom') {
        activeStatusBarBackgroundColor = backgroundColor
      }
    }
    if (this.props.updateStatusBar) {
      this.renderStatusBar(activeStatusBarBackgroundColor, activeStatusBarStyle, translucent)
    }
    return (
      <Animated.View
        ref={(ref) => this.mainView = ref}
        {...panResponder.panHandlers}
        style={{
          transform: [{
            translateY: this.state.animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.startDelta, this.state.endDelta]
            }),
          }],
          position: 'absolute',
          top: this.state.topValue,
          left: 0,
          right: 0
      }}>
      <TouchableOpacity
        onPress={(this.props.showCancel) ? null : () => this.dismiss(this.props.onClose, 'tap')}
        disabled={!this.props.tapToCloseEnabled}
        activeOpacity={this.props.activeOpacity}
        onLayout={(event) => this.onLayoutEvent(event)}>
        <View style={style}>
          <Icon style={this.props.imageStyle} source={source} />
          <View style={styles.textContainer}>
            <Label text={this.state.title} style={this.props.titleStyle} numberOfLines={this.props.titleNumOfLines} />
            <Label text={this.state.message} style={this.props.messageStyle} numberOfLines={this.props.messageNumOfLines} />
          </View>
          <Cancel visible={this.props.showCancel} source={this.props.cancelBtnImageSrc} style={this.props.cancelBtnImageStyle} onPress={(callback, action) => this.dismiss(callback, action)} callback={this.props.onCancel} backgroundColor={backgroundColor} />
        </View>
      </TouchableOpacity>
     </Animated.View>
    )
  }
}

var styles = StyleSheet.create({
  defaultContainer: {
    padding: 8,
    paddingTop: (Platform.OS === 'android') ? 0 : 20,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    padding: 8
  }
})
