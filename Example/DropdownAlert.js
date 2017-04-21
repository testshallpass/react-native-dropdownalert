import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, Animated, StatusBar, Platform, Dimensions, Image, Alert, PanResponder} from "react-native"
import Label from './Label'
import Icon from './Icon'
import Cancel from './Cancel'
const WINDOW = Dimensions.get('window')
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
    translucent: PropTypes.bool
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
      width: 36,
      height: 36,
      alignSelf: 'center'
    },
    cancelBtnImageStyle: {
      padding: 8,
      width: 36,
      height: 36,
      alignSelf: 'center'
    },
    translucent: false,
    visible: false,
    type: 'info',
    title: 'Default Title',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo exercitation ullamco.'
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
      barStyle: StatusBar._defaultProps.barStyle.value,
      statusBarBackgroundColor: StatusBar._defaultProps.backgroundColor.value
    }
    // Action
    this.alert = this.alert.bind(this)
    this.alertWithType = this.alertWithType.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onClose = this.onClose.bind(this)
    // Util
    this.animate = this.animate.bind(this)
    // Pan Responder
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this)
    this.handleMoveShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this)
    this.handleStartShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this)
  }
  componentWillMount() {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })
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
          this.onClose()
          this.alertWithType(nextProps.type, nextProps.title, nextProps.message)
        } else {
          this.onClose()
        }
      }
    }
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
  alertWithType(type, title, message) {
    if (this.validateType(type) == false) {
      return
    }
    if (typeof title !== 'string') {
      title = title.toString()
      console.warn('DropdownAlert: Title is not a string.')
    }
    if (typeof message !== 'string') {
      message = message.toString()
      console.warn('DropdownAlert: Message is not a string.')
    }
    if (this.props.replaceEnabled == false) {
      this.setState({
        type: type,
        message: message,
        title: title,
        isOpen: true,
        topValue: 0
      })
      if (this.state.isOpen == false) {
        this.animate(1)
      }
      if (this.props.closeInterval > 1) {
        if (closeTimeoutId != null) {
          clearTimeout(closeTimeoutId)
       }
       closeTimeoutId = setTimeout(function() {
         this.onClose('automatic')
       }.bind(this), this.props.closeInterval)
     }
   } else {
     var delayInMilliSeconds = 0
     if (this.state.isOpen == true) {
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
           self.onClose('automatic')
         }.bind(self), self.props.closeInterval)
       }
      }.bind(this), delayInMilliSeconds)
   }
  }
  dismiss(onDismiss, action) {
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
  onClose(action) {
    if (action == undefined) {
      action = 'programmatic'
    }
    this.dismiss(this.props.onClose, action)
  }
  onCancel() {
    this.dismiss(this.props.onCancel, 'cancel')
  }
  animate(toValue) {
    Animated.spring (
      this.state.animationValue, {
        toValue: toValue,
        duration: this.state.duration,
        friction: 9
      }
    ).start()
  }
  onLayoutEvent(event) {
    var {x, y, width, height} = event.nativeEvent.layout
    var actualStartDelta = this.state.startDelta
    var actualEndDelta = this.state.endDelta
    // Prevent it from going off screen.
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
  validateType(type) {
    if (type.length === 0 || type === null) {
      console.warn('Missing DropdownAlert type. Available types: info, warn, error or custom')
      return false
    }
    if (type != 'info' && type != 'warn' && type != 'error' && type != 'custom' && type != 'success') {
      console.warn('Invalid DropdownAlert type. Available types: info, warn, error, success, or custom')
      return false
    }
    return true
  }
  handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return this.props.panResponderEnabled
  }
  handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return gestureState.dx !== 0 && gestureState.dy !== 0 && this.props.panResponderEnabled
  }
  handlePanResponderMove(e: Object, gestureState: Object) {
    if (gestureState.dy < 0) {
      this.setState({
        topValue: gestureState.dy
      })
    }
  }
  handlePanResponderEnd(e: Object, gestureState: Object) {
    const delta = this.state.startDelta / 5
    if (gestureState.dy < delta) {
      this.dismiss(this.props.onClose, 'pan')
    }
  }
  renderStatusBar(type, backgroundColor, visible, barStyle) {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor, true)
    } else if (type !== 'custom') {
      if (visible) {
        StatusBar.setBarStyle('light-content', true)
      } else {
        StatusBar.setBarStyle(barStyle, true)
      }
    }
    return null
  }
  render() {
    var style = [styles.defaultContainer, this.props.containerStyle]
    var source = this.props.imageSrc
    var backgroundColor = this.props.containerStyle.backgroundColor
    switch (this.state.type) {
      case 'info':
      style = [styles.defaultContainer, {backgroundColor: this.props.infoColor}]
      source = require('./assets/info.png')
      backgroundColor = this.props.infoColor
      break;
      case 'warn':
      style = [styles.defaultContainer, {backgroundColor: this.props.warnColor}]
      source = require('./assets/warn.png')
      backgroundColor = this.props.warnColor
      break;
      case 'error':
      style = [styles.defaultContainer, {backgroundColor: this.props.errorColor}]
      source = require('./assets/error.png')
      backgroundColor = this.props.errorColor
      break;
      case 'success':
      style = [styles.defaultContainer, {backgroundColor: this.props.successColor}]
      source = require('./assets/success.png')
      backgroundColor = this.props.successColor
      break;
    }
    if (Platform.OS === 'android' && this.props.translucent) {
      style = [style, {paddingTop: StatusBar.currentHeight}]
    }
    var statusBarBackgroundColor = this.state.statusBarBackgroundColor
    if (this.props.visible) {
      statusBarBackgroundColor = backgroundColor
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
      {this.renderStatusBar(this.state.type, statusBarBackgroundColor, this.props.visible, this.state.barStyle, true)}
      <TouchableHighlight
        onPress={(this.props.showCancel) ? null : () => this.onClose('tap')}
        underlayColor={backgroundColor}
        disabled={!this.props.tapToCloseEnabled}
        onLayout={(event) => this.onLayoutEvent(event)}>
        <View style={style}>
          <Icon style={this.props.imageStyle} source={source} />
          <View style={styles.textContainer}>
            <Label text={this.state.title} style={this.props.titleStyle} numberOfLines={this.props.titleNumOfLines} />
            <Label text={this.state.message} style={this.props.messageStyle} numberOfLines={this.props.messageNumOfLines} />
          </View>
          <Cancel visible={this.props.showCancel} source={this.props.cancelBtnImageSrc} style={this.props.cancelBtnImageStyle} onPress={this.onCancel} backgroundColor={backgroundColor} />
        </View>
      </TouchableHighlight>
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
