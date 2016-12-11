import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, Platform, Image, TouchableHighlight, View} from 'react-native'
const DEFAULT_IMAGE_DIMENSIONS = 36
import Functions from './Functions'

export default class ClassicAlert extends Component {
  static propTypes = {
    data: PropTypes.object,
    customStyles: PropTypes.object,
    callback: PropTypes.func
  }
  static defaultProps = {
    // ...
  }
  constructor(props) {
    super(props)
    this.state = {
      // ...
    }
  }
  setNativeProps(nativeProps) {
    this.defaultAlert.setNativeProps(nativeProps);
  }
  // data = {
  //   image: '',
  //   cancelImage: '',
  //   title: 'Error',
  //   message: '...',
  //   titleNumOfLines: '',
  //   messageNumOfLines: ''
  // }
  //
  // default_styles = {
  //   container: {},
  //   title: {},
  //   message: {},
  //   image: {},
  //   cancelBtnImage: {}
  // }

  render() {
    var data = this.props.data
    var customStyles = this.props.customStyles
    if (data.type) {
      if (data.type == 'info' || data.type == 'error' || data.type == 'warn') {
        var backgroundColor = Functions.getBackgroundColorForType(data.type)
      }
    }
    return (
      <View ref={component => this.defaultAlert = component} {...this.props} style={[styles.container, customStyles.container, (backgroundColor) ? {backgroundColor: backgroundColor} : null]}>
        {Functions.renderImage(data.image, [styles.image, customStyles.image])}
        <View style={[styles.textContainer, customStyles.textContainer]}>
          {Functions.renderText(data.title, [styles.title, customStyles.title], data.titleNumOfLines)}
          {Functions.renderText(data.message, [styles.message, customStyles.message], data.messageNumOfLines)}
        </View>
        {Functions.renderButton(data.cancelImage, [styles.cancelBtnImage, customStyles.cancelBtnImage], this.props.callback, (backgroundColor) ? backgroundColor : 'lightgray', this.props.userInteractionEnabled)}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
    paddingTop: (Platform.OS === 'android') ? 0 : 20,
    backgroundColor: '#4682b4'
  },
  textContainer: {
    flex: 1,
    padding: 8
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
  image: {
    padding: 8,
    width: DEFAULT_IMAGE_DIMENSIONS,
    height: DEFAULT_IMAGE_DIMENSIONS,
    alignSelf: 'center'
  },
  cancelBtnImage: {
    padding: 8,
    width: DEFAULT_IMAGE_DIMENSIONS,
    height: DEFAULT_IMAGE_DIMENSIONS,
    alignSelf: 'center'
  }
})
