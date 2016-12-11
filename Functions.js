import React, {Component, PropTypes} from 'react'
import {Text, Image, Platform, Dimensions, TouchableHighlight} from 'react-native'

const DEFAULT_IMAGE_DIMENSIONS = 36
const WINDOW = Dimensions.get('window')
const MAIN_INFO_COLOR = '#4682b4'
const MAIN_WARN_COLOR = '#cd853f'
const MAIN_ERROR_COLOR = '#cc3232'

function renderText(text, style, numberOfLines) {
  if (text != null) {
    if (text.length > 0) {
      if (Platform.OS === 'android') { // Using numberOfLines for Android causes a crash.
        return (
          <Text style={style}>{text}</Text>
        )
      } else {
        return (
          <Text style={style} numberOfLines={numberOfLines}>{text}</Text>
        )
      }
    }
  }
  return null
}
function renderImage(source, style) {
  if (source != null) {
    if (typeof source === 'number') {
      return (
        <Image style={style} source={source} />
      )
    } else if (typeof source === 'string') {
      if (style['width'] == false) {
        style['width'] = DEFAULT_IMAGE_DIMENSIONS
      }
      if (style['height'] == false) {
        style['height'] = DEFAULT_IMAGE_DIMENSIONS
      }
      return (
        <Image style={style} source={{uri: source}} />
      )
    }
  }
  return null
}
function renderButton(source, style, onPress, underlayColor, isRendered) {
  if (source != null && isRendered) {
    return (
      <TouchableHighlight style={{alignSelf: style.alignSelf, width: style.width, height: style.height}} onPress={onPress} underlayColor={underlayColor}>
        {renderImage(source, style)}
      </TouchableHighlight>
    )
  }
  return null
}
function renderStatusBar(type, backgroundColor) {     // {this.renderStatusBar(this.state.type, backgroundColor)}
  if (Platform.OS === 'android') {
    return (
      <StatusBar backgroundColor={backgroundColor} />
    )
  } else if (type != 'custom') {
    return (
      <StatusBar barStyle="light-content" />
    )
  }
  return null
}
function validateType(type) {
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
function stylesForType(type) {
  var style = [this.props.containerStyle, styles.defaultContainer]
  var source = this.props.imageSrc
  var backgroundColor = this.props.containerStyle.backgroundColor
  switch (type) {
    case 'info':
      style = [styles.defaultContainer, {backgroundColor: MAIN_INFO_COLOR}]
      source = require('./assets/info.png')
      backgroundColor = MAIN_INFO_COLOR
      break;
    case 'warn':
      style = [styles.defaultContainer, {backgroundColor: MAIN_WARN_COLOR}]
      source = require('./assets/warn.png')
      backgroundColor = MAIN_WARN_COLOR
      break;
    case 'error':
      style = [styles.defaultContainer, {backgroundColor: MAIN_ERROR_COLOR}]
      source = require('./assets/error.png')
      backgroundColor = MAIN_ERROR_COLOR
      break;
  }
}
function getContainerStyleForType(type) {
  switch (type) {
    case 'info':
      return {padding: 8, paddingTop: (Platform.OS === 'android') ? 0 : 20, flexDirection: 'row', backgroundColor: MAIN_INFO_COLOR}
      break;
    case 'warn':
      return {padding: 8, paddingTop: (Platform.OS === 'android') ? 0 : 20, flexDirection: 'row', backgroundColor: MAIN_WARN_COLOR}
      break;
    case 'error':
      return {padding: 8, paddingTop: (Platform.OS === 'android') ? 0 : 20, flexDirection: 'row', backgroundColor: MAIN_ERROR_COLOR}
      break;
  }
}
function getImageSrcForType(type) {
  switch (type) {
    case 'info':
      return require('./assets/info.png')
      break;
    case 'warn':
      return require('./assets/warn.png')
      break;
    case 'error':
      return require('./assets/error.png')
      break;
  }
}
function getBackgroundColorForType(type) {
  switch (type) {
    case 'info':
      return MAIN_INFO_COLOR
      break;
    case 'warn':
      return MAIN_WARN_COLOR
      break;
    case 'error':
      return MAIN_ERROR_COLOR
      break;
  }
}
module.exports = {
  renderText,
  renderImage,
  renderButton,
  getContainerStyleForType,
  getImageSrcForType,
  getBackgroundColorForType,
}
