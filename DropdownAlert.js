
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Modal,
  StatusBar,
  Image
} from "react-native"

var closeTimeoutId

var DropdownAlert = React.createClass({
  propTypes: {
    closeInterval: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    imageUri: React.PropTypes.string,
    imageSrc: React.PropTypes.number,
    textColor: React.PropTypes.string,
    fontFamily: React.PropTypes.string,
    startDelta: React.PropTypes.number,
    endDelta: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      closeInterval: 4000,
      backgroundColor: 'steelblue',
      imageUri: '',
      imageSrc: null,
      textColor: 'white',
      fontFamily: 'HelveticaNeue',
      startDelta: -100,
      endDelta: 0
    }
  },
  getInitialState: function() {
    return {
      fadeAnim: new Animated.Value(0),
      duration: 450,
      visible: false,
      type: 'info',
      message: '',
      title: '',
      isOpen: false
    }
  },
  renderTitle: function() {
    if (this.state.title.length > 0) {
      var style = styles.title
      if (this.state.type == 'custom') {
        style = [styles.title, {color: this.props.textColor, fontFamily: this.props.fontFamily}]
      }
      return (
        <Text style={style} numberOfLines={(this.state.message.length > 0) ? 1 : 3}>
          {this.state.title}
        </Text>
      )
    }
    return null
  },
  renderMessage: function() {
    if (this.state.message.length > 0) {
      var style = styles.message
      if (this.state.type == 'custom') {
        style = [styles.message, {color: this.props.textColor, fontFamily: this.props.fontFamily}]
      }
      return (
        <Text style={style} numberOfLines={(this.state.title.length > 0) ? 2 : 3}>
          {this.state.message}
        </Text>
      )
    }
    return null
  },
  renderImage: function(src) {
    if (this.state.type == 'custom' && this.props.imageUri.length > 0) {
      var uri = this.props.imageUri
      return (
        <Image style={[styles.image, {width: 36, height: 36}]} source={{uri: uri}} />
      )
    } else if (src != null) {
      return (
        <Image style={styles.image} source={src} />
      )
    } else {
      return null
    }
  },
  renderDropDown: function() {
    if (this.state.visible) {
      var style
      var source
      switch (this.state.type) {
        case 'info':
          style = styles.infoContainer
          source = require('./assets/info.png')
          break;
        case 'warn':
          style = styles.warnContainer
          source = require('./assets/warn.png')
          break;
        case 'error':
          style = styles.errorContainer
          source = require('./assets/error.png')
          break;
        case 'custom':
          style = [styles.customContainer, {backgroundColor: this.props.backgroundColor}]
          source = this.props.imageSrc
        default:
      }

      return (
        <Modal animationType='fade' transparent={true} visible={this.state.visible} onRequestClose={() => this.dismiss}>
          <Animated.View style={{
              transform: [{
                translateY: this.state.fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.props.startDelta, this.props.endDelta]
                }),
              }],
            }}>
            <StatusBar barStyle="light-content" />
            <TouchableHighlight onPress={this.dismiss} underlayColor={'lightgray'}>
              <View style={style}>
                {this.renderImage(source)}
                <View style={styles.titleMsgContainer}>
                  {this.renderTitle()}
                  {this.renderMessage()}
                </View>
              </View>
            </TouchableHighlight>
          </Animated.View>
      </Modal>
      )
    } else {
      return (<View />)
    }
  },
  render() {
    return (
      this.renderDropDown()
    )
  },
  alert: function(type, title, message) {
    if (type.length === 0 || type === null ) {
      console.warn('Missing DropdownAlert type. Available types: info, warn, error or custom')
      return
    }
    if (type != 'info' && type != 'warn' && type != 'error' && type != 'custom') {
      console.warn('Invalid DropdownAlert type. Available types: info, warn, error or custom')
      return
    }
    if (this.state.isOpen) {
      this.dismiss()
      return
    }
    if (this.state.visible == false) {
      this.setState({
        visible: true,
        type: type,
        message: message,
        title: title,
        isOpen: true
      })
    }
    Animated.timing(
      this.state.fadeAnim, {
        toValue: 1,
        duration: this.state.duration
      }
    ).start()
     if (this.props.closeInterval > 1) {
      closeTimeoutId = setTimeout(function() {
        this.dismiss()
      }.bind(this), this.props.closeInterval)
    }
  },
  dismiss: function() {
    if (this.state.isOpen) {
      if (closeTimeoutId != null) {
        clearTimeout(closeTimeoutId)
      }
      Animated.timing(
        this.state.fadeAnim, {
          toValue: 0,
          duration: this.state.duration
        }
      ).start()
      setTimeout(function() {
        if (this.state.visible) {
          this.setState({
            visible: false,
            isOpen: false
          })
        }
      }.bind(this), (this.state.duration))
    }
  },
})

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
  titleMsgContainer: {
    flex: 1,
    padding: 8
  },
  image: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent'
  },
  message: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'normal',
    color: 'white',
    backgroundColor: 'transparent'
  },
})
module.exports = DropdownAlert
