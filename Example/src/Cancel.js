import React, {Component, PropTypes} from 'react'
import {TouchableHighlight, Image, View} from 'react-native'
import Icon from './Icon'
const DEFAULT_IMAGE_DIMENSIONS = 36

export default class Cancel extends Component {
  static propTypes = {
    style: Image.propTypes.style,
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    visible: PropTypes.bool,
    callback: PropTypes.func,
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }
  static defaultProps = {
    style: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center'
    },
    visible: false,
    onPress: null,
    underlayColor: 'transparent',
    source: require('./assets/cancel.png'),
  }
  constructor(props) {
    super(props)
    this.state = {
      // ...
    }
  }
  onPress() {
    if (this.props.onPress) {
      this.props.onPress(this.props.callback, 'cancel')
    }
  }
  render() {
    const {source, style, onPress, underlayColor, visible} = this.props
    if (source != null && visible) {
      return (
        <TouchableHighlight style={{alignSelf: style.alignSelf, width: style.width, height: style.height}} onPress={() => this.onPress()} underlayColor={underlayColor}>
          <View>
            <Icon source={source} style={style} />
          </View>
        </TouchableHighlight>
      )
    }
    return null
  }
}
