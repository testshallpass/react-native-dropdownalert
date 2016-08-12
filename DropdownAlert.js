
import React, {Component, PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Modal,
  StatusBar,
  Platform,
  Dimensions,
  Image
} from "react-native"

var closeTimeoutId
const DEFAULT_IMAGE_DIMENSIONS = 36
const WINDOW = Dimensions.get('window')

export default class DropdownAlert extends Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    closeInterval: React.PropTypes.number,
    imageUri: React.PropTypes.string,
    imageSrc: React.PropTypes.number,
    startDelta: React.PropTypes.number,
    endDelta: React.PropTypes.number,
    messageStyle: Text.propTypes.style,
    titleStyle: Text.propTypes.style,
    imageStyle: Image.propTypes.style,
    containerStyle: View.propTypes.style,
    titleNumOfLines: React.PropTypes.number,
    messageNumOfLines: React.PropTypes.number,
  }
  static defaultProps =  {
    onClose: null,
    closeInterval: 4000,
    imageUri: '',
    imageSrc: null,
    startDelta: -200,
    endDelta: 0,
    titleNumOfLines: 1,
    messageNumOfLines: 3,
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
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS
    },
    containerStyle: {
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'dimgray'
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
      duration: 450,
      type: 'info',
      message: '',
      title: '',
      isOpen: false,
      startDelta: props.startDelta,
      endDelta: props.endDelta
    }
    this.renderTitle = this.renderTitle.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
    this.renderImage = this.renderImage.bind(this)
    this.renderDropDown = this.renderDropDown.bind(this)
    this.alert = this.alert.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.animate = this.animate.bind(this)
    this.validateType = this.validateType.bind(this)
    this.renderStatusBar = this.renderStatusBar.bind(this)
    this.onLayoutEvent = this.onLayoutEvent.bind(this)
  }
  renderTitle() {
    if (this.state.title.length > 0) {
      return (
        <Text style={this.props.titleStyle} numberOfLines={this.props.titleNumOfLines}>
          {this.state.title}
        </Text>
      )
    }
    return null
  }
  renderMessage() {
    if (this.state.message.length > 0) {
      return (
        <Text style={this.props.messageStyle} numberOfLines={this.props.messageNumOfLines}>
          {this.state.message}
        </Text>
      )
    }
    return null
  }
  renderImage(src) {
    if (this.state.type == 'custom' && this.props.imageUri.length > 0) {
      var uri = this.props.imageUri
      var style = this.props.imageStyle
      if (!style['width']) {
        style['width'] = DEFAULT_IMAGE_DIMENSIONS
      }
      if (!style['height']) {
        style['height'] = DEFAULT_IMAGE_DIMENSIONS
      }
      return (
        <Image style={style} source={{uri: uri}} />
      )
    } else if (src != null) {
      return (
        <Image style={this.props.imageStyle} source={src} />
      )
    } else {
      return null
    }
  }
  renderStatusBar(bgColor) {
    if (Platform.OS === 'android' || this.state.type != 'custom') {
      return (
        <StatusBar barStyle="light-content" backgroundColor={bgColor} />
      )
    }
    return null
  }
  renderDropDown() {
    if (this.state.isOpen) {
      var style = this.props.containerStyle
      if (!style['flexDirection'] && !style['alignItems']) {
        // Try to help keep somewhat organized if these styles were not given.
        style = [this.props.containerStyle, styles.customContainer]
      }
      var source = this.props.imageSrc
      var statusBarBackgroundColor = this.props.backgroundColor
      switch (this.state.type) {
        case 'info':
          style = styles.infoContainer
          source = require('./assets/info.png')
          statusBarBackgroundColor = 'steelblue'
          break;
        case 'warn':
          style = styles.warnContainer
          source = require('./assets/warn.png')
          statusBarBackgroundColor = 'peru'
          break;
        case 'error':
          style = styles.errorContainer
          source = require('./assets/error.png')
          statusBarBackgroundColor = '#cc3232'
          break;
      }
      return (
          <Animated.View style={{
              transform: [{
                translateY: this.state.fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.startDelta, this.state.endDelta]
                }),
              }],
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}>
            {this.renderStatusBar(statusBarBackgroundColor)}
            <TouchableHighlight onPress={this.dismiss} underlayColor={'lightgray'} onLayout={(event) => this.onLayoutEvent(event)}>
              <View style={style}>
                {this.renderImage(source)}
                <View style={styles.textContainer}>
                  {this.renderTitle()}
                  {this.renderMessage()}
                </View>
              </View>
            </TouchableHighlight>
          </Animated.View>
      )
    } else {
      return null
    }
  }
  render() {
    return (
      this.renderDropDown()
    )
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
    this.setState({
      startDelta: actualStartDelta,
      endDelta: actualEndDelta
    })
  }
  alert(type, title, message) {
    if (this.validateType(type) == false) {
      return
    }
    if (this.state.isOpen) {
      this.dismiss()
      return
    }
    if (this.state.isOpen == false) {
      this.setState({
        type: type,
        message: message,
        title: title,
        isOpen: true
      })
    }
    this.animate(1)
     if (this.props.closeInterval > 1) {
      closeTimeoutId = setTimeout(function() {
        this.dismiss()
      }.bind(this), this.props.closeInterval)
    }
  }
  dismiss() {
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
          if (this.props.onClose) {
            var data = {
              type: this.state.type,
              title: this.state.title,
              message: this.state.message
            }
            this.props.onClose(data)
          }
        }
      }.bind(this), (this.state.duration))
    }
  }
  animate(toValue) {
    Animated.timing(
      this.state.fadeAnim, {
        toValue: toValue,
        duration: this.state.duration
      }
    ).start()
  }
  validateType(type) {
    if (type.length === 0 || type === null) {
      console.warn('Missing DropdownAlert type. Available types: info, warn, error or custom')
      return false
    }
    if (type != 'info' && type != 'warn' && type != 'error' && type != 'custom') {
      console.warn('Invalid DropdownAlert type. Available types: info, warn, error or custom')
      return false
    }
    return true
  }
}

var styles = StyleSheet.create({
  infoContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  warnContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'peru',
  },
  errorContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cc3232'
  },
  customContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    padding: 8
  },
})
